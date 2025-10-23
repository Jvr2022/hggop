import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Calendar, Clock, ArrowRight, Users, Heart, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import type { Service, News } from "@shared/schema";
import heroImage from "@assets/stock_images/modern_church_interi_3b9ac6f3.jpg";
import communityImage from "@assets/stock_images/church_community_peo_9fd88c5d.jpg";
import studyImage from "@assets/stock_images/bible_study_group_di_4a05a7a0.jpg";

export default function Home() {
  const { data: upcomingServices, isLoading: servicesLoading } = useQuery<Service[]>({
    queryKey: ["/api/services/upcoming"],
  });

  const { data: latestNews, isLoading: newsLoading } = useQuery<News[]>({
    queryKey: ["/api/news/latest"],
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Church worship"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 h-full flex items-center"
        >
          <div className="max-w-7xl mx-auto px-6">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 max-w-3xl"
            >
              Welkom in onze gemeenschap
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl"
            >
              Hervormde Gemeente Giessen-Oudekerk en Peursum. Een gemeenschap waar geloof, verbinding en omzien naar elkaar centraal staan.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/diensten">
                <Button size="lg" className="bg-white text-black hover:bg-white/90" data-testid="button-services">
                  Bekijk Diensten
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/evenementen">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 backdrop-blur-sm" data-testid="button-events">
                  Evenementen
                  <Calendar className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Features Grid */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-24"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={itemVariants}>
              <Card className="text-center p-8 hover-elevate transition-all duration-300 h-full">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">Gemeenschap</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Ontdek een warme gemeenschap waar iedereen welkom is en verbinding centraal staat.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="text-center p-8 hover-elevate transition-all duration-300 h-full">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">Geloof</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Groei in je geloof door inspirerende diensten en betekenisvolle samenkomsten.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="text-center p-8 hover-elevate transition-all duration-300 h-full">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <BookOpen className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">Leren</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Verdiep je kennis door Bijbelstudies en leerzame bijeenkomsten.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* Upcoming Services */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="flex items-end justify-between mb-12">
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                Aanstaande Diensten
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-muted-foreground text-lg"
              >
                Sluit je aan bij onze erediensten
              </motion.p>
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
                  <CardContent className="p-8">
                    <Skeleton className="h-6 w-32 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : upcomingServices && upcomingServices.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {upcomingServices.slice(0, 3).map((service, index) => (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                  custom={index}
                >
                  <Card
                    className="hover-elevate transition-all duration-300 h-full group"
                    data-testid={`card-service-${service.id}`}
                  >
                    <CardContent className="p-8">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <Calendar className="w-4 h-4" />
                        <span data-testid={`text-date-${service.id}`}>{service.date} {service.month}</span>
                      </div>
                      <div className="flex items-center gap-3 mb-4">
                        <Clock className="w-5 h-5 text-primary" />
                        <span className="text-2xl font-semibold" data-testid={`text-time-${service.id}`}>{service.time}</span>
                      </div>
                      <p className="text-foreground font-medium mb-2" data-testid={`text-preacher-${service.id}`}>{service.preacher}</p>
                      {service.special && (
                        <span className="inline-block bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full mt-2" data-testid={`badge-special-${service.id}`}>
                          {service.special}
                        </span>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <Card className="p-16 text-center">
              <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">Geen aanstaande diensten beschikbaar</p>
            </Card>
          )}
        </motion.section>

        {/* Community Section with Image */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={communityImage}
                alt="Church community"
                className="rounded-lg w-full h-[400px] object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Deel van onze familie
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Sinds 1586 zijn wij een gemeenschap waar geloof, verbinding en omzien naar elkaar centraal staan. We nodigen je van harte uit om deel uit te maken van onze gemeenschap.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Of je nu op zoek bent naar spirituele groei, gemeenschap of simpelweg een plek om jezelf te zijn - bij ons ben je welkom.
              </p>
              <Link href="/over-ons">
                <Button size="lg" data-testid="button-learn-more">
                  Meer over ons
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* Bible Study Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Groei in geloof
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Verdiep je geloof door onze Bijbelstudies, gebedsgroepen en leerzame bijeenkomsten. Samen ontdekken we de tijdloze waarheden van de Bijbel.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                We bieden verschillende mogelijkheden om te groeien in je geloof, van beginners tot gevorderden.
              </p>
              <Link href="/evenementen">
                <Button size="lg" variant="outline" data-testid="button-events-more">
                  Bekijk activiteiten
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <img
                src={studyImage}
                alt="Bible study group"
                className="rounded-lg w-full h-[400px] object-cover"
              />
            </motion.div>
          </div>
        </motion.section>

        {/* Latest News */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-end justify-between mb-12">
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                Laatste Nieuws
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-muted-foreground text-lg"
              >
                Blijf op de hoogte van wat er speelt
              </motion.p>
            </div>
            <Link href="/nieuws">
              <Button variant="outline" className="gap-2 hidden sm:flex" data-testid="button-view-all-news">
                Alle Nieuws
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {newsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <Skeleton className="h-48 w-full" />
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : latestNews && latestNews.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {latestNews.map((article, index) => (
                <motion.div
                  key={article.id}
                  variants={itemVariants}
                  custom={index}
                >
                  <Card className="hover-elevate transition-all duration-300 overflow-hidden h-full group" data-testid={`card-news-${article.id}`}>
                    {article.imageUrl && (
                      <div className="aspect-video w-full overflow-hidden bg-muted">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          data-testid={`img-news-${article.id}`}
                        />
                      </div>
                    )}
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Calendar className="w-4 h-4" />
                        <span>{article.date}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-3 line-clamp-2" data-testid={`text-title-${article.id}`}>
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground line-clamp-3" data-testid={`text-excerpt-${article.id}`}>
                        {article.excerpt}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <Card className="p-16 text-center">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">Geen nieuws beschikbaar</p>
            </Card>
          )}
        </motion.section>
      </div>
    </div>
  );
}
