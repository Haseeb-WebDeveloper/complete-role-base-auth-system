"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            console.log("Checking authentication...");
            const response = await fetch('/api/auth/me', {
                credentials: 'include'
            });
            console.log("Auth check response:", response.status);
            
            if (response.ok) {
                const data = await response.json();
                console.log("Auth data:", data);
                setUser(data.user);
            } else {
                console.log("Not authenticated");
                setUser(null);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            console.log("Logging out...");
            const response = await fetch('/api/auth/logout', { 
                method: 'POST',
                credentials: 'include'  // Added to ensure cookies are sent
            });
            console.log("Logout response:", response.status);
            
            setUser(null);
            window.location.href = '/login';
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 