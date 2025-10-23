import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertServiceSchema, insertNewsSchema, insertCouncilMemberSchema } from "@shared/schema";
import { ZodError } from "zod";
import { listUpcomingEvents, createCalendarEvent, type CalendarEvent } from "./google-calendar";

export function registerRoutes(app: Express): Server {
  const httpServer = createServer(app);
  // Services routes
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getAllServices();
      res.json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });

  app.get("/api/services/upcoming", async (req, res) => {
    try {
      const services = await storage.getUpcomingServices();
      res.json(services);
    } catch (error) {
      console.error("Error fetching upcoming services:", error);
      res.status(500).json({ error: "Failed to fetch upcoming services" });
    }
  });

  app.post("/api/services", async (req, res) => {
    try {
      const validatedData = insertServiceSchema.parse(req.body);
      const service = await storage.createService(validatedData);
      res.status(201).json(service);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: "Invalid service data", details: error.errors });
      } else {
        console.error("Error creating service:", error);
        res.status(500).json({ error: "Failed to create service" });
      }
    }
  });

  // News routes
  app.get("/api/news", async (req, res) => {
    try {
      const news = await storage.getAllNews();
      res.json(news);
    } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).json({ error: "Failed to fetch news" });
    }
  });

  app.get("/api/news/latest", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 3;
      const news = await storage.getLatestNews(limit);
      res.json(news);
    } catch (error) {
      console.error("Error fetching latest news:", error);
      res.status(500).json({ error: "Failed to fetch latest news" });
    }
  });

  app.post("/api/news", async (req, res) => {
    try {
      const validatedData = insertNewsSchema.parse(req.body);
      const news = await storage.createNews(validatedData);
      res.status(201).json(news);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: "Invalid news data", details: error.errors });
      } else {
        console.error("Error creating news:", error);
        res.status(500).json({ error: "Failed to create news" });
      }
    }
  });

  // Council members routes
  app.get("/api/council", async (req, res) => {
    try {
      const members = await storage.getAllCouncilMembers();
      res.json(members);
    } catch (error) {
      console.error("Error fetching council members:", error);
      res.status(500).json({ error: "Failed to fetch council members" });
    }
  });

  app.post("/api/council", async (req, res) => {
    try {
      const validatedData = insertCouncilMemberSchema.parse(req.body);
      const member = await storage.createCouncilMember(validatedData);
      res.status(201).json(member);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: "Invalid council member data", details: error.errors });
      } else {
        console.error("Error creating council member:", error);
        res.status(500).json({ error: "Failed to create council member" });
      }
    }
  });

  // Church info routes
  app.get("/api/church-info", async (req, res) => {
    try {
      const info = await storage.getChurchInfo();
      res.json(info);
    } catch (error) {
      console.error("Error fetching church info:", error);
      res.status(500).json({ error: "Failed to fetch church info" });
    }
  });

  app.get("/api/about", async (req, res) => {
    try {
      const content = await storage.getAboutContent();
      res.json(content);
    } catch (error) {
      console.error("Error fetching about content:", error);
      res.status(500).json({ error: "Failed to fetch about content" });
    }
  });

  // Google Calendar routes
  app.get("/api/calendar/events", async (req, res) => {
    try {
      const maxResults = req.query.maxResults ? parseInt(req.query.maxResults as string) : 10;
      const events = await listUpcomingEvents(maxResults);
      res.json(events);
    } catch (error) {
      console.error("Error fetching calendar events:", error);
      res.status(500).json({ error: "Failed to fetch calendar events" });
    }
  });

  app.post("/api/calendar/events", async (req, res) => {
    try {
      const { summary, description, location, start, end, timeZone } = req.body;
      
      if (!summary || !start || !end) {
        return res.status(400).json({ error: "Missing required fields: summary, start, end" });
      }

      const event = await createCalendarEvent({
        summary,
        description,
        location,
        start,
        end,
        timeZone,
      });

      if (!event) {
        return res.status(500).json({ error: "Failed to create calendar event" });
      }

      res.status(201).json(event);
    } catch (error) {
      console.error("Error creating calendar event:", error);
      res.status(500).json({ error: "Failed to create calendar event" });
    }
  });

  return httpServer;
}
