import { useState } from "react";
import { Play } from "lucide-react";
import PanoramaViewer from "./panorama-viewer";
import { useQuery } from "@tanstack/react-query";
import type { Panorama } from "@shared/schema";

export default function HeroSection() {
  const [showPanorama, setShowPanorama] = useState(false);
  const [selectedPanorama, setSelectedPanorama] = useState<Panorama | null>(null);

  const { data: panoramas } = useQuery<Panorama[]>({
    queryKey: ["/api/panoramas"],
  });

  const handleStartTour = () => {
    if (panoramas && panoramas.length > 0) {
      setSelectedPanorama(panoramas[0]);
      setShowPanorama(true);
    }
  };

  const handleHotspotClick = (x: number, y: number) => {
    // Handle hotspot interactions
    console.log("Hotspot clicked at:", x, y);
  };

  return (
    <>
      <section className="relative h-96 md:h-[500px] bg-slate-900 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-70" 
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600')"
          }}
        />
        
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Otkrijte Niš</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Virtuelna šetnja kroz najlepše lokacije grada sa 360° panoramama
            </p>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto">
              <h3 className="text-lg font-semibold mb-4">360° Panorama Viewer</h3>
              <div className="bg-slate-800/50 rounded-lg h-32 flex items-center justify-center mb-4">
                <div className="text-center">
                  <Play className="h-8 w-8 mx-auto mb-2 text-white/70" />
                  <p className="text-sm text-white/70">Kliknite za 360° pogled</p>
                </div>
              </div>
              <button 
                onClick={handleStartTour}
                className="w-full bg-primary hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Započni virtuelnu turu
              </button>
            </div>
          </div>
        </div>

        {/* Interactive hotspots */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-secondary rounded-full border-2 border-white shadow-lg pointer-events-auto cursor-pointer animate-pulse" />
          <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-secondary rounded-full border-2 border-white shadow-lg pointer-events-auto cursor-pointer animate-pulse" />
          <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-secondary rounded-full border-2 border-white shadow-lg pointer-events-auto cursor-pointer animate-pulse" />
        </div>
      </section>

      {showPanorama && selectedPanorama && (
        <PanoramaViewer
          panorama={selectedPanorama}
          onClose={() => setShowPanorama(false)}
          onHotspotClick={handleHotspotClick}
        />
      )}
    </>
  );
}
