import { Mail, Phone, MapPin, Clock, Youtube, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Contact() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact</h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Heeft u vragen of wilt u in contact komen? We horen graag van u
          </p>
        </div>
      </motion.div>

      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Contact Info */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div variants={itemVariants}>
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">Bezoekadres</h2>
                  <div className="text-muted-foreground space-y-1">
                    <p className="font-medium text-foreground">Hervormde Gemeente Giessen-Oudekerk en Peursum</p>
                    <p>Oudkerkseweg 20</p>
                    <p>3381 KR Giessen-Oudekerk</p>
                    <p className="pt-2">Nederland</p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    De kerk is gelegen in het hart van Giessen-Oudekerk, herkenbaar aan de karakteristieke kerktoren.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">Kerkdiensten</h2>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-foreground mb-1">Zondag Ochtend</p>
                      <p className="text-muted-foreground">9:00 uur en 10:45 uur</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">Zondag Avond</p>
                      <p className="text-muted-foreground">18:30 uur</p>
                    </div>
                    <p className="text-sm text-muted-foreground pt-2 border-t border-border">
                      Gedurende de zomerperiode is er één morgendienst om 9:30 uur.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Email Contacts */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="flex items-start gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-6">Email Contact</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Predikant</p>
                  <a
                    href="mailto:t.c.verhoef@hggop.nl"
                    className="text-lg text-primary hover:underline"
                    data-testid="link-predikant-email"
                  >
                    t.c.verhoef@hggop.nl
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">T.C. Verhoef</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Kerkelijk Bureau</p>
                  <a
                    href="mailto:kerkelijkbureau@hggop.nl"
                    className="text-lg text-primary hover:underline"
                  >
                    kerkelijkbureau@hggop.nl
                  </a>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Scriba</p>
                  <a
                    href="mailto:scriba@hggop.nl"
                    className="text-lg text-primary hover:underline"
                  >
                    scriba@hggop.nl
                  </a>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Website Beheer</p>
                  <a
                    href="mailto:webbeheerder@hggop.nl"
                    className="text-lg text-primary hover:underline"
                    data-testid="link-webmaster-email"
                  >
                    webbeheerder@hggop.nl
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Phone */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3">Telefonisch</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Predikant</p>
                  <a href="tel:+31639730344" className="text-lg text-primary hover:underline">
                    06-39730344
                  </a>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Kerkelijk Bureau</p>
                  <a href="tel:+31184651407" className="text-lg text-primary hover:underline">
                    0184-651407
                  </a>
                </div>
                <p className="text-sm text-muted-foreground pt-3 border-t border-border">
                  Voor andere telefonische contacten kunt u een email sturen, u wordt dan teruggebeld.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Social Media */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-6">Volg Ons Online</h2>
          <p className="text-muted-foreground mb-6">
            Blijf op de hoogte via onze sociale media kanalen en bekijk onze livestreams.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              className="gap-2"
              data-testid="button-youtube"
            >
              <a
                href="https://www.youtube.com/channel/UCAGi5k-LRMaNU1FDKARpx4A"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="w-5 h-5" />
                YouTube Kanaal
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="gap-2"
              data-testid="button-facebook"
            >
              <a
                href="https://www.facebook.com/profile.php?id=100070326722884"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="w-5 h-5" />
                Facebook
              </a>
            </Button>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
