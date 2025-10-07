import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import AppLayout from "@/components/layout/AppLayout";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import NetNewMoney from "@/pages/NetNewMoney";
import Custodia from "@/pages/Custodia";
import Receitas from "@/pages/Receitas";
import Comissoes from "@/pages/Comissoes";
import NotFound from "@/pages/not-found";
import { Toaster as HotToaster } from 'react-hot-toast';

function Router() {
  return (
    <Switch>
      <Route path="/" component={() => <Dashboard />} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/net-new-money" component={NetNewMoney} />
      <Route path="/custodia" component={Custodia} />
      <Route path="/receitas" component={Receitas} />
      <Route path="/comissoes" component={Comissoes} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <AppLayout>
            <Router />
          </AppLayout>
          <Toaster />
          <HotToaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: 'hsl(var(--card))',
                color: 'hsl(var(--card-foreground))',
                border: '1px solid hsl(var(--border))',
              },
            }}
          />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
