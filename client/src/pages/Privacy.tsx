import { Shield, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { motion } from "framer-motion";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-primary text-primary-foreground py-20"
      >
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacyverklaring</h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Informatie over hoe wij omgaan met uw persoonsgegevens en privacy
          </p>
        </div>
      </motion.div>

      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Notice Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-start gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-3">AVG & Gegevensbescherming</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Sinds 25 mei 2018 voldoen wij aan de AVG (Algemene Verordening Gegevensbescherming). 
                Voor de Protestantse Kerk in Nederland en onze gemeente is privacy en een veilige omgeving van groot belang.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Voor vragen kunt u contact opnemen met:{" "}
                <a href="mailto:avg@hggop.nl" className="text-primary hover:underline font-medium" data-testid="link-avg-email">
                  avg@hggop.nl
                </a>
              </p>
            </div>
          </div>
        </motion.section>

        {/* Documents Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-8">Documenten</h2>
          <div className="relative">
            <Carousel className="w-full">
              <CarouselContent>
                <CarouselItem>
                  <div className="relative rounded-xl overflow-hidden ring-1 ring-border bg-background">
                    <div className="absolute z-10 top-3 right-3 flex gap-2">
                      <Button size="sm" asChild>
                        <a href="/docs/privacy/privacy-statement.pdf" download>
                          <Download className="w-4 h-4" /> Download
                        </a>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <a href="/docs/privacy/privacy-statement.pdf" target="_blank" rel="noreferrer">
                          <ExternalLink className="w-4 h-4" /> Openen
                        </a>
                      </Button>
                    </div>
                    <AspectRatio ratio={16 / 9}>
                      <iframe
                        src="/docs/privacy/privacy-statement.pdf#view=FitH"
                        title="Privacystatement HGGOP"
                        className="w-full h-full"
                      />
                    </AspectRatio>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">Privacystatement HGGOP</p>
                </CarouselItem>
                <CarouselItem>
                  <div className="relative rounded-xl overflow-hidden ring-1 ring-border bg-background">
                    <div className="absolute z-10 top-3 right-3 flex gap-2">
                      <Button size="sm" asChild>
                        <a href="/docs/privacy/toelichting-avg.pdf" download>
                          <Download className="w-4 h-4" /> Download
                        </a>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <a href="/docs/privacy/toelichting-avg.pdf" target="_blank" rel="noreferrer">
                          <ExternalLink className="w-4 h-4" /> Openen
                        </a>
                      </Button>
                    </div>
                    <AspectRatio ratio={16 / 9}>
                      <iframe
                        src="/docs/privacy/toelichting-avg.pdf#view=FitH"
                        title="Toelichting AVG"
                        className="w-full h-full"
                      />
                    </AspectRatio>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">Toelichting AVG</p>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
