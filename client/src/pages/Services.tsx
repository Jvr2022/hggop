import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock, MapPin, Church } from "lucide-react";
import Hero from "@/components/Hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Service } from "@shared/schema";

export default function Services() {
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const groupedServices = services?.reduce((acc, service) => {
    const month = service.month;
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  const isCurrentWeek = (serviceDate: string, serviceMonth: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day
    const currentYear = today.getFullYear();
    
    // Map Dutch month names to month numbers (0-11)
    const monthMap: Record<string, number> = {
      "januari": 0, "februari": 1, "maart": 2, "april": 3,
      "mei": 4, "juni": 5, "juli": 6, "augustus": 7,
      "september": 8, "oktober": 9, "november": 10, "december": 11
    };
    
    const day = parseInt(serviceDate);
    const monthIndex = monthMap[serviceMonth.toLowerCase()];
    
    // Try both current year and next/previous year, pick the closest
    const serviceDateThisYear = new Date(currentYear, monthIndex, day);
    const serviceDateNextYear = new Date(currentYear + 1, monthIndex, day);
    const serviceDatePrevYear = new Date(currentYear - 1, monthIndex, day);
    
    // Calculate absolute differences
    const diffThisYear = Math.abs(serviceDateThisYear.getTime() - today.getTime());
    const diffNextYear = Math.abs(serviceDateNextYear.getTime() - today.getTime());
    const diffPrevYear = Math.abs(serviceDatePrevYear.getTime() - today.getTime());
    
    // Pick the date that's closest to today
    let serviceFullDate = serviceDateThisYear;
    if (diffNextYear < diffThisYear) {
      serviceFullDate = serviceDateNextYear;
    }
    if (diffPrevYear < Math.abs(serviceFullDate.getTime() - today.getTime())) {
      serviceFullDate = serviceDatePrevYear;
    }
    
    // Calculate signed difference in days
    const diffTime = serviceFullDate.getTime() - today.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    
    // Within current week if -3 days to +3 days
    return diffDays >= -3 && diffDays <= 3;
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero
        title="Kerkdiensten"
        subtitle="Overzicht van alle erediensten met tijden, voorgangers en bijzonderheden."
        showServiceTimes={false}
      />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Dienstrooster</h2>
          <p className="text-muted-foreground">
            Op zondag zijn er 's morgens twee kerkdiensten om 9:00 uur en 10:45 uur, en 's avonds om 18:30 uur.
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-8 w-32" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Skeleton className="h-40" />
                  <Skeleton className="h-40" />
                </div>
              </div>
            ))}
          </div>
        ) : services && services.length > 0 ? (
          <div className="space-y-12">
            {Object.entries(groupedServices || {}).map(([month, monthServices]) => (
              <section key={month}>
                <h3 className="text-2xl font-semibold text-foreground mb-6 capitalize flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-primary" />
                  {month}
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {monthServices.map((service) => {
                    const isCurrent = isCurrentWeek(service.date, service.month);
                    return (
                      <Card
                        key={service.id}
                        className={`hover-elevate transition-all duration-200 ${
                          isCurrent ? "border-l-4 border-l-primary bg-primary/5" : ""
                        }`}
                        data-testid={`card-service-${service.id}`}
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                <Calendar className="w-4 h-4" />
                                <span className="font-medium" data-testid={`text-date-${service.id}`}>
                                  {service.date} {service.month}
                                </span>
                              </div>
                              <CardTitle className="text-xl flex items-center gap-2">
                                <Clock className="w-5 h-5 text-primary" />
                                <span data-testid={`text-time-${service.id}`}>{service.time}</span>
                              </CardTitle>
                            </div>
                            {isCurrent && (
                              <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded" data-testid={`badge-current-week-${service.id}`}>
                                Deze week
                              </span>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Voorganger</p>
                            <p className="text-foreground font-medium" data-testid={`text-preacher-${service.id}`}>{service.preacher}</p>
                          </div>
                          {service.location && (
                            <div className="flex items-start gap-2">
                              <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                              <span className="text-sm text-muted-foreground" data-testid={`text-location-${service.id}`}>{service.location}</span>
                            </div>
                          )}
                          {service.special && (
                            <div className="pt-2 border-t border-border">
                              <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded" data-testid={`badge-special-${service.id}`}>
                                {service.special}
                              </span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <Church className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-2">Geen diensten beschikbaar</p>
            <p className="text-sm text-muted-foreground">
              Het dienstrooster wordt binnenkort bijgewerkt
            </p>
          </Card>
        )}

        {/* Additional Info */}
        <section className="mt-16">
          <Card className="bg-card border-card-border">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Informatie over de Erediensten
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Morgendiensten:</strong> De eerste ochtenddienst en de avonddienst worden live uitgezonden via ons YouTube kanaal.
                </p>
                <p>
                  <strong className="text-foreground">Zomerperiode:</strong> Gedurende de zomermaanden is er één morgendienst die om 9:30 uur begint.
                </p>
                <p>
                  <strong className="text-foreground">Heilig Avondmaal:</strong> Het Heilig Avondmaal wordt vijf keer per jaar gevierd in beide morgendiensten en de avonddienst.
                </p>
                <p>
                  <strong className="text-foreground">Doopdiensten:</strong> Doopdiensten vinden in principe plaats op de eerste zondag van de oneven maanden tijdens de tweede morgendienst.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
