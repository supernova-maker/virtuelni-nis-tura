import { MapPin } from "lucide-react";

export default function MapSection() {
  const handleOpenMap = () => {
    // TODO: Implement interactive map functionality
    console.log("Opening interactive map...");
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Mapa Niša</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Pronađite sve lokacije na interaktivnoj mapi grada. Kliknite na markere za 360° pogled.
          </p>
        </div>
        
        <div className="bg-slate-100 rounded-xl h-96 relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400')"
            }}
          />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Interaktivna mapa</h3>
              <p className="text-slate-600 text-sm mb-4">
                Ovde će biti implementirana mapa sa markerima za sve biznise
              </p>
              <button 
                onClick={handleOpenMap}
                className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Otvori mapu
              </button>
            </div>
          </div>

          {/* Floating map markers */}
          <div className="absolute top-1/4 left-1/3 w-6 h-6 bg-secondary rounded-full border-2 border-white shadow-lg animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="absolute top-1/2 right-1/4 w-6 h-6 bg-secondary rounded-full border-2 border-white shadow-lg animate-bounce" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-1/3 left-1/2 w-6 h-6 bg-secondary rounded-full border-2 border-white shadow-lg animate-bounce" style={{ animationDelay: '1s' }} />
        </div>
      </div>
    </section>
  );
}
