import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-foreground">404</h1>
        <h2 className="text-2xl font-semibold text-muted-foreground">
          Stranica nije pronađena
        </h2>
        <p className="text-muted-foreground max-w-md">
          Stranica koju tražite ne postoji ili je premeštena.
        </p>
        <Button asChild>
          <Link href="/">Vrati se na početnu</Link>
        </Button>
      </div>
    </div>
  );
}