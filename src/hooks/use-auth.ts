import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fine } from '@/lib/fine';

type User = {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'client';
};

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean{% code path="src/hooks/use-auth.ts" type="create" %}
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fine } from '@/lib/fine';

type User = {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'client';
};

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          // Mock login - would be replaced with Firebase Auth
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // For demo purposes, make admin@example.com an admin user
          const isAdmin = email === "admin@example.com";
          
          const user = {
            id: "user-" + Math.random().toString(36).substr(2, 9),
            email,
            name: email.split("@")[0],
            role: isAdmin ? "admin" as const : "client" as const,
          };
          
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ error: "Invalid email or password", isLoading: false });
        }
      },
      register: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          // Mock registration - would be replaced with Firebase Auth
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const user = {
            id: "user-" + Math.random().toString(36).substr(2, 9),
            email,
            name: email.split("@")[0],
            role: "client" as const,
          };
          
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ error: "Registration failed", isLoading: false });
        }
      },
      logout: async () => {
        set({ isLoading: true });
        try {
          // Mock logout - would be replaced with Firebase Auth
          await new Promise(resolve => setTimeout(resolve, 500));
          set({ user: null, isAuthenticated: false, isLoading: false });
        } catch (error) {
          set({ error: "Logout failed", isLoading: false });
        }
      }
    }),
    {
      name: 'auth-store',
    }
  )
);