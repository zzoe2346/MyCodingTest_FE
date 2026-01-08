import { useEffect, useState } from 'react';
import apiClient from '../api/apiClient.ts';
import { demoJudgmentResults } from '../demo/demoData.ts';

// Development mode check
const isDevelopment = import.meta.env.DEV;

export interface JudgmentResult {
    submissionId: number;
    baekjoonId: string;
    problemId: number;
    resultText: string;
    memory: number;
    time: number;
    language: string;
    codeLength: number;
    submittedAt: string;
    problemTitle: string;
    judgmentResultId: number;
}

export const useJudgmentResult = (solvedProblemId: string | undefined | null) => {
    const [judgmentResults, setJudgmentResults] = useState<JudgmentResult[]>([]);
    const [currentResultIndex, setCurrentResultIndex] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchJudgmentResults = async () => {
            if (!solvedProblemId) return;

            // Use mock data in development mode
            if (isDevelopment) {
                setLoading(true);
                setTimeout(() => {
                    const mockResults = demoJudgmentResults[solvedProblemId] || [];
                    setJudgmentResults(mockResults);
                    setCurrentResultIndex(0);
                    setLoading(false);
                }, 200);
                return;
            }

            setLoading(true);
            setError(null);
            try {
                const response = await apiClient.get<JudgmentResult[]>(
                    `/api/solved-problems/${solvedProblemId}/judgment-results`
                );
                setJudgmentResults(response.data);
                setCurrentResultIndex(0);
            } catch (error) {
                console.error('Error fetching judgment results:', error);
                setError('Failed to load judgment results.');
            } finally {
                setLoading(false);
            }
        };

        fetchJudgmentResults();
    }, [solvedProblemId]);

    const handlePrevious = () => {
        setCurrentResultIndex((prevIndex) => Math.max(0, prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentResultIndex((prevIndex) =>
            Math.min(judgmentResults.length - 1, prevIndex + 1)
        );
    };

    return {
        judgmentResults,
        currentResultIndex,
        loading,
        error,
        handlePrevious,
        handleNext,
    };
};