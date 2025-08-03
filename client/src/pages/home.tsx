import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, MapPin, Phone, Globe, Star, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PanoramaViewer from '../components/PanoramaViewer';
import type { Business } from '@shared/schema';
import MapComponent from '../components/MapComponent'; // Import MapComponent

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [showPanorama, setShowPanorama] = useState(false);

  const { data: businesses = [], isLoading } = useQuery<Business[]>({
    queryKey: ['/api/businesses'],
  });

  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.naziv.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.opis.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'all' || business.kategorija === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(businesses.map(b => b.kategorija)));

  const handleBusinessClick = (business: Business) => {
    setSelectedBusiness(business);
     if (business.panoramaUrl) {
       setShowPanorama(true);
     }
  };

  const closePanorama = () => {
    setShowPanorama(false);
    setSelectedBusiness(null);
  };

  const handlePanoramaClickFromMap = (businessId: string) => {
    const business = businesses.find(b => b.id === businessId);
    if (business) {
      handleBusinessClick(business);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Učitavanje...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          🏛️ Virtuelni Niš
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Otkrijte Niš kroz 360° panorame lokalnih biznisa
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Pretražite biznise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Kategorija" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Sve kategorije</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>

      <MapComponent
        panoramas={businesses.map(business => ({
          id: business.id,
          latitude: business.latitude,
          longitude: business.longitude,
        }))}
        onPanoramaClick={handlePanoramaClickFromMap}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBusinesses.map(business => (
          <Card 
            key={business.id} 
            className="business-card cursor-pointer hover:shadow-lg transition-all"
            onClick={() => handleBusinessClick(business)}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{business.naziv}</CardTitle>
                <Badge variant="secondary">{business.kategorija}</Badge>
              </div>
              <CardDescription>{business.opis}</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{business.adresa}</span>
                </div>
                
                {business.telefon && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{business.telefon}</span>
                  </div>
                )}
                
                {business.website && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Globe className="h-4 w-4" />
                    <span>{business.website}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < business.ocena 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({business.ocena}/5)
                  </span>
                </div>
                
                {business.panoramaUrl && (
                  <Button variant="outline" size="sm" className="w-full">
                    🔍 Pogledaj 360° panoramu
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBusinesses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Nema rezultata za vašu pretragu.
          </p>
        </div>
      )}

      {showPanorama && selectedBusiness && (
        <PanoramaViewer
          panoramaUrl={selectedBusiness.panoramaUrl || undefined}
          businessName={selectedBusiness.naziv}
          onClose={closePanorama}
        />
      )}
    </div>
  );
}