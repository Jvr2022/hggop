import { Link } from "wouter";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <Card className="max-w-md w-full">
        <CardContent className="pt-12 pb-8 px-8 text-center">
          <div className="mb-6">
            <div className="text-6xl font-bold text-primary mb-2">404</div>
            <h1 className="text-2xl font-semibold text-foreground mb-3">
              Pagina Niet Gevonden
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              De pagina die u zoekt bestaat niet of is verplaatst. 
              Ga terug naar de homepage of bekijk onze andere pagina's.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="gap-2" data-testid="button-home">
              <Link href="/">
                <Home className="w-4 h-4" />
                Naar Homepage
              </Link>
            </Button>
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="gap-2"
              data-testid="button-back"
            >
              <ArrowLeft className="w-4 h-4" />
              Ga Terug
            </Button>
          </div>

          <div className="mt-8 pt-6 border-t border-card-border">
            <p className="text-sm text-muted-foreground mb-3">Of bezoek een van deze pagina's:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link href="/diensten">
                <Button variant="link" size="sm" data-testid="link-diensten">Diensten</Button>
              </Link>
              <Link href="/nieuws">
                <Button variant="link" size="sm" data-testid="link-nieuws">Nieuws</Button>
              </Link>
              <Link href="/over-ons">
                <Button variant="link" size="sm" data-testid="link-over-ons">Over Ons</Button>
              </Link>
              <Link href="/contact">
                <Button variant="link" size="sm" data-testid="link-contact">Contact</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
