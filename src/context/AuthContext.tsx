import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import axios from 'axios';
import api from "../api/api.ts";
import {User} from "../hooks/types.ts";

axios.defaults.withCredentials = true;

interface AuthContextType {
    isLoggedIn: boolean;
    user: User | null;
    error: string;
    loading: boolean;
    signIn: (username: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
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

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await api.get<User>('/api/me');
                setUser(response.data);
                setIsLoggedIn(true);
            } catch (err) {
                console.error("사용자 인증 정보를 가져오는데 실패했습니다:", err);
                setUser(null);
                setIsLoggedIn(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const signIn = async (username: string, password: string) => {
        setLoading(true);
        setError('');
        try {
            await api.post('/sign-in', {username, password});
            const response = await api.get<User>('/api/me');
            setUser(response.data);
            setIsLoggedIn(true);
        } catch (err) {
            handleAuthError(err);
        } finally {
            setLoading(false);
        }
    };

    const signOut = async () => {
        setLoading(true);
        try {
            await api.post('/sign-out');
            setIsLoggedIn(false);
            setUser(null);
        } catch (err) {
            console.error(err);
            setError('로그아웃 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const handleAuthError = (err: unknown) => {
        if (axios.isAxiosError(err) && err.response) {
            setError(err.response.data.message || '로그인에 실패했습니다.');
        } else {
            setError('로그인 중 오류가 발생했습니다.');
        }
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{isLoggedIn, user, error, loading, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    );
};
