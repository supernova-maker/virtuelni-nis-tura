import { QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch } from 'wouter';
import Home from './pages/home';
import NotFound from './pages/not-found';
import { queryClient } from './lib/queryClient';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        <Switch>
          <Route path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </QueryClientProvider>
  );
}

export default App;