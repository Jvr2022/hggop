import { useQuery } from "@tanstack/react-query";
import { Calendar as CalendarIcon, MapPin, Clock, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

interface CalendarEvent {
  id: string;
  summary: string;
  description?: string;
  location?: string;
  start: {
    dateTime?: string;
    date?: string;
  };
  end: {
    dateTime?: string;
    date?: string;
  };
  htmlLink: string;
}

export default function Events() {
  const { data: events, isLoading } = useQuery<CalendarEvent[]>({
    queryKey: ["/api/calendar/events"],
  });

  const formatEventDate = (event: CalendarEvent) => {
    const startDate = event.start.dateTime || event.start.date;
    if (!startDate) return "";
    
    const date = new Date(startDate);
    return format(date, "EEEE d MMMM yyyy", { locale: nl });
  };

  const formatEventTime = (event: CalendarEvent) => {
    const startDate = event.start.dateTime;
    const endDate = event.end.dateTime;
    
    if (!startDate || !endDate) return "Hele dag";
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return `${format(start, "HH:mm")} - ${format(end, "HH:mm")}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-primary text-primary-foreground py-20"
      >
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Evenementen</h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Ontdek alle aankomende evenementen en activiteiten in onze gemeenschap
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2 mt-2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : events && events.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {events.map((event) => (
              <motion.div key={event.id} variants={itemVariants}>
                <Card className="h-full hover-elevate transition-all duration-300 group">
                  <CardHeader>
                    <CardTitle className="flex items-start justify-between gap-2">
                      <span className="line-clamp-2">{event.summary}</span>
                      <CalendarIcon className="w-5 h-5 flex-shrink-0 text-muted-foreground" />
                    </CardTitle>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{formatEventDate(event)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{formatEventTime(event)}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span className="line-clamp-1">{event.location}</span>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  {event.description && (
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {event.description}
                      </p>
                      <a
                        href={event.htmlLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`link-event-${event.id}`}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-4 w-full gap-2 group-hover:bg-accent"
                          data-testid={`button-view-event-${event.id}`}
                        >
                          Bekijk in Google Calendar
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </a>
                    </CardContent>
                  )}
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <CalendarIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Geen evenementen gepland</h3>
              <p className="text-muted-foreground">
                Er zijn momenteel geen evenementen gepland. Kom later terug voor updates.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
