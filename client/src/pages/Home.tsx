import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Calendar, Clock, ArrowRight, Church } from "lucide-react";
import Hero from "@/components/Hero";
import LivestreamPlayer from "@/components/LivestreamPlayer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Service, News } from "@shared/schema";

export default function Home() {
  const { data: upcomingServices, isLoading: servicesLoading } = useQuery<Service[]>({
    queryKey: ["/api/services/upcoming"],
  });

  const { data: latestNews, isLoading: newsLoading } = useQuery<News[]>({
    queryKey: ["/api/news/latest"],
  });

  return (
    <div className="min-h-screen bg-background">
      <Hero
        title="Welkom bij HGGOP"
        subtitle="U bent van harte welkom in de Hervormde Gemeente Giessen-Oudekerk en Peursum. Een gemeenschap waar geloof, verbinding en omzien naar elkaar centraal staan."
      />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Livestream Player */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-2">
            Live Eredienst
          </h2>
          <p className="text-muted-foreground mb-8">
            Volg onze erediensten live vanuit huis
          </p>
          <LivestreamPlayer />
        </section>

        {/* Upcoming Services */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-2">
                Aanstaande Diensten
              </h2>
              <p className="text-muted-foreground">
                Bekijk het volledige rooster van kerkdiensten
              </p>
            </div>
            <Link href="/diensten">
              <Button variant="outline" className="gap-2 hidden sm:flex" data-testid="button-view-all-services">
                Alle Diensten
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {servicesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-32" />
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : upcomingServices && upcomingServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingServices.slice(0, 3).map((service) => (
                <Card
                  key={service.id}
                  className="hover-elevate transition-all duration-200"
                  data-testid={`card-service-${service.id}`}
                >
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="w-4 h-4" />
                      <span data-testid={`text-date-${service.id}`}>{service.date} {service.month}</span>
                    </div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      <span data-testid={`text-time-${service.id}`}>{service.time}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground font-medium mb-2" data-testid={`text-preacher-${service.id}`}>{service.preacher}</p>
                    {service.special && (
                      <span className="inline-block bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded" data-testid={`badge-special-${service.id}`}>
                        {service.special}
                      </span>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <Church className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Geen aanstaande diensten beschikbaar</p>
            </Card>
          )}

          <div className="mt-6 sm:hidden">
            <Link href="/diensten">
              <Button variant="outline" className="w-full gap-2" data-testid="button-view-all-services-mobile">
                Alle Diensten
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Latest News */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-2">
                Laatste Nieuws
              </h2>
              <p className="text-muted-foreground">
                Blijf op de hoogte van gebeurtenissen en aankondigingen
              </p>
            </div>
            <Link href="/nieuws">
              <Button variant="outline" className="gap-2 hidden sm:flex" data-testid="button-view-all-news">
                Alle Berichten
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {newsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <Skeleton className="h-48 w-full rounded-t-lg" />
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full mt-2" />
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : latestNews && latestNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestNews.slice(0, 3).map((article) => (
                <Card
                  key={article.id}
                  className="hover-elevate transition-all duration-200 overflow-hidden"
                  data-testid={`card-news-${article.id}`}
                >
                  {article.imageUrl && (
                    <div className="aspect-video w-full overflow-hidden bg-muted">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover"
                        data-testid={`img-news-${article.id}`}
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="text-xs text-muted-foreground mb-2" data-testid={`text-date-${article.id}`}>
                      {new Date(article.date).toLocaleDateString("nl-NL", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                    <CardTitle className="text-xl leading-tight" data-testid={`text-title-${article.id}`}>
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3 mb-4" data-testid={`text-excerpt-${article.id}`}>
                      {article.excerpt}
                    </p>
                    <Link href={`/nieuws#${article.id}`}>
                      <Button variant="link" className="p-0 h-auto gap-1" data-testid={`button-read-more-${article.id}`}>
                        Lees meer
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">Geen nieuwsberichten beschikbaar</p>
            </Card>
          )}

          <div className="mt-6 sm:hidden">
            <Link href="/nieuws">
              <Button variant="outline" className="w-full gap-2" data-testid="button-view-all-news-mobile">
                Alle Berichten
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Welcome Statement */}
        <section className="mt-16">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-8 md:p-12">
              <blockquote className="font-serif italic text-lg md:text-xl text-foreground border-l-4 border-primary pl-6">
                "Stromen van levend water zullen stromen uit het hart van wie in Mij gelooft."
                <footer className="mt-4 text-sm font-sans not-italic text-muted-foreground">
                  — Johannes 7:38
                </footer>
              </blockquote>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
