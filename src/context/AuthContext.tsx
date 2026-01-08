import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import apiClient from "../api/apiClient.ts";
import { User } from "../hooks/types.ts";

// Development mode check
const isDevelopment = import.meta.env.DEV;

// Mock user for development
const mockUser: User = {
    picture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DevUser',
    name: '개발자',
};

interface AuthContextType {
    isLoggedIn: boolean;
    user: User | null;
    error: string;
    loading: boolean;
    signOut: () => Promise<void>;
    unreviewedCount: number
    setUnreviewedCount: (count: number) => void;
    checkAuth: () => Promise<boolean>;
    isDevMode: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const UserAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    // In development mode, start as logged in with mock data
    const [isLoggedIn, setIsLoggedIn] = useState(isDevelopment);
    const [user, setUser] = useState<User | null>(isDevelopment ? mockUser : null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(!isDevelopment); // Skip loading in dev mode
    const [unreviewedCount, setUnreviewedCount] = useState(isDevelopment ? 3 : 0);

    const checkAuth = async () => {
        // In development mode, always return true with mock user
        if (isDevelopment) {
            setUser(mockUser);
            setIsLoggedIn(true);
            setLoading(false);
            return true;
        }

        setLoading(true);
        try {
            const userResponse = await apiClient.get<User>('/api/me');
            if (userResponse.status === 200) {
                setUser(userResponse.data);
                setIsLoggedIn(true);
                return true;
            } else {
                setUser(null);
                setLoading(false);
                return false;
            }
        } catch {
            setUser(null);
            setIsLoggedIn(false);
            setLoading(false);
            return false;
        }
    };

    const checkUnReviewCount = async () => {
        // In development mode, use mock count
        if (isDevelopment) {
            setUnreviewedCount(3);
            return;
        }

        try {
            const unreviewedResponse = await apiClient.get('/api/solved-problems/unreviewed-count');
            setUnreviewedCount(unreviewedResponse.data.count);
        } catch (err) {
            console.error('Failed to fetch user unreviewcount information:', err);
        }
    }

    useEffect(() => {
        const initializeAuth = async () => {
            // In development mode, skip API calls
            if (isDevelopment) {
                console.log('🚀 Development mode: Using mock authentication');
                setLoading(false);
                return;
            }

            const isLogined = await checkAuth();
            if (isLogined) {
                await checkUnReviewCount();
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    const signOut = async () => {
        // In development mode, just toggle state
        if (isDevelopment) {
            setIsLoggedIn(false);
            setUser(null);
            return;
        }

        setLoading(true);
        try {
            await apiClient.get('/api/sign-out');
            setIsLoggedIn(false);
            setUser(null);
        } catch (err) {
            console.error(err);
            setError('Error occurred during logout');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                user,
                error,
                loading,
                signOut,
                unreviewedCount,
                setUnreviewedCount,
                checkAuth,
                isDevMode: isDevelopment
            }}>
            {children}
        </AuthContext.Provider>
    );
};
