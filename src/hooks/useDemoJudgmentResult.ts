import { useState } from 'react';
import { JudgmentResult } from './useJudgmentResult';
import { demoJudgmentResults } from '../demo/demoData';

export const useDemoJudgmentResult = (solvedProblemId: string | undefined | null) => {
    const results = solvedProblemId ? (demoJudgmentResults[solvedProblemId] || []) : [];
    const [currentResultIndex, setCurrentResultIndex] = useState<number>(0);

    const handlePrevious = () => {
        setCurrentResultIndex((prevIndex) => Math.max(0, prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentResultIndex((prevIndex) =>
            Math.min(results.length - 1, prevIndex + 1)
        );
    };

    return {
        judgmentResults: results as JudgmentResult[],
        currentResultIndex,
        loading: false,
        error: null,
        handlePrevious,
        handleNext,
    };
};
