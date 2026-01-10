import { useCallback, useState } from 'react';
import apiClient from "../api/apiClient.ts";

function useReviewMemo() {
    const [memo, setMemo] = useState("");
    const [originalMemo, setOriginalMemo] = useState("");
    const [isLoading, setIsLoading] = useState(false);

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
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const saveMemo = useCallback(async (reviewId: number, content: string) => {
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
            console.error(error)
        } finally {
            setIsLoading(false);
        }
    }, []);

    const resetMemo = () => {
        setMemo(originalMemo);
    };

    return {
        memo,
        isLoading,
        fetchMemo,
        saveMemo,
        resetMemo,
    };
}

export default useReviewMemo;