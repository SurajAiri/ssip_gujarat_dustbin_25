import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IUser } from "@/types/User";

interface AuthState {
    user: IUser | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (user: IUser, token: string) => void;
    logout: () => void;
    updateUser: (user: Partial<IUser>) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            login: (user: IUser, token: string) => set({ 
                user, 
                token, 
                isAuthenticated: true 
            }),
            logout: () => set({ 
                user: null, 
                token: null, 
                isAuthenticated: false 
            }),
            updateUser: (userData: Partial<IUser>) => set((state) => ({
                user: state.user ? { ...state.user, ...userData } : null
            })),
        }),
        {
            name: 'auth-storage',
        }
    )
);