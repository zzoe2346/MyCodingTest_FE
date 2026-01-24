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
            
            // Update local state based on response or request
            
            if (data.difficultyLevel !== undefined) setDifficulty(data.difficultyLevel);
            if (data.importanceLevel !== undefined) setImportance(data.importanceLevel);
            
            if (data.status === 'COMPLETED' || data.status === 'MASTERED') {
                 setReviewed(true);
                 setReviewedAt(formatDate(new Date())); 
            }
            
            const responseData = response.data;
            if (responseData.status === 'COMPLETED' || responseData.status === 'MASTERED') {
                 setReviewed(true);
            }
            if (responseData.difficultyLevel) setDifficulty(responseData.difficultyLevel);
            if (responseData.importanceLevel) setImportance(responseData.importanceLevel);

        } catch (error) {
            console.error('Error updating review:', error);
        }
    }

    const handleStatusChange = () => {
        updateReview({ status: 'COMPLETED' }).then(() => {
             setUnreviewedCount(unreviewedCount - 1);
        });
    };

    const handleSave = async (difficultyValue: number | null, importanceValue: number | null) => {
         await updateReview({
             difficultyLevel: difficultyValue,
             importanceLevel: importanceValue
         });
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
        handleSave,
        reviewed,
        reviewedAt,
        handleStatusChange,
        content,
        sourceCode,
        loading,
    };
}