import { useEffect, useState } from "react";
import apiClient from "../api/apiClient.ts";
import { UserAuth } from "../context/AuthContext.tsx";
import { formatDate } from "../util/DateFormatter.ts";

// 새 API 응답 스펙
interface ReviewResponse {
    id: number;
    createdAt: string;
    updatedAt: string;
    problemId: number;
    userId: number;
    content: string;          // 메모 내용
    reviewed: boolean;
    difficultyLevel: number;
    importanceLevel: number;
    sourceCode: string;       // 소스 코드
    reviewedAt: string;
    status: 'TO_DO' | 'IN_PROGRESS' | 'DONE';
    favorited: boolean;
    recentSubmitAt: string;
    recentResult: string;
}

interface ReviewRecentStatusResponse {
    reviewed: boolean;
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

    const handleStatusChange = () => {
        handleStatusSave();
    };

    const handleSave = async (difficultyValue: number | null, importanceValue: number | null) => {
        try {
            // PUT /api/reviews/{reviewId}/levels
            await apiClient.put(`/api/reviews/${reviewId}/levels`, {
                difficultyLevel: difficultyValue,
                importanceLevel: importanceValue,
            });
            setDifficulty(difficultyValue);
            setImportance(importanceValue);
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const handleStatusSave = async () => {
        try {
            // PUT /api/reviews/{reviewId}/status
            const response = await apiClient.put<ReviewRecentStatusResponse>(
                `/api/reviews/${reviewId}/status`
            );
            const { reviewedAt } = response.data;
            setReviewedAt(formatDate(new Date(reviewedAt)));
            setReviewed(true);
            setUnreviewedCount(unreviewedCount - 1);
        } catch (error) {
            console.error('Error updating data:', error);
        }
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
            setReviewed(data.reviewed);
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