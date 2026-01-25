import { useEffect, useState } from "react";
import apiClient from "../api/apiClient.ts";
import { UserAuth } from "../context/AuthContext.tsx";
import { formatDate } from "../util/DateFormatter.ts";

// 새 API 응답 스펙
interface ReviewResponse {
    difficultyLevel: number | null;
    importanceLevel: number | null;
    status: 'TO_DO' | 'IN_PROGRESS' | 'COMPLETED' | 'MASTERED';
    reviewedAt: string;
    id: number;
    problemId: number;
    content: string;
    sourceCode: string;
    reviewed: boolean; 
    isFavorite: boolean;
}

interface UpdateReviewRequest {
    isFavorite?: boolean;
    difficultyLevel?: number | null;
    importanceLevel?: number | null;
    code?: string;
    content?: string;
    status?: 'TO_DO' | 'IN_PROGRESS' | 'COMPLETED' | 'MASTERED';
}

interface UpdatedReviewResponse {
    isFavorite: boolean;
    difficultyLevel: number;
    importanceLevel: number;
    code: string;
    content: string;
    status: 'TO_DO' | 'IN_PROGRESS' | 'COMPLETED' | 'MASTERED';
    reviewedAt: string; 
}

export const useReview = (reviewId: number) => {
    const [reviewData, setReviewData] = useState<ReviewResponse | null>(null);
    const [difficulty, setDifficulty] = useState<number | null>(null);
    const [importance, setImportance] = useState<number | null>(null);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [reviewed, setReviewed] = useState<boolean | null>(null);
    const [reviewedAt, setReviewedAt] = useState<string | null>(null);
    const [content, setContent] = useState<string>("");          // 메모
    const [sourceCode, setSourceCode] = useState<string>("");    // 코드
    const [loading, setLoading] = useState<boolean>(true);
    const { unreviewedCount, setUnreviewedCount } = UserAuth();

    const updateReview = async (data: UpdateReviewRequest) => {
        // Save previous state for rollback
        const prevState = {
            reviewData,
            difficulty,
            importance,
            isFavorite,
            reviewed,
            reviewedAt,
            content,
            sourceCode,
        };

        // Optimistic update: Update UI immediately
        if (data.difficultyLevel !== undefined) setDifficulty(data.difficultyLevel);
        if (data.importanceLevel !== undefined) setImportance(data.importanceLevel);
        if (data.isFavorite !== undefined) setIsFavorite(data.isFavorite);
        if (data.content !== undefined) setContent(data.content);
        if (data.code !== undefined) setSourceCode(data.code);
        if (data.status) {
            const isReviewed = data.status === 'COMPLETED' || data.status === 'MASTERED';
            setReviewed(isReviewed);
        }

        // Optimistically update reviewData
        setReviewData(prev => prev ? {
            ...prev,
            ...(data.difficultyLevel !== undefined && { difficultyLevel: data.difficultyLevel }),
            ...(data.importanceLevel !== undefined && { importanceLevel: data.importanceLevel }),
            ...(data.isFavorite !== undefined && { isFavorite: data.isFavorite }),
            ...(data.content !== undefined && { content: data.content }),
            ...(data.code !== undefined && { sourceCode: data.code }),
            ...(data.status && { status: data.status }),
        } : null);

        try {
            // PUT /api/reviews/{reviewId} - background API call
            const response = await apiClient.put<UpdatedReviewResponse>(`/api/reviews/${reviewId}`, data);
            const responseData = response.data;

            // Sync with server response (in case server modified values)
            if (responseData.reviewedAt) setReviewedAt(formatDate(new Date(responseData.reviewedAt)));
            if (responseData.status) {
                const isReviewed = responseData.status === 'COMPLETED' || responseData.status === 'MASTERED';
                setReviewed(isReviewed);
            }

        } catch (error) {
            console.error('Error updating review:', error);
            // Rollback to previous state on error
            setReviewData(prevState.reviewData);
            setDifficulty(prevState.difficulty);
            setImportance(prevState.importance);
            setIsFavorite(prevState.isFavorite);
            setReviewed(prevState.reviewed);
            setReviewedAt(prevState.reviewedAt);
            setContent(prevState.content);
            setSourceCode(prevState.sourceCode);
        }
    }

    const updateStatus = async (status: 'TO_DO' | 'IN_PROGRESS' | 'COMPLETED' | 'MASTERED') => {
        const previousStatus = reviewData?.status;
        
        // MASTERED는 무시, TO_DO만 미복습으로 카운트
        // IN_PROGRESS, COMPLETED는 복습 진행/완료로 취급 (카운트에서 제외)
        const wasUnreviewed = previousStatus === 'TO_DO';
        const willBeUnreviewed = status === 'TO_DO';
        
        // Optimistic: Update count immediately before API call
        // TO_DO에서 IN_PROGRESS/COMPLETED로 변경 시 -1
        // IN_PROGRESS/COMPLETED에서 TO_DO로 변경 시 +1
        // IN_PROGRESS ↔ COMPLETED 사이 전환은 변화 없음
        if (wasUnreviewed && !willBeUnreviewed) {
            setUnreviewedCount(unreviewedCount - 1);
        } else if (!wasUnreviewed && willBeUnreviewed && previousStatus !== 'MASTERED') {
            setUnreviewedCount(unreviewedCount + 1);
        }
        
        // updateReview now handles optimistic update and rollback internally
        await updateReview({ status });
    };

    const updateMemo = async (newContent: string) => {
        await updateReview({ content: newContent });
    };

    const updateCode = async (newCode: string) => {
        await updateReview({ code: newCode });
    };

    const updateFavorite = async (favorite: boolean) => {
        await updateReview({ isFavorite: favorite });
    };

    const handleSave = async (difficultyValue: number | null, importanceValue: number | null) => {
         await updateReview({
             difficultyLevel: difficultyValue,
             importanceLevel: importanceValue
         });
    };

    // Deprecated or alias to updateStatus('COMPLETED')
    const handleStatusChange = () => {
        updateStatus('COMPLETED');
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            // GET /api/reviews/{reviewId}
            const response = await apiClient.get<ReviewResponse>(`/api/reviews/${reviewId}`);
            const data = response.data;

            setReviewData(data);
            setDifficulty(data.difficultyLevel);
            setImportance(data.importanceLevel);
            setIsFavorite(data.isFavorite);
            const isReviewed = data.status === 'COMPLETED' || data.status === 'MASTERED';
            setReviewed(isReviewed);

            setContent(data.content || "");
            setSourceCode(data.sourceCode || "");

            if (data.reviewedAt) {
                setReviewedAt(formatDate(new Date(data.reviewedAt)));
            }
        } catch (error) {
            console.error('Error fetching review data:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [reviewId]);

    return {
        reviewData,
        difficulty,
        setDifficulty,
        importance,
        setImportance,
        isFavorite,
        updateFavorite,
        updateMemo,
        updateCode,
        updateStatus,
        handleSave,
        reviewed,
        reviewedAt,
        handleStatusChange,
        content,
        sourceCode,
        loading,
    };
}