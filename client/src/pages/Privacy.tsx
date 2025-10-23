import { Shield, Lock, Eye, FileText } from "lucide-react";
import Hero from "@/components/Hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <Hero
        title="Privacyverklaring"
        subtitle="Informatie over hoe wij omgaan met uw persoonsgegevens en privacy."
        showServiceTimes={false}
      />

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                AVG - Algemene Verordening Gegevensbescherming
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Voor de Protestantse Kerk in Nederland en haar gemeenten is privacy en een veilige omgeving van groot belang. 
                De Protestantse Kerk in Nederland en haar gemeenten zijn volgens de kerkorde geroepen tot dienst aan de wereld 
                waarin omzien naar elkaar, betrokkenheid met elkaar en het vormen van een gemeenschap belangrijke pijlers zijn.
              </p>
              <p>
                Vanaf 25 mei 2018 moet iedere organisatie binnen de Europese Unie voldoen aan de nieuwe privacywetgeving, 
                die is opgenomen in de Algemene Verordening Gegevensbescherming (AVG).
              </p>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  Uw Rechten
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  U heeft het recht dat er zorgvuldig en rechtmatig met uw persoonsgegevens wordt omgegaan. 
                  De AVG geeft u de volgende rechten:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Het recht op inzage van uw persoonsgegevens</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Het recht op rectificatie en aanvulling van uw gegevens</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Het recht op vergetelheid (onder bepaalde voorwaarden)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Het recht op beperking van de verwerking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Het recht op dataportabiliteit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Het recht om bezwaar te maken tegen gegevensverwerking</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" />
                  Welke Gegevens Verwerken Wij?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  De gemeente verwerkt persoonsgegevens in het kader van:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Ledenadministratie (naam, adres, contactgegevens)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Kerkelijke handelingen (doop, belijdenis, trouwen)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Communicatie (weekbrief, nieuwsbrieven)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Pastoraat en diaconaat</span>
                  </li>
                </ul>
                <p className="pt-4 border-t border-card-border">
                  Binnen de kerk is eenieder die op basis van zijn kerkelijke functie gegevens ontvangt 
                  tot geheimhouding verplicht.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Contact & Vragen
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Voor vragen over privacy of om gebruik te maken van uw rechten kunt u contact opnemen met:
                </p>
                <div className="bg-background border border-card-border rounded-lg p-4">
                  <p className="font-medium text-foreground mb-2">Coördinator Gegevensbescherming</p>
                  <a
                    href="mailto:avg@hggop.nl"
                    className="text-primary hover:underline"
                    data-testid="link-avg-email"
                  >
                    avg@hggop.nl
                  </a>
                </div>
                <p className="text-sm pt-4 border-t border-card-border">
                  Voor het volledige privacystatement kunt u contact opnemen met bovenstaand emailadres.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
