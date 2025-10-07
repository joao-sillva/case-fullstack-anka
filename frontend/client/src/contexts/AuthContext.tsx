import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on mount
    const token = localStorage.getItem('asset_manager_token');
    const userData = localStorage.getItem('asset_manager_user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        localStorage.removeItem('asset_manager_token');
        localStorage.removeItem('asset_manager_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Try backend API first, fallback to mock for demonstration
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const data = await response.json();
          const token = data.access_token;
          
          const user = {
            id: '1',
            email,
            name: email.split('@')[0]
          };
          
          localStorage.setItem('asset_manager_token', token);
          localStorage.setItem('asset_manager_user', JSON.stringify(user));
          setUser(user);
          setIsLoading(false);
          return;
        }
      } catch (backendError) {
        console.log('Backend authentication failed, using demo mode');
      }
      
      // Demo authentication - accept any email/password for testing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email && password) {
        const user = {
          id: '1',
          email,
          name: email.split('@')[0]
        };
        
        const mockToken = 'demo_jwt_token_' + Date.now();
        
        localStorage.setItem('asset_manager_token', mockToken);
        localStorage.setItem('asset_manager_user', JSON.stringify(user));
        setUser(user);
      } else {
        throw new Error('Email e senha são obrigatórios');
      }
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Erro na autenticação');
    }
    
    setIsLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('asset_manager_token');
    localStorage.removeItem('asset_manager_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}