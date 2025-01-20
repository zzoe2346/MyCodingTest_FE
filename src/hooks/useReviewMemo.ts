import {useCallback, useState} from 'react';
import apiClient from "../api/apiClient.ts";

interface MemoData {
    content: string;
    id?: number;
}

interface UseMemoApiResult {
    memo: MemoData | null;
    isLoading: boolean;
    fetchMemo: (reviewId: number) => Promise<void>;
    saveMemo: (reviewId: number, content: string) => Promise<void>;
    resetMemo: () => void;
}

function useReviewMemo(): UseMemoApiResult {
    const [memo, setMemo] = useState<MemoData | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMemo = useCallback(async (reviewId: number) => {
        setIsLoading(true);
        try {
            const response = await apiClient.get(`/api/solved-problems/reviews/${reviewId}/memo`);
            if (response.status === 404) {
                setMemo(null);
                return;
            }
            setMemo(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const saveMemo = useCallback(async (reviewId: number, content: string) => {
        setIsLoading(true);
        try {
            await apiClient.post(`/api/solved-problems/reviews/${reviewId}/memo`, {
                content: content,
            });
        } catch (error) {
            console.error(error)
            setMemo({content: '저장 중에 에러가 발생하였습니다.'});
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
        fetchMemo,
        saveMemo,
        resetMemo,
    };
}

export default useReviewMemo;