import {useEffect, useState} from 'react';
import api from '../api/api';

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

export const useJudgmentResult = (solvedProblemId: string | undefined) => {
    const [judgmentResults, setJudgmentResults] = useState<JudgmentResult[]>([]);
    const [currentResultIndex, setCurrentResultIndex] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchJudgmentResults = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await api.get<JudgmentResult[]>(
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

        if (solvedProblemId) {
            fetchJudgmentResults();
        }
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