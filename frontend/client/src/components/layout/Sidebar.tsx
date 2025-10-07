import { Link, useLocation } from 'wouter';
import { 
  BarChart3, 
  TrendingUp, 
  Vault, 
  DollarSign, 
  Percent, 
  LogOut,
  Menu,
  Settings,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

const menuItems = [
  { path: '/dashboard', icon: BarChart3, label: 'Dashboard' },
  { path: '/net-new-money', icon: TrendingUp, label: 'Net New Money' },
  { path: '/custodia', icon: Vault, label: 'Custódia' },
  { path: '/receitas', icon: DollarSign, label: 'Receitas' },
  { path: '/comissoes', icon: Percent, label: 'Comissões' },
];

export default function Sidebar() {
  const [location] = useLocation();
  const { logout, user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`bg-sidebar border-r border-sidebar-border h-screen flex flex-col transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">E</span>
              </div>
              <h2 className="text-lg font-semibold text-sidebar-foreground">
                Asset Manager
              </h2>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            data-testid="button-sidebar-toggle"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location === item.path;
          return (
            <Link key={item.path} href={item.path}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start ${
                  collapsed ? 'px-2' : 'px-3'
                }`}
                data-testid={`link-${item.label.toLowerCase()}`}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {!collapsed && (
                  <span className="ml-2">{item.label}</span>
                )}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Ajustes Section */}
      <div className="p-4 border-t border-sidebar-border">
        {!collapsed && (
          <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
            Ajustes
          </p>
        )}
        <div className="space-y-1">
          <Button
            variant="ghost"
            className={`w-full justify-start text-sidebar-foreground ${
              collapsed ? 'px-2' : 'px-3'
            }`}
          >
            <Settings className="h-4 w-4 flex-shrink-0" />
            {!collapsed && (
              <span className="ml-2">Configurações</span>
            )}
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start text-sidebar-foreground ${
              collapsed ? 'px-2' : 'px-3'
            }`}
          >
            <HelpCircle className="h-4 w-4 flex-shrink-0" />
            {!collapsed && (
              <span className="ml-2">Ajuda</span>
            )}
          </Button>
        </div>
      </div>

      {/* User section */}
      <div className="p-4 border-t border-sidebar-border">
        {!collapsed && (
          <div className="mb-3">
            <p className="text-sm font-medium text-sidebar-foreground">
              {user?.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {user?.email}
            </p>
          </div>
        )}
        <Button
          variant="ghost"
          className={`w-full justify-start text-destructive hover:text-destructive ${
            collapsed ? 'px-2' : 'px-3'
          }`}
          onClick={logout}
          data-testid="button-logout"
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          {!collapsed && (
            <span className="ml-2">Sair</span>
          )}
        </Button>
      </div>
    </aside>
  );
}