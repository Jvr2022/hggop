import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import churchLogo from "@assets/image_1761243233618.png";

export default function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  const isGroupActive = (paths: string[]) => {
    return paths.some(path => location.startsWith(path));
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
          <div className="hidden md:flex items-center gap-1">
            <Link href="/">
              <Button
                variant="ghost"
                size="lg"
                className={`transition-all ${
                  isActive("/") && location === "/"
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground"
                }`}
              >
                Home
              </Button>
            </Link>

            <Link href="/diensten">
              <Button
                variant="ghost"
                size="lg"
                className={`transition-all ${
                  isActive("/diensten")
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground"
                }`}
              >
                Diensten
              </Button>
            </Link>

            {/* Over Ons Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="lg"
                  className={`transition-all ${
                    isGroupActive(["/over-ons", "/nieuw", "/contact"])
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground"
                  }`}
                >
                  Over Ons <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/over-ons" className="w-full cursor-pointer">Wie zijn wij</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/nieuw" className="w-full cursor-pointer">Ik ben nieuw</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/contact" className="w-full cursor-pointer">Contact</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Activiteiten Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="lg"
                  className={`transition-all ${
                    isGroupActive(["/evenementen", "/nieuws"])
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground"
                  }`}
                >
                  Activiteiten <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/evenementen" className="w-full cursor-pointer">Evenementen</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/nieuws" className="w-full cursor-pointer">Nieuws</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Info Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="lg"
                  className={`transition-all ${
                    isGroupActive(["/anbi", "/privacy"])
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground"
                  }`}
                >
                  Info <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/anbi" className="w-full cursor-pointer">ANBI</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/privacy" className="w-full cursor-pointer">Privacy</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Shop Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-foreground"
                >
                  Shop <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <a href="https://site.skgcollect.nl/252/pagina/2094/collectebonnen.html" target="_blank" rel="noopener noreferrer" className="w-full cursor-pointer">
                    Collectebonnen
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="https://site.skgcollect.nl/252/pagina/2089/home.html" target="_blank" rel="noopener noreferrer" className="w-full cursor-pointer">
                    Webshop
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-1">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  location === "/" ? "bg-accent text-accent-foreground" : "text-foreground"
                }`}
              >
                Home
              </Button>
            </Link>
            <Link href="/diensten" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  isActive("/diensten") ? "bg-accent text-accent-foreground" : "text-foreground"
                }`}
              >
                Diensten
              </Button>
            </Link>
            
            <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">Over Ons</div>
            <Link href="/over-ons" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start pl-6 text-foreground">
                Wie zijn wij
              </Button>
            </Link>
            <Link href="/nieuw" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start pl-6 text-foreground">
                Ik ben nieuw
              </Button>
            </Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start pl-6 text-foreground">
                Contact
              </Button>
            </Link>

            <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">Activiteiten</div>
            <Link href="/evenementen" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start pl-6 text-foreground">
                Evenementen
              </Button>
            </Link>
            <Link href="/nieuws" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start pl-6 text-foreground">
                Nieuws
              </Button>
            </Link>

            <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">Info</div>
            <Link href="/anbi" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start pl-6 text-foreground">
                ANBI
              </Button>
            </Link>
            <Link href="/privacy" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start pl-6 text-foreground">
                Privacy
              </Button>
            </Link>

            <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">Shop</div>
            <a href="https://site.skgcollect.nl/252/pagina/2094/collectebonnen.html" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start pl-6 text-foreground">
                Collectebonnen
              </Button>
            </a>
            <a href="https://site.skgcollect.nl/252/pagina/2089/home.html" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start pl-6 text-foreground">
                Webshop
              </Button>
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
