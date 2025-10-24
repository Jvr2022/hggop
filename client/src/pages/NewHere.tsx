import { Heart, Calendar, Users, Coffee, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NewHere() {
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
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-primary text-primary-foreground py-20"
      >
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Ik ben nieuw</h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Van harte welkom in onze gemeenschap! We kijken ernaar uit u te ontmoeten
          </p>
        </div>
      </motion.div>

      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Welcome Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="flex items-start gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Welkom!</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Of u nu nieuw bent in de omgeving of op zoek naar een kerkgemeenschap, 
                  u bent van harte welkom bij de Hervormde Gemeente Giessen-Oudekerk en Peursum.
                </p>
                <p>
                  We zijn een gemeenschap waar geloof, verbinding en omzien naar elkaar centraal staan sinds 1586. 
                  Bij ons vindt u een plek waar u zich thuis kunt voelen, waar u kunt groeien in geloof en 
                  waar u betekenisvolle relaties kunt opbouwen.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* What to Expect */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-3xl font-bold mb-12">Wat kunt u verwachten?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div variants={itemVariants} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Kerkdiensten</h3>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Op zondag zijn er 's morgens twee kerkdiensten om <strong>9:00 uur</strong> en <strong>10:45 uur</strong>. 
                  's Avonds begint de dienst om <strong>18:30 uur</strong>.
                </p>
                <p className="text-sm text-muted-foreground">
                  Gedurende de zomerperiode is er één morgendienst om 9:30 uur.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Coffee className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Ontmoeting</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Elke derde zondag van de maand is er gelegenheid elkaar te ontmoeten rond koffie, 
                  thee en fris tussen de beide ochtenddiensten of na de avonddienst.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Ontvangst</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Bij binnenkomst wordt u hartelijk begroet door onze ontvangstcommissie. 
                  Zij helpen u graag op weg en beantwoorden uw vragen.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Heart className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Kinderen</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Voor kinderen onder de 4 jaar is er oppas tijdens beide morgendiensten. 
                  Tijdens de tweede ochtenddienst is er zondagsschool voor basisschoolkinderen.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Practical Info */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <h2 className="text-3xl font-bold mb-8">Praktische informatie</h2>
          <div className="space-y-6">
            <div className="rounded-xl ring-1 ring-border p-6 bg-muted/30">
              <h3 className="font-semibold mb-2">Locatie</h3>
              <p className="text-muted-foreground">
                Oudkerkseweg 20, 3381 KR Giessen-Oudekerk
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                De kerk is goed bereikbaar met de auto. Er is parkeergelegenheid in de omgeving.
              </p>
            </div>

            <div className="rounded-xl ring-1 ring-border p-6 bg-muted/30">
              <h3 className="font-semibold mb-2">Livestream</h3>
              <p className="text-muted-foreground">
                Kunt u er niet bij zijn? De eerste ochtenddienst en de avonddienst worden live 
                uitgezonden via ons YouTube kanaal.
              </p>
            </div>

            <div className="rounded-xl ring-1 ring-border p-6 bg-muted/30">
              <h3 className="font-semibold mb-2">Vervoer nodig?</h3>
              <p className="text-muted-foreground">
                Heeft u geen vervoer naar de kerkdiensten? U kunt gebruikmaken van de kerkauto. 
                Neem hiervoor contact op met de predikant.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="rounded-xl border border-primary/20 bg-gradient-to-r from-primary/10 to-transparent p-8">
            <h2 className="text-2xl font-semibold mb-4">Vragen?</h2>
            <p className="text-muted-foreground mb-6">
              Heeft u vragen over het geloof, lidmaatschap of wilt u meer weten over onze gemeente? 
              Neem gerust contact op met onze predikant.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <a href="mailto:t.c.verhoef@hggop.nl" className="text-primary hover:underline">
                  t.c.verhoef@hggop.nl
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <a href="tel:+31639730344" className="text-primary hover:underline">
                  06-39730344
                </a>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <Button asChild>
                <Link href="/diensten">Bekijk Diensten</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">Contact Opnemen</Link>
              </Button>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
