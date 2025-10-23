import { Calendar, Clock, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  title: string;
  subtitle: string;
  showServiceTimes?: boolean;
}

export default function Hero({ title, subtitle, showServiceTimes = true }: HeroProps) {
  return (
    <div className="relative bg-gradient-to-br from-primary/10 via-background to-primary/5 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
            {subtitle}
          </p>

          {showServiceTimes && (
            <div className="bg-card border border-card-border rounded-lg p-6 max-w-2xl">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Kerkdiensten
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <span className="text-sm font-medium text-foreground">Zondag Ochtend:</span>
                    <span className="text-sm text-muted-foreground ml-2">9:00 uur en 10:45 uur</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <span className="text-sm font-medium text-foreground">Zondag Avond:</span>
                    <span className="text-sm text-muted-foreground ml-2">18:30 uur</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://www.youtube.com/channel/UCAGi5k-LRMaNU1FDKARpx4A"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="button-livestream"
                >
                  <Button className="gap-2">
                    <Youtube className="w-4 h-4" />
                    Live Dienst Bekijken
                  </Button>
                </a>
                <Button variant="outline" asChild data-testid="button-visit-us">
                  <a href="/contact">Bezoek Ons</a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
