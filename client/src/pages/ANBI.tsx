import { FileCheck, Building2, Users, Euro, Info } from "lucide-react";
import Hero from "@/components/Hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ANBI() {
  return (
    <div className="min-h-screen bg-background">
      <Hero
        title="ANBI Status"
        subtitle="Algemeen Nut Beogende Instelling - Transparantie en fiscale informatie."
        showServiceTimes={false}
      />

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-8">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-primary" />
                Wat is een ANBI?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Algemeen Nut Beogende Instellingen (ANBI's) kunnen gebruikmaken van bepaalde belastingvoordelen 
                bij erven, schenken en giften. Giften aan dergelijke instellingen kunnen, binnen de daarvoor door 
                de overheid gestelde grenzen en regels, in aanmerking komen voor aftrek in de aangifte voor de 
                inkomstenbelasting.
              </p>
              <p>
                De Protestantse Kerk in Nederland is door de Belastingdienst erkend als een Algemeen Nut Beogende 
                Instelling (ANBI). De Protestantse Kerk heeft van de belastingdienst een groepsbeschikking ontvangen. 
                Deze is van toepassing op alle tot de kerk behorende rechtspersonen, waaronder onze gemeente.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  College van Kerkrentmeesters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">RSIN-nummer</p>
                  <p className="font-mono">824115016</p>
                </div>
                <div className="pt-3 border-t border-card-border">
                  <p className="text-sm font-medium text-foreground mb-1">Bankgegevens</p>
                  <p className="font-mono">NL55 RABO 0321 7031 54</p>
                  <p className="text-sm mt-1">
                    t.n.v. Hervormde Gemeente Giessen-Oudekerk en Peursum
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  College van Diakenen
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">RSIN-nummer</p>
                  <p className="font-mono">824115089</p>
                </div>
                <div className="pt-3 border-t border-card-border">
                  <p className="text-sm font-medium text-foreground mb-1">Bankgegevens</p>
                  <p className="font-mono">NL12 RABO 0321 7021 82</p>
                  <p className="text-sm mt-1">
                    t.n.v. Diaconie HGGOP
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Euro className="w-5 h-5 text-primary" />
                Giften & Belastingvoordeel
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Giften aan onze gemeente kunnen onder de geldende fiscale voorwaarden aftrekbaar zijn voor de 
                inkomstenbelasting. Dit geldt voor zowel het College van Kerkrentmeesters als het College van Diakenen.
              </p>
              <div className="bg-background border border-card-border rounded-lg p-4">
                <p className="text-sm text-foreground font-medium mb-2">Let op:</p>
                <p className="text-sm">
                  Voor actuele informatie over de fiscale voorwaarden en aftrekmogelijkheden verwijzen wij u naar 
                  de website van de Belastingdienst of raadpleeg uw belastingadviseur.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                Transparantie & Publicatie
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Vanaf 1 januari 2016 moeten elke gemeente, diaconie en classicale vergadering transparant zijn over 
                bestuur, beloning, doel en beleidsplan, over jaarrekening en jaarverslag.
              </p>
              <p>
                Voor uitgebreide financiële informatie, jaarrekeningen en beleidsplannen kunt u contact opnemen met:
              </p>
              <div className="bg-background border border-card-border rounded-lg p-4">
                <a
                  href="mailto:kerkrentmeesters@hggop.nl"
                  className="text-primary hover:underline"
                  data-testid="link-kerkrentmeesters-email"
                >
                  kerkrentmeesters@hggop.nl
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/50">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-muted-foreground">
                Deze pagina bevat de publicatieplicht informatie volgens de ANBI-regelgeving.
                <br />
                Laatst bijgewerkt: {new Date().toLocaleDateString("nl-NL", {
                  year: "numeric",
                  month: "long",
                })}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
