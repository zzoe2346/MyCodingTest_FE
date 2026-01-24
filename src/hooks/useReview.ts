import { useEffect, useState } from "react";
import apiClient from "../api/apiClient.ts";
import { UserAuth } from "../context/AuthContext.tsx";
import { formatDate } from "../util/DateFormatter.ts";

// 새 API 응답 스펙
interface ReviewResponse {
    difficultyLevel: number;
    importanceLevel: number;
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
        try {
            // PUT /api/reviews/{reviewId}
            const response = await apiClient.put<UpdatedReviewResponse>(`/api/reviews/${reviewId}`, data);
            
            const responseData = response.data;

            // Update local state selectively
            if (data.difficultyLevel !== undefined) setDifficulty(data.difficultyLevel);
            if (data.importanceLevel !== undefined) setImportance(data.importanceLevel);
            if (data.isFavorite !== undefined) setIsFavorite(data.isFavorite);
            if (data.content !== undefined) setContent(data.content);
            if (data.code !== undefined) setSourceCode(data.code);

            // Special logic for status
            if (data.status) {
                 const isReviewed = data.status === 'COMPLETED' || data.status === 'MASTERED';
                 setReviewed(isReviewed);
            }
            
            // Sync with response if available
            if (responseData.status) {
                const isReviewed = responseData.status === 'COMPLETED' || responseData.status === 'MASTERED';
                setReviewed(isReviewed);
            }
            if (responseData.difficultyLevel) setDifficulty(responseData.difficultyLevel);
            if (responseData.importanceLevel) setImportance(responseData.importanceLevel);
            if (responseData.isFavorite !== undefined) setIsFavorite(responseData.isFavorite);
            if (responseData.reviewedAt) setReviewedAt(formatDate(new Date(responseData.reviewedAt)));

            // Update reviewData to reflect changes in UI
            setReviewData(prev => prev ? {
                ...prev,
                ...data,
                status: responseData.status || data.status || prev.status,
                difficultyLevel: responseData.difficultyLevel || data.difficultyLevel || prev.difficultyLevel,
                importanceLevel: responseData.importanceLevel || data.importanceLevel || prev.importanceLevel,
                isFavorite: responseData.isFavorite !== undefined ? responseData.isFavorite : (data.isFavorite !== undefined ? data.isFavorite : prev.isFavorite),
                content: data.content !== undefined ? data.content : prev.content,
                sourceCode: data.code !== undefined ? data.code : prev.sourceCode,
                reviewedAt: responseData.reviewedAt || prev.reviewedAt,
            } : null);

        } catch (error) {
            console.error('Error updating review:', error);
        }
    }

    const updateStatus = async (status: 'TO_DO' | 'IN_PROGRESS' | 'COMPLETED' | 'MASTERED') => {
        const previousStatus = reviewData?.status;
        const wasReviewed = previousStatus === 'COMPLETED' || previousStatus === 'MASTERED';
        const willBeReviewed = status === 'COMPLETED' || status === 'MASTERED';
        
        await updateReview({ status });
        
        // Only change count when transitioning between reviewed/unreviewed states
        if (!wasReviewed && willBeReviewed) {
            // TO_DO/IN_PROGRESS -> COMPLETED/MASTERED: 미복습 -> 복습완료
            setUnreviewedCount(unreviewedCount - 1);
        } else if (wasReviewed && !willBeReviewed) {
            // COMPLETED/MASTERED -> TO_DO/IN_PROGRESS: 복습완료 -> 미복습
            setUnreviewedCount(unreviewedCount + 1);
        }
        // Same category transitions (e.g., TO_DO -> IN_PROGRESS or COMPLETED -> MASTERED) don't change count
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