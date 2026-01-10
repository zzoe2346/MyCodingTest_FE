import { useEffect, useState } from 'react';
import apiClient from '../api/apiClient.ts';

// BOJ MetaData 인터페이스
export interface BojMetaData {
    submissionId: number;
    baekjoonId: string;
    resultText: string;
    memory: number;
    time: number;
    language: string;
    codeLength: number;
    submittedAt: string;
}

// Judgment API 응답 인터페이스
export interface Judgment {
    id: number;
    createdAt: string;
    updatedAt: string;
    problemId: number;
    userId: number;
    submissionId: number;
    status: 'SUCCESS' | 'FAIL' | 'COMPILE_ERROR';
    platform: 'BOJ' | 'Programmers';
    metaData: BojMetaData;
    sourceCode: string;
}

export const useJudgmentResult = (problemId: number | undefined | null) => {
    const [judgmentResults, setJudgmentResults] = useState<Judgment[]>([]);
    const [currentResultIndex, setCurrentResultIndex] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchJudgmentResults = async () => {
            if (!problemId) return;

            setLoading(true);
            setError(null);
            try {
                // GET /api/judgments?problemId=X
                const response = await apiClient.get<Judgment[]>(
                    `/api/judgments?problemId=${problemId}`
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
    }, [problemId]);

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
        currentJudgment: judgmentResults[currentResultIndex] || null,
        loading,
        error,
        handlePrevious,
        handleNext,
    };
};