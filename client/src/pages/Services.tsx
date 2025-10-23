import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock, Music, Users, Baby, Youtube } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
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
            Welkom in onze erediensten waar we samen God eren en Zijn Woord horen
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Service Times */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-3xl font-bold mb-8">Tijden</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={itemVariants} className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Zondag Ochtend</h3>
                <p className="text-2xl font-bold text-primary">9:00 uur</p>
                <p className="text-2xl font-bold text-primary">10:45 uur</p>
                <p className="text-sm text-muted-foreground mt-2">
                  In beide diensten voorgaat als regel dezelfde predikant
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Zondag Avond</h3>
                <p className="text-2xl font-bold text-primary">18:30 uur</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Zomerperiode</h3>
                <p className="text-2xl font-bold text-primary">9:30 uur</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Gedurende de zomer één morgendienst
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Special Services & Info */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <h2 className="text-3xl font-bold mb-8">Bijzondere Diensten</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <div>
                  <p className="font-medium">Heilig Avondmaal</p>
                  <p className="text-sm text-muted-foreground">5x per jaar, waaronder Goede Vrijdag</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <div>
                  <p className="font-medium">Doopdiensten</p>
                  <p className="text-sm text-muted-foreground">Eerste zondag van oneven maanden (tweede morgendienst)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <div>
                  <p className="font-medium">Jeugddiensten</p>
                  <p className="text-sm text-muted-foreground">4x per jaar, meestal in de avonddienst</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <div>
                  <p className="font-medium">Kerk-School-Gezinsdienst</p>
                  <p className="text-sm text-muted-foreground">Jaarlijks, meestal eind januari</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <div>
                  <p className="font-medium">Gemeente In Bloei</p>
                  <p className="text-sm text-muted-foreground">Voor mensen met verstandelijke beperking</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <div>
                  <p className="font-medium">Feestdagen</p>
                  <p className="text-sm text-muted-foreground">Nieuwjaar, Biddag, Hemelvaart, Dankdag, Kerst</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Music & Children */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div variants={itemVariants}>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Music className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">Muziek</h2>
                </div>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  In de erediensten zingen we liederen uit diverse bundels en tradities onder het motto 
                  <span className="font-medium text-foreground"> 'Verbindend Vieren'</span>.
                </p>
                <p>
                  De gemeentezang wordt begeleid door het orgel en diverse muziekgroepen. 
                  Kerkkoor <span className="font-medium text-foreground">Vita Nova</span> verleent regelmatig 
                  medewerking aan speciale diensten.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Baby className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">Kinderen</h2>
                </div>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <p className="font-medium text-foreground mb-1">Kinderoppas</p>
                  <p className="text-sm">Tijdens beide morgendiensten voor kinderen onder de 4 jaar</p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Zondagsschool</p>
                  <p className="text-sm">Tijdens de tweede ochtenddienst voor groep 1 t/m 6</p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Basiscatechese 'On Track'</p>
                  <p className="text-sm">Voor groep 7 en 8, elke twee weken (even weken)</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Livestream */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="rounded-xl border border-primary/20 bg-gradient-to-r from-primary/10 to-transparent p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Youtube className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">Livestream & Opnames</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Kunt u er niet bij zijn? De eerste ochtenddienst en de avonddienst worden live uitgezonden 
                    via ons YouTube kanaal. Ook zijn eerdere diensten terug te kijken.
                  </p>
                  <p className="text-sm">
                    Daarnaast is er in het kerkgebouw een Bovenzaal met weergaveapparatuur, 
                    en kunt u gebruikmaken van KerkTV voor thuis.
                  </p>
                </div>
                <Button asChild className="mt-4 gap-2">
                  <a
                    href="https://www.youtube.com/channel/UCAGi5k-LRMaNU1FDKARpx4A"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Youtube className="w-5 h-5" />
                    Bekijk Livestream
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Service Schedule */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-8">Dienstrooster</h2>

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
              {Object.entries(groupedServices || {}).map(([month, monthServices]) => (
                <motion.div
                  key={month}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-2xl font-bold mb-8 capitalize flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-primary" />
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
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">Geen diensten beschikbaar</p>
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
}
