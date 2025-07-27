import { useQuery } from "@tanstack/react-query";
import BusinessCard from "./business-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Business } from "@shared/schema";

interface BusinessDirectoryProps {
  selectedCategory: string;
  searchQuery: string;
}

export default function BusinessDirectory({ selectedCategory, searchQuery }: BusinessDirectoryProps) {
  const { data: businesses, isLoading } = useQuery<Business[]>({
    queryKey: ["/api/businesses", { category: selectedCategory, search: searchQuery }],
  });

  if (isLoading) {
    return (
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Lokalni biznisi</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <Skeleton className="w-full h-48" />
                <div className="p-6 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!businesses || businesses.length === 0) {
    return (
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Nema rezultata</h3>
            <p className="text-slate-600">
              {searchQuery 
                ? `Nema biznisa koji odgovaraju pretrazi "${searchQuery}"`
                : `Nema biznisa u kategoriji "${selectedCategory}"`
              }
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Lokalni biznisi</h2>
          <div className="flex items-center space-x-4">
            <select className="border border-slate-300 rounded-lg px-3 py-2 text-slate-700">
              <option>Sortiraj po relevantnosti</option>
              <option>Sortiraj po oceni</option>
              <option>Sortiraj po udaljenosti</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>

        {businesses.length >= 6 && (
          <div className="text-center mt-8">
            <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-3 px-6 rounded-lg transition-colors">
              Učitaj još biznisa
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
