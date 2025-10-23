import { Link } from "wouter";
import { Church, Mail, Phone, MapPin, Youtube, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-card-border mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Church className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">HGGOP</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Hervormde Gemeente Giessen-Oudekerk en Peursum. Een gemeenschap waar geloof, verbinding en omzien naar elkaar centraal staan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Snelle Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/diensten" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-diensten">
                  Kerkdiensten
                </Link>
              </li>
              <li>
                <Link href="/nieuws" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-nieuws">
                  Nieuws
                </Link>
              </li>
              <li>
                <Link href="/over-ons" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-over-ons">
                  Over Ons
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Giessen-Oudekerk</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <a href="mailto:predikant@hggop.nl" className="hover:text-foreground transition-colors" data-testid="link-email">
                  predikant@hggop.nl
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Via email bereikbaar</span>
              </li>
            </ul>
          </div>

          {/* Social & Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Volg Ons</h3>
            <div className="flex gap-3 mb-6">
              <a
                href="https://www.youtube.com/channel/UCAGi5k-LRMaNU1FDKARpx4A"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-elevate active-elevate-2 p-2 rounded-md border border-border"
                data-testid="link-youtube"
              >
                <Youtube className="w-5 h-5 text-muted-foreground" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100070326722884"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-elevate active-elevate-2 p-2 rounded-md border border-border"
                data-testid="link-facebook"
              >
                <Facebook className="w-5 h-5 text-muted-foreground" />
              </a>
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-privacy">
                  Privacyverklaring
                </Link>
              </li>
              <li>
                <Link href="/anbi" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-anbi">
                  ANBI Status
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-card-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Hervormde Gemeente Giessen-Oudekerk en Peursum. Alle rechten voorbehouden.
          </p>
        </div>
      </div>
    </footer>
  );
}
