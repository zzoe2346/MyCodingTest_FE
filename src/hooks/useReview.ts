import { useEffect, useState } from "react";
import apiClient from "../api/apiClient.ts";
import { UserAuth } from "../context/AuthContext.tsx";
import { formatDate } from "../util/DateFormatter.ts";
import { demoSolvedProblems } from "../demo/demoData.ts";

// Development mode check
const isDevelopment = import.meta.env.DEV;

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
        // In development mode, just update local state
        if (isDevelopment) {
            setDifficulty(difficultyValue);
            setImportance(importanceValue);
            console.log('🚀 Dev mode: Saved review levels locally', { difficultyValue, importanceValue });
            return;
        }

        try {
            await apiClient.put(`/api/solved-problems/reviews/${reviewId}/levels`, {
                difficultyLevel: difficultyValue,
                importanceLevel: importanceValue,
            });
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const handleStatusSave = async () => {
        // In development mode, just update local state
        if (isDevelopment) {
            const now = new Date();
            setReviewedAt(formatDate(now));
            setReviewed(true);
            setUnreviewedCount(Math.max(0, unreviewedCount - 1));
            console.log('🚀 Dev mode: Marked as reviewed locally');
            return;
        }

        try {
            const response = await apiClient.put(`/api/solved-problems/reviews/${reviewId}/status`, {
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
        // In development mode, use mock data
        if (isDevelopment) {
            const problem = demoSolvedProblems.find(p => p.reviewId === reviewId);
            if (problem) {
                setDifficulty(problem.difficultyLevel);
                setImportance(problem.importanceLevel);
                setReviewed(problem.isReviewed);
                setReviewedAt(problem.reviewedAt ? formatDate(new Date(problem.reviewedAt)) : null);
            }
            return;
        }

        try {
            const response = await apiClient.get<ReviewResponse>(`/api/solved-problems/reviews/${reviewId}`);
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