import { useQuery } from "@tanstack/react-query";
import { Calendar, ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import type { News } from "@shared/schema";

export default function NewsPage() {
  const { data: news, isLoading } = useQuery<News[]>({
    queryKey: ["/api/news"],
  });

  return (
    <div className="min-h-screen bg-background">
      <Hero
        title="Nieuws & Mededelingen"
        subtitle="Blijf op de hoogte van gebeurtenissen, activiteiten en belangrijke aankondigingen in onze gemeente."
        showServiceTimes={false}
      />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <Skeleton className="h-56 w-full rounded-t-lg" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full mt-2" />
                  <Skeleton className="h-4 w-5/6" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : news && news.length > 0 ? (
          <div className="space-y-8">
            {/* Featured News */}
            {news.filter((article) => article.featured).length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-foreground mb-6">Uitgelicht</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {news
                    .filter((article) => article.featured)
                    .slice(0, 2)
                    .map((article) => (
                      <Card
                        key={article.id}
                        id={article.id}
                        className="hover-elevate transition-all duration-200 overflow-hidden"
                        data-testid={`card-featured-${article.id}`}
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
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                            <Calendar className="w-4 h-4" />
                            <span data-testid={`text-date-${article.id}`}>
                              {new Date(article.date).toLocaleDateString("nl-NL", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </span>
                            <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded ml-auto" data-testid={`badge-featured-${article.id}`}>
                              Uitgelicht
                            </span>
                          </div>
                          <CardTitle className="text-2xl leading-tight" data-testid={`text-title-${article.id}`}>
                            {article.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground leading-relaxed whitespace-pre-line" data-testid={`text-content-${article.id}`}>
                            {article.content}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </section>
            )}

            {/* All News */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-6">Alle Berichten</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news
                  .filter((article) => !article.featured)
                  .map((article) => (
                    <Card
                      key={article.id}
                      id={article.id}
                      className="hover-elevate transition-all duration-200 overflow-hidden flex flex-col"
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
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                          <Calendar className="w-3.5 h-3.5" />
                          <span data-testid={`text-date-${article.id}`}>
                            {new Date(article.date).toLocaleDateString("nl-NL", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <CardTitle className="text-xl leading-tight" data-testid={`text-title-${article.id}`}>
                          {article.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col">
                        <p className="text-muted-foreground line-clamp-3 mb-4" data-testid={`text-excerpt-${article.id}`}>
                          {article.excerpt}
                        </p>
                        <Button
                          variant="link"
                          className="p-0 h-auto gap-1 mt-auto self-start"
                          asChild
                          data-testid={`button-read-${article.id}`}
                        >
                          <a href={`#${article.id}`}>
                            Lees meer
                            <ArrowRight className="w-4 h-4" />
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </section>
          </div>
        ) : (
          <Card className="p-12 text-center">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-2">Geen nieuwsberichten beschikbaar</p>
            <p className="text-sm text-muted-foreground">
              Kom binnenkort terug voor het laatste nieuws uit onze gemeente
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
