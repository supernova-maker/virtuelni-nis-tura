import { MapPin, Clock, Phone, Star } from "lucide-react";
import { useState } from "react";
import type { Business } from "@shared/schema";
import PanoramaViewer from "./panorama-viewer";

interface BusinessCardProps {
  business: Business;
}

export default function BusinessCard({ business }: BusinessCardProps) {
  const [showPanorama, setShowPanorama] = useState(false);

  const handlePanoramaView = () => {
    if (business.panoramaUrl) {
      setShowPanorama(true);
    }
  };

  const panoramaData = business.panoramaUrl ? {
    id: business.id,
    title: business.name,
    description: business.description,
    imageUrl: business.panoramaUrl,
    latitude: business.latitude,
    longitude: business.longitude,
    hotspots: [],
  } : null;

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-slate-200 overflow-hidden">
        <img 
          src={business.imageUrl} 
          alt={business.name} 
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{business.name}</h3>
              <p className="text-slate-600 text-sm">{business.category}</p>
            </div>
            <span className="flex items-center text-sm text-accent font-medium">
              <Star className="h-4 w-4 mr-1 fill-current" />
              {business.rating}
            </span>
          </div>
          
          <p className="text-slate-600 text-sm mb-4 line-clamp-2">
            {business.description}
          </p>
          
          <div className="space-y-2 text-sm text-slate-600">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{business.address}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>{business.hours}</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              <span>{business.phone}</span>
            </div>
          </div>
          
          <div className="mt-4 flex space-x-2">
            <button 
              onClick={handlePanoramaView}
              disabled={!business.panoramaUrl}
              className="flex-1 bg-primary text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              360° pogled
            </button>
            <button className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
              Detaljnije
            </button>
          </div>
        </div>
      </div>

      {showPanorama && panoramaData && (
        <PanoramaViewer
          panorama={panoramaData}
          onClose={() => setShowPanorama(false)}
          onHotspotClick={() => {}}
        />
      )}
    </>
  );
}
