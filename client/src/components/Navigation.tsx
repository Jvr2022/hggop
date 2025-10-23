import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import churchLogo from "@assets/image_1761243233618.png";

export default function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Diensten", href: "/diensten" },
    { name: "Evenementen", href: "/evenementen" },
    { name: "Nieuws", href: "/nieuws" },
    { name: "Over Ons", href: "/over-ons" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <nav className="bg-background/80 border-b border-border sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover-elevate active-elevate-2 rounded-md px-3 py-2 -ml-3 transition-all" data-testid="link-home">
            <img src={churchLogo} alt="HGGOP Logo" className="w-12 h-12" />
            <span className="font-bold text-xl text-foreground">HGGOP</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <Button
                  variant="ghost"
                  size="lg"
                  className={`transition-all ${
                    isActive(item.href)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground"
                  }`}
                  data-testid={`link-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-1">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${
                    isActive(item.href)
                      ? "bg-accent text-accent-foreground"
                      : "text-foreground"
                  }`}
                  data-testid={`link-mobile-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
