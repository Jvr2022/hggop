import { useQuery } from "@tanstack/react-query";
import { Calendar, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import type { News } from "@shared/schema";

export default function NewsPage() {
  const { data: news, isLoading } = useQuery<News[]>({
    queryKey: ["/api/news"],
  });

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nieuws & Mededelingen</h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Blijf op de hoogte van gebeurtenissen, activiteiten en belangrijke aankondigingen in onze gemeente
          </p>
        </div>
      </motion.div>

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
          <div className="space-y-16">
            {/* Featured News */}
            {news.filter((article) => article.featured).length > 0 && (
              <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold mb-8">Uitgelicht</h2>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                  {news
                    .filter((article) => article.featured)
                    .slice(0, 2)
                    .map((article) => (
                      <motion.div key={article.id} variants={itemVariants}>
                        <Card
                          className="hover-elevate transition-all duration-300 overflow-hidden h-full group"
                          data-testid={`card-featured-${article.id}`}
                        >
                          {article.imageUrl && (
                            <div className="aspect-video w-full overflow-hidden bg-muted">
                              <img
                                src={article.imageUrl}
                                alt={article.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                              <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full ml-auto" data-testid={`badge-featured-${article.id}`}>
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
                      </motion.div>
                    ))}
                </motion.div>
              </motion.section>
            )}

            {/* All News */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-8">Alle Berichten</h2>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {news
                  .filter((article) => !article.featured)
                  .map((article) => (
                    <motion.div key={article.id} variants={itemVariants}>
                      <Card
                        className="hover-elevate transition-all duration-300 overflow-hidden h-full group"
                        data-testid={`card-news-${article.id}`}
                      >
                        {article.imageUrl && (
                          <div className="aspect-video w-full overflow-hidden bg-muted">
                            <img
                              src={article.imageUrl}
                              alt={article.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                          </div>
                          <CardTitle className="text-xl leading-tight line-clamp-2" data-testid={`text-title-${article.id}`}>
                            {article.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground line-clamp-4 leading-relaxed" data-testid={`text-excerpt-${article.id}`}>
                            {article.excerpt}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </motion.div>
            </motion.section>
          </div>
        ) : (
          <Card className="p-16 text-center">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">
              Geen nieuws beschikbaar. Kom later terug voor updates.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
