import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import CategoryFilter from "@/components/category-filter";
import BusinessDirectory from "@/components/business-directory";
import MapSection from "@/components/map-section";
import CallToAction from "@/components/call-to-action";
import Footer from "@/components/footer";
import { useState } from "react";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("Svi biznisi");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-slate-50">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <HeroSection />
      <CategoryFilter 
        selectedCategory={selectedCategory} 
        onCategoryChange={setSelectedCategory} 
      />
      <BusinessDirectory 
        selectedCategory={selectedCategory} 
        searchQuery={searchQuery}
      />
      <MapSection />
      <CallToAction />
      <Footer />
    </div>
  );
}
