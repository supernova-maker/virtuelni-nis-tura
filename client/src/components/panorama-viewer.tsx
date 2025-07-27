import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface PanoramaViewerProps {
  panorama: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    latitude: number;
    longitude: number;
    hotspots: string[];
  };
  onClose: () => void;
  onHotspotClick: (x: number, y: number) => void;
}

export default function PanoramaViewer({ panorama, onClose, onHotspotClick }: PanoramaViewerProps) {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize A-Frame scene for 360° panorama viewing
    if (viewerRef.current) {
      const scene = document.createElement('a-scene');
      scene.setAttribute('embedded', 'true');
      scene.setAttribute('style', 'height: 100%; width: 100%;');
      
      // Create sky element for panorama
      const sky = document.createElement('a-sky');
      sky.setAttribute('src', panorama.imageUrl);
      sky.setAttribute('rotation', '0 -130 0');
      
      // Add camera with controls
      const camera = document.createElement('a-camera');
      camera.setAttribute('look-controls', 'true');
      camera.setAttribute('wasd-controls', 'false');
      
      scene.appendChild(sky);
      scene.appendChild(camera);
      
      // Add hotspots if any
      panorama.hotspots.forEach((hotspot, index) => {
        const hotspotElement = document.createElement('a-sphere');
        hotspotElement.setAttribute('radius', '0.5');
        hotspotElement.setAttribute('color', '#DC2626');
        hotspotElement.setAttribute('position', `${index * 2 - 2} 0 -5`);
        hotspotElement.setAttribute('animation', 'property: rotation; to: 0 360 0; loop: true; dur: 10000');
        
        hotspotElement.addEventListener('click', () => {
          onHotspotClick(index * 2 - 2, 0);
        });
        
        scene.appendChild(hotspotElement);
      });
      
      viewerRef.current.appendChild(scene);
    }

    return () => {
      if (viewerRef.current) {
        viewerRef.current.innerHTML = '';
      }
    };
  }, [panorama, onHotspotClick]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-4">
        <div className="flex justify-between items-center text-white">
          <div>
            <h2 className="text-xl font-semibold">{panorama.title}</h2>
            <p className="text-sm opacity-80">{panorama.description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-black/30 hover:bg-black/50 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* A-Frame Scene Container */}
      <div ref={viewerRef} className="w-full h-full" />

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 right-4 z-10">
        <div className="bg-black/50 text-white rounded-lg p-4 text-center">
          <p className="text-sm">
            Koristite miš ili dodir za navigaciju. Kliknite na crvene markere za više informacija.
          </p>
        </div>
      </div>
    </div>
  );
}
