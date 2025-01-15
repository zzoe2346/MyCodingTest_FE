import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import apiClient from "../api/apiClient.ts";
import {User} from "../hooks/types.ts";

interface AuthContextType {
    isLoggedIn: boolean;
    user: User | null;
    error: string;
    loading: boolean;
    signOut: () => Promise<void>;
    unreviewedCount: number
    setUnreviewedCount: (count: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [unreviewedCount, setUnreviewedCount] = useState(0);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const [userResponse, unreviewedResponse] = await Promise.all([
                    apiClient.get<User>('/api/me'),
                    apiClient.get('/api/solved-problems/unreviewed-count'),
                ]);
                setUser(userResponse.data);
                setIsLoggedIn(true);
                setUnreviewedCount(unreviewedResponse.data.count);
            } catch (err) {
                console.error('Failed to fetch user authentication information:', err);
                setUser(null);
                setIsLoggedIn(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);


    const signOut = async () => {
        setLoading(true);
        try {
            await apiClient.post('api/sign-out');
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
            value={{isLoggedIn, user, error, loading, signOut, unreviewedCount, setUnreviewedCount}}>
            {children}
        </AuthContext.Provider>
    );
};
