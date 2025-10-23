import { google } from 'googleapis';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=google-calendar',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('Google Calendar not connected');
  }
  return accessToken;
}

export async function getUncachableGoogleCalendarClient() {
  const accessToken = await getAccessToken();

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken
  });

  return google.calendar({ version: 'v3', auth: oauth2Client });
}

export interface CalendarEvent {
  id: string;
  summary: string;
  description?: string;
  location?: string;
  start: {
    dateTime?: string;
    date?: string;
    timeZone?: string;
  };
  end: {
    dateTime?: string;
    date?: string;
    timeZone?: string;
  };
  htmlLink: string;
}

export async function listUpcomingEvents(maxResults: number = 10): Promise<CalendarEvent[]> {
  try {
    const calendar = await getUncachableGoogleCalendarClient();
    
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: maxResults,
      singleEvents: true,
      orderBy: 'startTime',
    });

    return (response.data.items || []) as CalendarEvent[];
  } catch (error) {
    console.error('Error fetching Google Calendar events:', error);
    return [];
  }
}

export async function createCalendarEvent(event: {
  summary: string;
  description?: string;
  location?: string;
  start: string;
  end: string;
  timeZone?: string;
}): Promise<CalendarEvent | null> {
  try {
    const calendar = await getUncachableGoogleCalendarClient();
    
    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: {
        summary: event.summary,
        description: event.description,
        location: event.location,
        start: {
          dateTime: event.start,
          timeZone: event.timeZone || 'Europe/Amsterdam',
        },
        end: {
          dateTime: event.end,
          timeZone: event.timeZone || 'Europe/Amsterdam',
        },
      },
    });

    return response.data as CalendarEvent;
  } catch (error) {
    console.error('Error creating Google Calendar event:', error);
    return null;
  }
}
