// useMemoApi.ts
import {useCallback, useState} from 'react';
import apiClient from "../api/apiClient.ts";

interface MemoData {
    content: string;
    id?: number;
}

interface UseMemoApiResult {
    memo: MemoData | null;
    isLoading: boolean;
    error: string | null;
    fetchMemo: (reviewId: number) => Promise<void>;
    saveMemo: (reviewId: number, content: string) => Promise<void>;
    resetMemo: () => void;
}

function useMemoApi(): UseMemoApiResult {
    const [memo, setMemo] = useState<MemoData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchMemo = useCallback(async (reviewId: number) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await apiClient.get(`/api/solved-problems/reviews/${reviewId}/memo`);
            if (response.status === 404) {
                setMemo(null);
                return;
            }
            setMemo(response.data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const saveMemo = useCallback(async (reviewId: number, content: string) => {
        setIsLoading(true);
        setError(null);
        try {
            await apiClient.post(`/api/solved-problems/reviews/${reviewId}/memo`, {
                content: content,
            });
            // 응답 데이터가 없으므로 setMemo를 호출하지 않음
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const resetMemo = useCallback(() => {
        setMemo(null);
    }, []);

    return {
        memo,
        isLoading,
        error,
        fetchMemo,
        saveMemo,
        resetMemo,
    };
}

export default useMemoApi;