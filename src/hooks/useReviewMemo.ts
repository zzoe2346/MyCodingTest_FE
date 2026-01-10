import { useCallback, useState } from 'react';
import apiClient from "../api/apiClient.ts";

function useReviewMemo() {
    const [memo, setMemo] = useState("");
    const [originalMemo, setOriginalMemo] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isAvailable, setIsAvailable] = useState(true); // API 사용 가능 여부

    const fetchMemo = useCallback(async (reviewId: number) => {
        setIsLoading(true);
        try {
            const response = await apiClient.get(`/api/reviews/${reviewId}/memo/read`);
            const memoUrl = response.data.url;
            if (memoUrl === 'noMemo') {
                setMemo("");
                setOriginalMemo("");
            } else {
                const memoResponse = await apiClient.get(memoUrl);
                setMemo(memoResponse.data);
                setOriginalMemo(memoResponse.data);
            }
            setIsAvailable(true);
        } catch (error) {
            console.warn('메모 API 아직 미구현:', error);
            setMemo("");
            setOriginalMemo("");
            setIsAvailable(false); // API 미구현 표시
        } finally {
            setIsLoading(false);
        }
    }, []);

    const saveMemo = useCallback(async (reviewId: number, content: string) => {
        if (!isAvailable) {
            console.warn('메모 API 아직 미구현 - 저장 스킵');
            return;
        }

        setIsLoading(true);
        try {
            const response = await apiClient.get(`/api/reviews/${reviewId}/memo/update`);
            const s3PutUrl = response.data.url;

            await apiClient.put(s3PutUrl, content, {
                headers: {
                    'Content-Type': 'text/plain'
                }
            });
        } catch (error) {
            console.warn('메모 저장 API 아직 미구현:', error);
            setIsAvailable(false);
        } finally {
            setIsLoading(false);
        }
    }, [isAvailable]);

    const resetMemo = () => {
        setMemo(originalMemo);
    };

    return {
        memo,
        isLoading,
        fetchMemo,
        saveMemo,
        resetMemo,
        isAvailable, // API 사용 가능 여부 반환
    };
}

export default useReviewMemo;