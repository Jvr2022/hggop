import { useQuery } from "@tanstack/react-query";
import { Heart, Users, BookOpen, Shield, Mail, Phone } from "lucide-react";
import Hero from "@/components/Hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
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

  return (
    <div className="min-h-screen bg-background">
      <Hero
        title="Over Onze Gemeente"
        subtitle="Een gemeenschap gebouwd op geloof, verbinding en omzien naar elkaar sinds 1586."
        showServiceTimes={false}
      />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Identity */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-foreground mb-6">Identiteit</h2>
          <Card>
            <CardContent className="p-8 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Als Hervormde Gemeente Giessen-Oudekerk en Peursum hechten we aan een identiteit die bestaat uit 
                schriftgetrouwheid en oprechtheid in belijden en handelen. De Bijbel wordt erkend als woord van God 
                en als grondslag van de kerk.
              </p>
              <p>
                Als gemeente zien we onszelf als een gestalte van de ene algemene christelijke Kerk op aarde, 
                waarvan Jezus Christus stichter, hoofd, Heer en Koning is.
              </p>
              <p>
                We willen als gemeente afgewogen en evenwichtig plaats bieden aan jong en oud, man en vrouw. 
                In de prediking en de liturgie is er volop ruimte binnen de lijnen van schrift en belijdenis.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* History */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-foreground mb-6">Geschiedenis</h2>
          <Card>
            <CardContent className="p-8 space-y-4">
              <div className="flex items-start gap-4">
                <BookOpen className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div className="text-muted-foreground leading-relaxed space-y-4">
                  <p>
                    Als Hervormde Gemeente Giessen-Oudekerk en Peursum vinden we onze oorsprong in 1586, 
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
                    maken we als gemeente sinds 2004 deel uit van de Protestantse Kerk in Nederland (PKN).
                  </p>
                  <p>
                    De gemeente telt momenteel circa <strong className="text-foreground">1.925 leden</strong>, 
                    waarvan circa <strong className="text-foreground">650 belijdende leden</strong>.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Vision */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-foreground mb-6">Visie</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover-elevate">
              <CardHeader>
                <Heart className="w-8 h-8 text-primary mb-3" />
                <CardTitle className="text-xl">Vieren</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Samen God eren in erediensten met diverse liedtradities en betekenisvolle liturgie.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate">
              <CardHeader>
                <Users className="w-8 h-8 text-primary mb-3" />
                <CardTitle className="text-xl">Getuigen</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  De liefde van God delen, dichtbij en veraf, door woord en daad.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate">
              <CardHeader>
                <BookOpen className="w-8 h-8 text-primary mb-3" />
                <CardTitle className="text-xl">Ontmoeten</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Verbinding zoeken met elkaar en met God in kringen, activiteiten en pastoraat.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Church Council */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-foreground mb-6">Kerkenraad</h2>
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
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">Informatie over de kerkenraad wordt binnenkort toegevoegd</p>
            </Card>
          )}
        </section>

        {/* Safety */}
        <section>
          <h2 className="text-3xl font-semibold text-foreground mb-6">Veilige Gemeenschap</h2>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <Shield className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
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
              <div className="bg-background border border-card-border rounded-lg p-6">
                <h4 className="font-semibold text-foreground mb-3">Vertrouwenspersoon</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Bij behoefte aan een vertrouwelijk gesprek kunt u contact opnemen met onze vertrouwenspersoon:
                </p>
                <a
                  href="mailto:vertrouwenspersoon.hggop@gmail.com"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  data-testid="link-vertrouwenspersoon"
                >
                  <Mail className="w-4 h-4" />
                  vertrouwenspersoon.hggop@gmail.com
                </a>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
