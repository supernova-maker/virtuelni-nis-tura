import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PanoramaViewerProps {
  panoramaUrl?: string;
  businessName: string;
  onClose: () => void;
}

export default function PanoramaViewer({ panoramaUrl, businessName, onClose }: PanoramaViewerProps) {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!panoramaUrl || !sceneRef.current) return;

    // Clear any existing A-Frame content
    sceneRef.current.innerHTML = '';

    // Create A-Frame scene
    const scene = document.createElement('a-scene');
    scene.setAttribute('embedded', 'true');
    scene.setAttribute('style', 'height: 100%; width: 100%;');
    scene.setAttribute('vr-mode-ui', 'enabled: false');
    scene.setAttribute('device-orientation-permission-ui', 'enabled: false');

    // Create sky element for 360° panorama
    const sky = document.createElement('a-sky');
    sky.setAttribute('src', panoramaUrl);
    sky.setAttribute('rotation', '0 -130 0');

    // Create camera with controls
    const camera = document.createElement('a-camera');
    camera.setAttribute('look-controls', 'enabled: true');
    camera.setAttribute('wasd-controls', 'enabled: false');

    // Add elements to scene
    scene.appendChild(sky);
    scene.appendChild(camera);

    // Add scene to container
    sceneRef.current.appendChild(scene);

    // Cleanup function
    return () => {
      if (sceneRef.current) {
        sceneRef.current.innerHTML = '';
      }
    };
  }, [panoramaUrl]);

  if (!panoramaUrl) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md mx-4">
          <h3 className="text-lg font-semibold mb-4">Panorama nije dostupna</h3>
          <p className="text-muted-foreground mb-6">
            Za {businessName} trenutno nema dostupne 360° panorame.
          </p>
          <Button onClick={onClose} className="w-full">
            Zatvori
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50">
      <div className="relative h-full">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-black bg-opacity-50 p-4">
          <div className="flex justify-between items-center text-white">
            <div>
              <h2 className="text-xl font-semibold">{businessName}</h2>
              <p className="text-sm opacity-75">360° Panorama</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Panorama Container */}
        <div className="panorama-container h-full" ref={sceneRef} />

        {/* Instructions */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <div className="bg-black bg-opacity-50 text-white p-3 rounded-lg text-sm text-center">
            💡 Koristite miš ili dodir da se krećete kroz panoramu
          </div>
        </div>
      </div>
    </div>
  );
}