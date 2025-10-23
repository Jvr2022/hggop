import { useQuery } from "@tanstack/react-query";
import { Heart, Users, BookOpen, Shield, Mail, Phone, MapPin, Church, HandHeart, Baby, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import type { CouncilMember } from "@shared/schema";

export default function About() {
  const { data: councilMembers, isLoading } = useQuery<CouncilMember[]>({
    queryKey: ["/api/council"],
  });

  const groupedMembers = councilMembers?.reduce((acc, member) => {
    if (!acc[member.category]) {
      acc[member.category] = [];
    }
    acc[member.category].push(member);
    return acc;
  }, {} as Record<string, CouncilMember[]>);

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

  const wijken = [
    { nr: 1, name: "Peursumseweg, Polder ten oosten van de Peursumsevliet, Giessen-Nieuwkerk" },
    { nr: 2, name: "Bovenkerkseweg" },
    { nr: 3, name: "Oudkerkseweg" },
    { nr: 4, name: "Dr. Gravemeijerstraat, Kloevelaan, H.J. van Dijkstraat" },
    { nr: 5, name: "Binnendamseweg, Binnendams" },
    { nr: 6, name: "Hardinxveld-Giessendam: Over 't Spoor, 'Oud West', Westwijk" },
    { nr: 7, name: "Hardinxveld-Giessendam: Buitendams, Peulenwijk" },
    { nr: 8, name: "Hardinxveld-Giessendam: Wielwijk, Industrieterrein Nieuweweg" },
    { nr: 9, name: "Boven-Hardinxveld, onder de A15" },
    { nr: 10, name: "Overige gemeenten, Polder ten westen Peursumsevliet" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-primary text-primary-foreground py-20"
      >
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Over Onze Gemeente</h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Een gemeenschap gebouwd op geloof, verbinding en omzien naar elkaar sinds 1586
          </p>
        </div>
      </motion.div>

      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Identity */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <h2 className="text-3xl font-bold mb-8">Identiteit</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Als Hervormde Gemeente Giessen-Oudekerk en Peursum hechten we aan een identiteit die bestaat uit 
              schriftgetrouwheid en oprechtheid in belijden en handelen. De Bijbel wordt erkend als woord van God 
              en als grondslag van de kerk.
            </p>
            <p>
              Als gemeente zien we onszelf als een gestalte van de ene algemene christelijke Kerk op aarde, 
              waarvan Jezus Christus stichter, hoofd, Heer en Koning is.
            </p>
          </div>
        </motion.section>

        {/* History */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Geschiedenis</h2>
            </div>
          </div>
          <div className="text-muted-foreground leading-relaxed space-y-4">
            <p>
              Als Hervormde Gemeente Giessen-Oudekerk en Peursum vinden we onze oorsprong in <strong className="text-foreground">1586</strong>, 
              toen na de Reformatie een protestantse gemeente werd gesticht.
            </p>
            <p>
              Het gemeentelogo is een verbeelding van Johannes 7:38, waar Jezus Christus zegt: 
              <span className="font-serif italic block mt-2 ml-4 text-foreground border-l-4 border-primary pl-4">
                "Stromen van levend water zullen stromen uit het hart van wie in Mij gelooft."
              </span>
            </p>
            <p>
              Na jaren te hebben behoord tot het kerkgenootschap van de Nederlandse Hervormde Kerk, 
              maken we als gemeente sinds <strong className="text-foreground">2004</strong> deel uit van de Protestantse Kerk in Nederland (PKN).
            </p>
            <p>
              De gemeente telt momenteel circa <strong className="text-foreground">1.925 leden</strong>, 
              waarvan circa <strong className="text-foreground">650 belijdende leden</strong>.
            </p>
          </div>
        </motion.section>

        {/* Vision */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-3xl font-bold mb-12">Visie</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={itemVariants} className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Vieren</h3>
                <p className="text-muted-foreground">
                  Samen God eren in erediensten met diverse liedtradities en betekenisvolle liturgie.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Getuigen</h3>
                <p className="text-muted-foreground">
                  De liefde van God delen, dichtbij en veraf, door woord en daad.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Ontmoeten</h3>
                <p className="text-muted-foreground">
                  Verbinding zoeken met elkaar en met God in kringen, activiteiten en pastoraat.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Church Council */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <h2 className="text-3xl font-bold mb-4">Kerkenraad</h2>
          <p className="text-muted-foreground mb-8">
            De kerkenraad geeft leiding aan de gemeente en bestaat uit ouderlingen, diakenen en de predikant.
          </p>

          {isLoading ? (
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-6 w-32" />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Skeleton className="h-32" />
                    <Skeleton className="h-32" />
                    <Skeleton className="h-32" />
                  </div>
                </div>
              ))}
            </div>
          ) : councilMembers && councilMembers.length > 0 ? (
            <div className="space-y-12">
              {Object.entries(groupedMembers || {}).map(([category, members]) => (
                <div key={category}>
                  <h3 className="text-xl font-semibold text-foreground mb-4 capitalize">{category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {members.map((member) => (
                      <Card key={member.id} className="hover-elevate" data-testid={`card-member-${member.id}`}>
                        <CardContent className="p-6">
                          <h4 className="font-semibold text-foreground mb-1" data-testid={`text-name-${member.id}`}>{member.name}</h4>
                          <p className="text-sm text-muted-foreground mb-3" data-testid={`text-role-${member.id}`}>{member.role}</p>
                          <div className="space-y-1.5">
                            <a
                              href={`mailto:${member.email}`}
                              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                              data-testid={`link-email-${member.id}`}
                            >
                              <Mail className="w-3.5 h-3.5" />
                              <span className="truncate">{member.email}</span>
                            </a>
                            {member.phone && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Phone className="w-3.5 h-3.5" />
                                <span data-testid={`text-phone-${member.id}`}>{member.phone}</span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">Informatie over de kerkenraad wordt binnenkort toegevoegd</p>
          )}
        </motion.section>

        {/* Wijkindeling */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-3">Wijkindeling</h2>
              <p className="text-muted-foreground mb-6">
                Voor een goed contact tussen kerkenraad en gemeente is de gemeente onderverdeeld in 10 geografische wijken.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {wijken.map((wijk) => (
                  <div key={wijk.nr} className="rounded-lg ring-1 ring-border p-4 bg-muted/30">
                    <span className="font-semibold text-primary">Wijk {wijk.nr}</span>
                    <p className="text-sm text-muted-foreground mt-1">{wijk.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Pastoraat */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <HandHeart className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4">Pastoraat</h2>
              <p className="text-muted-foreground mb-6">
                Omzien naar elkaar is een taak van de hele gemeente. Heeft u behoefte aan extra geestelijke ondersteuning?
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Wijkouderlingen</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Ieder gezin wordt minimaal 1x per 2 jaar bezocht door een wijkouderling. Zie wijkindeling hierboven.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Predikant & Kerkelijk Werker</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="rounded-lg ring-1 ring-border p-4 bg-background/60">
                      <p className="font-medium text-sm mb-2">T.C. Verhoef</p>
                      <a href="mailto:t.c.verhoef@hggop.nl" className="text-sm text-primary hover:underline flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5" /> t.c.verhoef@hggop.nl
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">06-39730344</p>
                    </div>
                    <div className="rounded-lg ring-1 ring-border p-4 bg-background/60">
                      <p className="font-medium text-sm mb-2">Ronny van Renswoude</p>
                      <a href="mailto:ronny.van.renswoude@hggop.nl" className="text-sm text-primary hover:underline flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5" /> ronny.van.renswoude@hggop.nl
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">06-19460035</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Pastorale Werkgroep</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <p><span className="text-muted-foreground">Structureel:</span> Corrie den Toom, Jose van Dam, Ina Dankers</p>
                    <p><span className="text-muted-foreground">Jeugd:</span> Conny van Wijngaarden</p>
                    <p><span className="text-muted-foreground">Mannen:</span> Geert van Wijngaarden</p>
                    <p><span className="text-muted-foreground">Ziekenhuis:</span> Corry Bolder-Bakker</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Other Important Contacts */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <h2 className="text-3xl font-bold mb-8">Commissies & Contacten</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Diaconie */}
            <div className="rounded-lg ring-1 ring-border p-6 bg-muted/30">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <HandHeart className="w-5 h-5 text-primary" /> Diaconie
              </h3>
              <div className="space-y-2 text-sm">
                <p><strong>HVD:</strong> Liesbeth Heikoop - fam.heikoop@solconmail.nl</p>
                <p><strong>Gemeente in Bloei:</strong> Carolien Bor, Trea Donker, Esther van Houwelingen, Martin Post</p>
                <p className="text-muted-foreground mt-3">Bank: NL12 RABO 0321 7021 82</p>
              </div>
            </div>

            {/* Kerkrentmeesters */}
            <div className="rounded-lg ring-1 ring-border p-6 bg-muted/30">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Church className="w-5 h-5 text-primary" /> Kerkrentmeesters
              </h3>
              <div className="space-y-2 text-sm">
                <p><strong>Voorzitter:</strong> Riens van Dijk</p>
                <p><strong>Penningmeester:</strong> Theo Kon</p>
                <p><strong>Secretaris:</strong> Ruud Cappon</p>
                <p><strong>Lid:</strong> Gert van Loon</p>
                <p className="text-muted-foreground mt-3">Email: kerkrentmeesters@hggop.nl</p>
              </div>
            </div>

            {/* Vorming & Toerusting */}
            <div className="rounded-lg ring-1 ring-border p-6 bg-muted/30">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" /> Vorming & Toerusting
              </h3>
              <div className="space-y-2 text-sm">
                <p>Marian Slagboom - marian.slagboom@hggop.nl</p>
                <p>Andrea Huisman - andreakorevaar@hotmail.com</p>
                <p>Annette van Dijk - avandijkb@gmail.com</p>
                <p className="text-muted-foreground mt-3">Commissie VT: vt@hggop.nl</p>
              </div>
            </div>

            {/* Missionaire Commissie */}
            <div className="rounded-lg ring-1 ring-border p-6 bg-muted/30">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" /> Missionaire Commissie
              </h3>
              <div className="space-y-2 text-sm">
                <p>Jeannette de Groot (secretaris) - 0184-617626</p>
                <p>Marrie Houweling - 0184-617893</p>
                <p>Emma Kraaijeveld - 0184-654979</p>
                <p>Pieter Meerkerk (penningmeester) - 06-13102884</p>
              </div>
            </div>

            {/* Kinderwerk */}
            <div className="rounded-lg ring-1 ring-border p-6 bg-muted/30">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Baby className="w-5 h-5 text-primary" /> Kinderwerk
              </h3>
              <div className="space-y-2 text-sm">
                <p><strong>Kinderoppas:</strong> Rianda Kroon, Christa de Rijke</p>
                <p>kinderoppas@hggop.nl</p>
                <p><strong>Zondagsschool:</strong> Angelina Folkerts</p>
                <p>Ffolkerts10@gmail.com</p>
              </div>
            </div>

            {/* Communicatie */}
            <div className="rounded-lg ring-1 ring-border p-6 bg-muted/30">
              <h3 className="font-semibold text-lg mb-3">Communicatie</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Weekbrief:</strong> Aleida Oskam - weekbrief@hggop.nl</p>
                <p><strong>Rond de Toren:</strong> Arina Both - redactie.ronddetoren@hggop.nl</p>
                <p><strong>Website:</strong> Richard van der Sijde - webbeheerder@hggop.nl</p>
                <p><strong>Drukwerk:</strong> Mary Korevaar - drukwerk@hggop.nl</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* HGGOP App */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="rounded-xl border border-primary/20 bg-gradient-to-r from-primary/10 to-transparent p-8">
            <h2 className="text-2xl font-bold mb-4">HGGOP App</h2>
            <p className="text-muted-foreground mb-6">
              Download onze app voor actuele informatie, weekbrief, wijkkringen en meer. 
              Blijf verbonden met de gemeente via uw mobiel of tablet.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <a href="https://play.google.com/store/apps/details?id=app.donkeymobile.pknhggop&gl=NL" target="_blank" rel="noopener noreferrer">
                  Android App
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://apps.apple.com/in/app/hggop/id1537405011" target="_blank" rel="noopener noreferrer">
                  iOS App
                </a>
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Safety */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="rounded-xl border border-primary/20 bg-gradient-to-r from-primary/10 to-transparent p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">Veilige Gemeenschap</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    De kerk is in principe een veilige plaats om te zijn. Om de gewenste sociale veiligheid 
                    helder en bespreekbaar te maken heeft de kerkenraad een eigen gedragscode opgesteld.
                  </p>
                  <p>
                    De kerkenraad vraagt gemeenteleden waakzaam en oplettend te zijn om situaties van 
                    grensoverschrijdend gedrag, intimidaties of discriminaties vroegtijdig te herkennen en 
                    bespreekbaar te maken.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-lg ring-1 ring-border p-6 bg-background/60 ml-16">
              <h4 className="font-semibold text-foreground mb-3">Vertrouwenspersonen</h4>
              <div className="space-y-2">
                <a
                  href="mailto:vertrouwenspersoon.hggop@gmail.com"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  data-testid="link-vertrouwenspersoon"
                >
                  <Mail className="w-4 h-4" />
                  vertrouwenspersoon.hggop@gmail.com
                </a>
                <p className="text-sm text-muted-foreground">L.M.C. van de Wetering</p>
                <p className="text-sm text-muted-foreground">Ronny van Renswoude - 06-19460035</p>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
