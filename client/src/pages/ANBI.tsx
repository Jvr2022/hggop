import { FileCheck, Building2, Users, Euro, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ANBI() {
  const [selectedYear, setSelectedYear] = useState<number>(2025);

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

  // Generate years from 2018 to 2025
  const years = Array.from({ length: 8 }, (_, i) => 2025 - i);
  
  // Generate months for selected year
  const getMonthsForYear = (year: number) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    
    if (year === currentYear) {
      return Array.from({ length: currentMonth }, (_, i) => i + 1);
    }
    return Array.from({ length: 12 }, (_, i) => i + 1);
  };

  const monthNames = ["Jan", "Feb", "Mrt", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];

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
          <div className="flex items-center gap-6 mb-4 flex-wrap">
            <img src="/assets/image_1761243403051.png" alt="ANBI Logo" className="w-20 h-auto" />
            <h1 className="text-4xl md:text-5xl font-bold">ANBI Status</h1>
          </div>
          <p className="text-lg opacity-90 max-w-2xl">
            Algemeen Nut Beogende Instelling - Transparantie en fiscale informatie
          </p>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* What is ANBI Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="flex items-start gap-4 mb-12">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <FileCheck className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Wat is een ANBI?</h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  Algemeen Nut Beogende Instellingen (ANBI's) kunnen gebruikmaken van bepaalde belastingvoordelen bij erven, schenken en giften. 
                  Giften aan dergelijke instellingen kunnen, binnen de daarvoor door de overheid gestelde grenzen en regels, in aanmerking komen voor aftrek.
                </p>
                <p>
                  De Protestantse Kerk in Nederland is erkend als ANBI. Deze status is van toepassing op alle tot de kerk behorende rechtspersonen, waaronder onze gemeente.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Organization Details */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-3xl font-bold mb-12">Organisatiegegevens</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-4">College van Kerkrentmeesters</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">RSIN-nummer</p>
                      <p className="font-mono text-lg">824115016</p>
                    </div>
                    <div className="pt-3 border-t border-border">
                      <p className="text-sm text-muted-foreground mb-1">Bankgegevens</p>
                      <p className="font-mono">NL55 RABO 0321 7031 54</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        t.n.v. Hervormde Gemeente Giessen-Oudekerk en Peursum
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-4">College van Diakenen</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">RSIN-nummer</p>
                      <p className="font-mono text-lg">824115089</p>
                    </div>
                    <div className="pt-3 border-t border-border">
                      <p className="text-sm text-muted-foreground mb-1">Bankgegevens</p>
                      <p className="font-mono">NL12 RABO 0321 7021 82</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        t.n.v. Diaconie HGGOP
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Tax Benefits */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Euro className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Giften & Belastingvoordeel</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Giften aan onze gemeente kunnen onder de geldende fiscale voorwaarden aftrekbaar zijn voor de inkomstenbelasting. 
                Dit geldt voor zowel het College van Kerkrentmeesters als het College van Diakenen.
              </p>
              <div className="rounded-lg ring-1 ring-border p-4 bg-muted/30">
                <p className="text-sm">
                  Voor actuele informatie over de fiscale voorwaarden en aftrekmogelijkheden verwijzen wij u naar de website van de Belastingdienst 
                  of raadpleeg uw belastingadviseur.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Verantwoording Documents */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <h2 className="text-3xl font-bold mb-8">Verantwoording Collecte</h2>
          <p className="text-muted-foreground mb-6">
            Download de maandelijkse verantwoording van collecteopbrengsten per jaar.
          </p>
          
          {/* Year Selector */}
          <div className="flex flex-wrap gap-2 mb-6">
            {years.map((year) => (
              <Button
                key={year}
                variant={selectedYear === year ? "default" : "outline"}
                onClick={() => setSelectedYear(year)}
                size="sm"
              >
                {year}
              </Button>
            ))}
          </div>

          {/* Month Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {getMonthsForYear(selectedYear).map((month) => (
              <Button
                key={month}
                variant="outline"
                className="h-auto py-3 flex flex-col items-center gap-1"
                asChild
              >
                <a
                  href={`/docs/${selectedYear}-${String(month).padStart(2, '0')}.xls`}
                  download
                >
                  <Download className="w-4 h-4" />
                  <span className="text-sm font-medium">{monthNames[month - 1]}</span>
                  <span className="text-xs text-muted-foreground">{selectedYear}</span>
                </a>
              </Button>
            ))}
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
            <h3 className="text-2xl font-semibold mb-3">Contact & Informatie</h3>
            <p className="text-muted-foreground mb-4">
              Voor uitgebreide financiële informatie, jaarrekeningen en beleidsplannen kunt u contact opnemen met:
            </p>
            <div className="rounded-lg p-4 ring-1 ring-border bg-background/60 inline-block">
              <a
                href="mailto:kerkrentmeesters@hggop.nl"
                className="text-primary hover:underline text-lg font-medium"
                data-testid="link-kerkrentmeesters-email"
              >
                kerkrentmeesters@hggop.nl
              </a>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
