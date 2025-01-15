import {SyntheticEvent, useEffect, useState} from "react";
import apiClient from "../api/apiClient.ts";
import {useAuth} from "../context/AuthContext.tsx";
import {formatDate} from "../util/DateFormatter.ts";


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
    const {unreviewedCount, setUnreviewedCount} = useAuth();

    const handleDifficultyChange = (_event: SyntheticEvent<Element, Event>, newValue: number | null) => {
        setDifficulty(newValue);
        handleSave(newValue, importance);
    };

    const handleImportanceChange = (_event: SyntheticEvent<Element, Event>, newValue: number | null) => {
        setImportance(newValue);
        handleSave(difficulty, newValue);
    };

    const handleStatusChange = () => {
        setReviewed(true);
        handleStatusSave();
    };

    const handleSave = async (difficultyValue: number | null, importanceValue: number | null) => {
        try {
            await apiClient.put(`/api/solved-problems/reviews/${reviewId}/levels`, {
                difficultyLevel: difficultyValue,
                importanceLevel: importanceValue,
            });
            console.log('Data updated successfully:', {difficultyValue, importanceValue});
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const handleStatusSave = async () => {
        try {
            await apiClient.put(`/api/solved-problems/reviews/${reviewId}/status`, {
                reviewed: true,
                reviewedAt: new Date().toString()
            });
            console.log('Data updated successfully:');
        } catch (error) {
            console.error('Error updating data:', error);
        } finally {
            setUnreviewedCount(unreviewedCount - 1);
            setReviewedAt(formatDate(new Date()));
        }
    };


    const fetchData = async () => {
        try {
            const response = await apiClient.get<ReviewResponse>(`/api/solved-problems/reviews/${reviewId}`);
            setDifficulty(response.data.difficultyLevel);
            setImportance(response.data.importanceLevel);
            setReviewed(response.data.reviewed);
            setReviewedAt(formatDate(new Date(response.data.reviewedAt)));
            console.log(response.data.reviewedAt);
        } catch (error) {
            console.error('Error updating data:', error);
        }
    }

    useEffect(() => {
        fetchData();
        console.log('fetchDagte');
    }, [reviewId]);

    return {
        difficulty,
        setDifficulty,
        importance,
        setImportance,
        handleDifficultyChange,
        handleImportanceChange,
        handleSave,
        reviewed,
        reviewedAt,
        handleStatusChange
    };
}