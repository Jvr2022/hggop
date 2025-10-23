import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import NewsPage from "@/pages/News";
import Events from "@/pages/Events";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NewHere from "@/pages/NewHere";
import Privacy from "@/pages/Privacy";
import ANBI from "@/pages/ANBI";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/diensten" component={Services} />
      <Route path="/nieuws" component={NewsPage} />
      <Route path="/evenementen" component={Events} />
      <Route path="/over-ons" component={About} />
      <Route path="/nieuw" component={NewHere} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/anbi" component={ANBI} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
