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

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [unreviewedCount, setUnreviewedCount] = useState(0);

    const checkAuth = async () => {
        setLoading(true);
        try {
            const userResponse = await apiClient.get<User>('/api/me');
            if (userResponse.status === 200) {
                setUser(userResponse.data);
                setIsLoggedIn(true);
                console.log("lingsucee");
                return true;
            }else{
                setUser(null);
                setLoading(false);
                return false;
            }

        } catch (err) {
            console.error('Failed to fetch user authentication information:', err);
            setUser(null);
            setIsLoggedIn(false);
            setLoading(false);
            return false;
        }
    };

    const checkUnReviewCount = async () => {
        try {
            const unreviewedResponse = await apiClient.get('/api/solved-problems/unreviewed-count');
            setUnreviewedCount(unreviewedResponse.data.count);
        } catch (err) {
            console.error('Failed to fetch user unreviewcount information:', err);
        }
    }

    //이걸로 바꾸니 ㄱㅊ음
    useEffect(() => {
        const initializeAuth = async () => {
            const isLogined = await checkAuth(); // checkAuth는 Promise<boolean>을 반환
            if (isLogined) {
                await checkUnReviewCount(); // checkUnReviewCount도 비동기 함수
            }
            setLoading(false); // 모든 비동기 작업 완료 후 loading을 false로 설정
        };

        initializeAuth();
    }, []);

    // useEffect(() => {
    //     checkAuth()
    //         .then((isLogined) => {
    //             console.log("islogin" + isLogined);
    //             if (isLogined) {
    //                 checkUnReviewCount();
    //             }
    //         });
    // }, []);


    // useEffect(() => {
    //     const checkAuth = async () => {
    //         try {
    //             console.log('체크 인증')
    //             // 두 API 요청을 병렬로 보냅니다.
    //             const [userResponse, unreviewedResponse] = await Promise.all([
    //                 apiClient.get<User>('/api/me'),
    //                 apiClient.get('/api/solved-problems/unreviewed-count'),
    //             ]);
    //
    //             // 각각의 응답을 상태에 저장합니다.
    //             setUser(userResponse.data);
    //             setIsLoggedIn(true);
    //             setUnreviewedCount(unreviewedResponse.data.count);
    //         } catch (err) {
    //             // 요청 실패 시 오류를 처리합니다.
    //             console.error('Failed to fetch user authentication information:', err);
    //             setUser(null);
    //             setIsLoggedIn(false);
    //         } finally {
    //             // 로딩 상태를 false로 설정합니다.
    //             setLoading(false);
    //         }
    //     };
    //
    //     checkAuth();
    // }, []);

    // useEffect(() => {
    //     const checkAuth = async () => {
    //         try {
    //             const [userResponse, unreviewedResponse] = await Promise.all([
    //                 apiClient.get<User>('/api/me'),
    //                 apiClient.get('/api/solved-problems/unreviewed-count'),
    //             ]);
    //             setUser(userResponse.data);
    //             setIsLoggedIn(true);
    //             setUnreviewedCount(unreviewedResponse.data.count);
    //         } catch (err) {
    //             console.error('Failed to fetch user authentication information:', err);
    //             setUser(null);
    //             setIsLoggedIn(false);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //
    //     checkAuth();
    // }, []);


    const signOut = async () => {
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
            value={{isLoggedIn, user, error, loading, signOut, unreviewedCount, setUnreviewedCount, checkAuth}}>
            {children}
        </AuthContext.Provider>
    );
};
