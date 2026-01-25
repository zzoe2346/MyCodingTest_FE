import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import apiClient from "../api/apiClient.ts";
import { User } from "../hooks/types.ts";

interface AuthContextType {
    isLoggedIn: boolean;
    user: User | null;
    error: string;
    loading: boolean;
    signOut: () => Promise<void>;
    unreviewedCount: number
    setUnreviewedCount: (count: number) => void;
    checkAuth: () => Promise<boolean>;
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
    // localStorage에서 초기 상태 복원 (깜빡임 방지)
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem('isLoggedIn') === 'true';
    });
    const [user, setUser] = useState<User | null>(() => {
        const cached = localStorage.getItem('user');
        return cached ? JSON.parse(cached) : null;
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [unreviewedCount, setUnreviewedCount] = useState(0);

    const checkAuth = async () => {
        setLoading(true);
        try {
            const userResponse = await apiClient.get<User>('/api/me', { timeout: 1000 });
            if (userResponse.status === 200) {
                console.log(userResponse.data);
                setUser(userResponse.data);
                // localStorage에 캐시 저장
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('user', JSON.stringify(userResponse.data));
                const unreviewedResponse = await apiClient.get('/api/reviews/unreviewed/count');
                setUnreviewedCount(unreviewedResponse.data.count);
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
            // localStorage 초기화
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('user');
            setLoading(false);
            return false;
        }
    };

    const checkUnReviewCount = async () => {
        try {
            const unreviewedResponse = await apiClient.get('/api/reviews/unreviewed/count');
            setUnreviewedCount(unreviewedResponse.data.count);
        } catch (err) {
            console.error('Failed to fetch user unreviewcount information:', err);
        }
    }

    useEffect(() => {
        const initializeAuth = async () => {
            const isLogined = await checkAuth();
            if (isLogined) {
                await checkUnReviewCount();
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    const signOut = useCallback(async () => {
        setLoading(true);
        try {
            await apiClient.get('/api/sign-out');
            setIsLoggedIn(false);
            setUser(null);
            // localStorage 초기화
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('user');
        } catch (err) {
            console.error(err);
            setError('Error occurred during logout');
        } finally {
            setLoading(false);
        }
    }, []);

    const contextValue = useMemo(() => ({
        isLoggedIn,
        user,
        error,
        loading,
        signOut,
        unreviewedCount,
        setUnreviewedCount,
        checkAuth,
    }), [isLoggedIn, user, error, loading, signOut, unreviewedCount]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
