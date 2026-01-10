import { useEffect, useState } from "react";
import apiClient from "../api/apiClient.ts";
import { UserAuth } from "../context/AuthContext.tsx";
import { formatDate } from "../util/DateFormatter.ts";

interface ReviewResponse {
    difficultyLevel: number
    importanceLevel: number
    reviewed: boolean
    reviewedAt: Date
}

export const useReview = (reviewId: number) => {
    const [difficulty, setDifficulty] = useState<number | null>(null);
    const [importance, setImportance] = useState<number | null>(null);
    const [reviewed, setReviewed] = useState<boolean | null>(null);
    const [reviewedAt, setReviewedAt] = useState<string | null>(null);
    const { unreviewedCount, setUnreviewedCount } = UserAuth();

    const handleStatusChange = () => {
        handleStatusSave();
    };

    const handleSave = async (difficultyValue: number | null, importanceValue: number | null) => {
        try {
            await apiClient.put(`/api/reviews/${reviewId}/levels`, {
                difficultyLevel: difficultyValue,
                importanceLevel: importanceValue,
            });
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const handleStatusSave = async () => {
        try {
            const response = await apiClient.put(`/api/reviews/${reviewId}/status`, {
                reviewed: true
            });
            const { reviewedAt } = response.data;
            setReviewedAt(formatDate(new Date(reviewedAt)));
            setReviewed(true);
            setUnreviewedCount(unreviewedCount - 1);
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };


    const fetchData = async () => {
        try {
            const response = await apiClient.get<ReviewResponse>(`/api/reviews/${reviewId}`);
            setDifficulty(response.data.difficultyLevel);
            setImportance(response.data.importanceLevel);
            setReviewed(response.data.reviewed);
            setReviewedAt(formatDate(new Date(response.data.reviewedAt)));
        } catch (error) {
            console.error('Error updating data:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [reviewId]);

    return {
        difficulty,
        setDifficulty,
        importance,
        setImportance,
        handleSave,
        reviewed,
        reviewedAt,
        handleStatusChange
    };
}