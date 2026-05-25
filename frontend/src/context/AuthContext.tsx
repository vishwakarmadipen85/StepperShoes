'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import config from '@/config';
import { useCartStore } from '@/store/useCartStore';

interface User {
    _id: string;
    name: string;
    email: string;
    role: 'customer' | 'vendor' | 'admin';
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    register: (name: string, email: string, password: string, role?: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Hydrate auth state from localStorage on load
        const storedUser = localStorage.getItem('stepper_user');
        const storedToken = localStorage.getItem('stepper_token');
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const res = await fetch(`${config.API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            
            if (!res.ok) {
                return { success: false, error: data.message || 'Login failed' };
            }

            setUser(data.user);
            setToken(data.accessToken);
            localStorage.setItem('stepper_user', JSON.stringify(data.user));
            localStorage.setItem('stepper_token', data.accessToken);
            
            // Sync cart with backend after successful login
            setTimeout(() => {
                useCartStore.getState().fetchCart();
            }, 100);

            return { success: true };
        } catch (err: any) {
            return { success: false, error: err.message || 'Network error' };
        }
    };

    const register = async (name: string, email: string, password: string, role = 'customer') => {
        try {
            const res = await fetch(`${config.API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, role }),
            });
            const data = await res.json();

            if (!res.ok) {
                return { success: false, error: data.message || 'Registration failed' };
            }

            setUser(data.user);
            setToken(data.accessToken);
            localStorage.setItem('stepper_user', JSON.stringify(data.user));
            localStorage.setItem('stepper_token', data.accessToken);

            // Sync cart with backend after registration
            setTimeout(() => {
                useCartStore.getState().fetchCart();
            }, 100);

            return { success: true };
        } catch (err: any) {
            return { success: false, error: err.message || 'Network error' };
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('stepper_user');
        localStorage.removeItem('stepper_token');
        useCartStore.getState().clearCart();
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, isLoading, login, register, logout }}>
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
