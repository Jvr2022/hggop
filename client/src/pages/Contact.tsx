import { Mail, Phone, MapPin, Clock, Youtube, Facebook } from "lucide-react";
import Hero from "@/components/Hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <Hero
        title="Contact"
        subtitle="Heeft u vragen of wilt u in contact komen met onze gemeente? We horen graag van u."
        showServiceTimes={false}
      />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Locatie
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <div>
                  <p className="font-medium text-foreground">
                    Hervormde Gemeente Giessen-Oudekerk en Peursum
                  </p>
                  <p>Giessen-Oudekerk</p>
                  <p>Nederland</p>
                </div>
                <p className="text-sm pt-3 border-t border-card-border">
                  De kerk is gelegen in het hart van Giessen-Oudekerk, 
                  herkenbaar aan de karakteristieke kerktoren.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  Email Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Predikant</p>
                  <a
                    href="mailto:t.c.verhoef@hggop.nl"
                    className="text-foreground hover:text-primary transition-colors"
                    data-testid="link-predikant-email"
                  >
                    t.c.verhoef@hggop.nl
                  </a>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Algemene Vragen</p>
                  <a
                    href="mailto:predikant@hggop.nl"
                    className="text-foreground hover:text-primary transition-colors"
                    data-testid="link-general-email"
                  >
                    predikant@hggop.nl
                  </a>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Website Beheer</p>
                  <a
                    href="mailto:webbeheerder@hggop.nl"
                    className="text-foreground hover:text-primary transition-colors"
                    data-testid="link-webmaster-email"
                  >
                    webbeheerder@hggop.nl
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary" />
                  Telefonisch Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-muted-foreground">
                  <p className="text-sm">
                    Voor telefonisch contact kunt u een email sturen naar een van de bovenstaande adressen. 
                    U wordt dan teruggebeld.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Service Times & Social */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Kerkdiensten
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium text-foreground mb-2">Zondag Ochtend</p>
                  <p className="text-muted-foreground">9:00 uur</p>
                  <p className="text-muted-foreground">10:45 uur</p>
                </div>
                <div className="pt-4 border-t border-card-border">
                  <p className="font-medium text-foreground mb-2">Zondag Avond</p>
                  <p className="text-muted-foreground">18:30 uur</p>
                </div>
                <p className="text-sm text-muted-foreground pt-4 border-t border-card-border">
                  Gedurende de zomerperiode is er één morgendienst om 9:30 uur.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Volg Ons Online</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Blijf op de hoogte via onze sociale media kanalen en bekijk onze livestreams.
                </p>
                <div className="flex gap-3">
                  <Button
                    asChild
                    className="flex-1 gap-2"
                    data-testid="button-youtube"
                  >
                    <a
                      href="https://www.youtube.com/channel/UCAGi5k-LRMaNU1FDKARpx4A"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Youtube className="w-5 h-5" />
                      YouTube
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="flex-1 gap-2"
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
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle>Bent U Nieuw?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  U bent van harte welkom in onze gemeente! Of u nu nieuw bent in de omgeving of 
                  op zoek naar een kerkgemeenschap, we kijken ernaar uit u te ontmoeten.
                </p>
                <p className="text-sm text-muted-foreground">
                  Voor vragen over het geloof of lidmaatschap kunt u contact opnemen met onze predikant.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Info */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Bereikbaarheid</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                De kerk is goed bereikbaar met de auto. Er is parkeergelegenheid in de omgeving van de kerk.
              </p>
              <p className="text-sm text-muted-foreground">
                Voor een routebeschrijving kunt u "Giessen-Oudekerk Kerk" invoeren in uw navigatiesysteem of Google Maps.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
