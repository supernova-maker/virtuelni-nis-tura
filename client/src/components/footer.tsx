export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Virtuelni Niš</h3>
            <p className="text-slate-400 text-sm">
              Vaš vodič kroz grad Niš sa 360° panoramama i lokalnim biznis direktorijumom.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Linkovi</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Početna</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Panorame</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Biznisi</a></li>
              <li><a href="#" className="hover:text-white transition-colors">O nama</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Kategorije</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Ugostiteljstvo</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kultura</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Usluge</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Zdravstvo</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Kontakt</h4>
            <div className="space-y-2 text-sm text-slate-400">
              <p>Email: info@virtuelni-nis.rs</p>
              <p>Telefon: 018/123-456</p>
              <p>Adresa: Niš, Srbija</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400 text-sm">
          <p>&copy; 2024 Virtuelni Niš. Sva prava zadržana.</p>
        </div>
      </div>
    </footer>
  );
}
