import { useState } from "react";
import { Youtube, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface LivestreamPlayerProps {
  channelId?: string;
  className?: string;
}

export default function LivestreamPlayer({ 
  channelId = "UCAGi5k-LRMaNU1FDKARpx4A",
  className = ""
}: LivestreamPlayerProps) {
  const [showPlayer, setShowPlayer] = useState(false);

  if (!showPlayer) {
    return (
      <Card className={className} data-testid="card-livestream-preview">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
              <Youtube className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">Live Eredienst</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Bekijk de livestream van onze erediensten
              </p>
              <Button 
                onClick={() => setShowPlayer(true)}
                className="gap-2"
                data-testid="button-load-livestream"
              >
                <Play className="w-4 h-4" />
                Livestream Laden
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`relative aspect-video w-full rounded-lg overflow-hidden bg-black ${className}`} data-testid="container-livestream-player">
      <iframe
        src={`https://www.youtube.com/embed/live_stream?channel=${channelId}&autoplay=1`}
        title="HGGOP Livestream"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
        data-testid="iframe-youtube-livestream"
      />
    </div>
  );
}
