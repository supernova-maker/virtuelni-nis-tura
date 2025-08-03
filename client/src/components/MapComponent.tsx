import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import CategoryFilter from './CategoryFilter';
import PanoramaDetails from './panorama-viewer';

interface MapComponentProps {
  panoramas: {
    id: string;
    latitude: number;
    longitude: number;
    category: string;
    name?: string;
    description?: string;
    imageUrl?: string;
  }[];
  onPanoramaClick: (panoramaId: string) => void;
}

function MapComponent({ panoramas, onPanoramaClick }: MapComponentProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPanorama, setSelectedPanorama] = useState<any | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const mapInitialized = useRef(false);

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handlePanoramaClick = (panoramaId: string) => {
    const panorama = panoramas.find(p => p.id === panoramaId);
    setSelectedPanorama(panorama || null);
  };

  const handleClosePanoramaDetails = () => {
    setSelectedPanorama(null);
  };

  // Filtriranje panorama na osnovu izabrane kategorije i pretrage
  const filteredPanoramas = panoramas.filter(panorama => {
    const categoryMatch = selectedCategory ? panorama.category === selectedCategory : true;
    const searchMatch = panorama.name ? panorama.name.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    return categoryMatch && searchMatch;
  });

  useEffect(() => {
    if (!mapInitialized.current) {
      mapRef.current = L.map('map').setView([43.3209, 21.8958], 13); // Niš coordinates

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);

      mapInitialized.current = true;
    }

    // Clear existing markers before adding new ones
    mapRef.current?.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        mapRef.current?.removeLayer(layer);
      }
    });

    filteredPanoramas.forEach(panorama => {
      // Check if latitude and longitude are valid numbers
      if (typeof panorama.latitude === 'number' && typeof panorama.longitude === 'number') {
        L.marker([panorama.latitude, panorama.longitude])
          .addTo(mapRef.current!)
          .on('click', () => {
            handlePanoramaClick(panorama.id);
          });
      } else {
        console.error(`Invalid latitude or longitude for panorama with id: ${panorama.id}`, panorama.latitude, panorama.longitude);
      }
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapInitialized.current = false;
      }
    };
  }, [filteredPanoramas]);

  // Extract unique categories from panoramas
  const categories = [...new Set(panoramas.map(panorama => panorama.category))];

  return (
    <div>
      <input
        type="text"
        placeholder="Pretraži panorame..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <div id="map" className="h-[500px] border border-gray-300 rounded-md mb-4"></div>
      {selectedPanorama && (
        <PanoramaDetails panorama={selectedPanorama} onClose={handleClosePanoramaDetails} />
      )}
    </div>
  );
}

export default MapComponent;