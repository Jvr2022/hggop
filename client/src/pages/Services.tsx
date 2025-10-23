import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock, Church } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
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
    today.setHours(0, 0, 0, 0);
    const currentYear = today.getFullYear();
    
    const monthMap: Record<string, number> = {
      "januari": 0, "februari": 1, "maart": 2, "april": 3,
      "mei": 4, "juni": 5, "juli": 6, "augustus": 7,
      "september": 8, "oktober": 9, "november": 10, "december": 11
    };
    
    const day = parseInt(serviceDate);
    const monthIndex = monthMap[serviceMonth.toLowerCase()];
    
    const serviceDateThisYear = new Date(currentYear, monthIndex, day);
    const serviceDateNextYear = new Date(currentYear + 1, monthIndex, day);
    const serviceDatePrevYear = new Date(currentYear - 1, monthIndex, day);
    
    const diffThisYear = Math.abs(serviceDateThisYear.getTime() - today.getTime());
    const diffNextYear = Math.abs(serviceDateNextYear.getTime() - today.getTime());
    const diffPrevYear = Math.abs(serviceDatePrevYear.getTime() - today.getTime());
    
    let serviceFullDate = serviceDateThisYear;
    if (diffNextYear < diffThisYear) {
      serviceFullDate = serviceDateNextYear;
    }
    if (diffPrevYear < Math.abs(serviceFullDate.getTime() - today.getTime())) {
      serviceFullDate = serviceDatePrevYear;
    }
    
    const diffTime = serviceFullDate.getTime() - today.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays >= -3 && diffDays <= 3;
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Kerkdiensten</h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Overzicht van alle erediensten met tijden, voorgangers en bijzonderheden
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold mb-3">Dienstrooster</h2>
          <p className="text-muted-foreground text-lg">
            Op zondag zijn er 's morgens twee kerkdiensten om 9:00 uur en 10:45 uur, en 's avonds om 18:30 uur.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="space-y-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-6">
                <Skeleton className="h-8 w-32" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Skeleton className="h-40" />
                  <Skeleton className="h-40" />
                </div>
              </div>
            ))}
          </div>
        ) : services && services.length > 0 ? (
          <div className="space-y-16">
            {Object.entries(groupedServices || {}).map(([month, monthServices], monthIndex) => (
              <motion.section
                key={month}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-3xl font-bold mb-8 capitalize flex items-center gap-3">
                  <Calendar className="w-7 h-7 text-primary" />
                  {month}
                </h3>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                >
                  {monthServices.map((service) => {
                    const isCurrent = isCurrentWeek(service.date, service.month);
                    return (
                      <motion.div key={service.id} variants={itemVariants}>
                        <Card
                          className={`hover-elevate transition-all duration-300 h-full ${
                            isCurrent ? "ring-2 ring-primary" : ""
                          }`}
                          data-testid={`card-service-${service.id}`}
                        >
                          <CardContent className="p-8">
                            <div className="flex items-start justify-between mb-6">
                              <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-muted-foreground" />
                                <span className="text-lg font-medium" data-testid={`text-date-${service.id}`}>
                                  {service.date} {service.month}
                                </span>
                              </div>
                              {isCurrent && (
                                <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full" data-testid={`badge-current-${service.id}`}>
                                  Deze week
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-3 mb-6">
                              <Clock className="w-6 h-6 text-primary" />
                              <span className="text-2xl font-semibold" data-testid={`text-time-${service.id}`}>
                                {service.time}
                              </span>
                            </div>

                            <div className="space-y-3">
                              <div>
                                <p className="text-sm text-muted-foreground mb-1">Voorganger</p>
                                <p className="text-lg font-medium" data-testid={`text-preacher-${service.id}`}>
                                  {service.preacher}
                                </p>
                              </div>

                              {service.special && (
                                <div className="pt-3 border-t border-border">
                                  <p className="text-sm text-muted-foreground mb-1">Bijzonderheden</p>
                                  <span className="inline-block bg-accent text-accent-foreground text-sm font-medium px-3 py-1 rounded-md" data-testid={`text-special-${service.id}`}>
                                    {service.special}
                                  </span>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.section>
            ))}
          </div>
        ) : (
          <Card className="p-16 text-center">
            <Church className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">Geen diensten beschikbaar</p>
          </Card>
        )}
      </div>
    </div>
  );
}
