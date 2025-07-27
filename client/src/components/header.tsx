import { Search, Menu } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({ searchQuery, onSearchChange }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-slate-900">Virtuelni Niš</h1>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-slate-700 hover:text-primary transition-colors font-medium">Početna</a>
            <a href="#" className="text-slate-700 hover:text-primary transition-colors font-medium">Panorame</a>
            <a href="#" className="text-slate-700 hover:text-primary transition-colors font-medium">Biznisi</a>
            <a href="#" className="text-slate-700 hover:text-primary transition-colors font-medium">Mapa</a>
            <a href="#" className="text-slate-700 hover:text-primary transition-colors font-medium">Kontakt</a>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Pretražite biznise..." 
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent w-64"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
            </div>
            
            <button 
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-4">
            <nav className="flex flex-col space-y-2">
              <a href="#" className="text-slate-700 hover:text-primary transition-colors font-medium py-2">Početna</a>
              <a href="#" className="text-slate-700 hover:text-primary transition-colors font-medium py-2">Panorame</a>
              <a href="#" className="text-slate-700 hover:text-primary transition-colors font-medium py-2">Biznisi</a>
              <a href="#" className="text-slate-700 hover:text-primary transition-colors font-medium py-2">Mapa</a>
              <a href="#" className="text-slate-700 hover:text-primary transition-colors font-medium py-2">Kontakt</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
