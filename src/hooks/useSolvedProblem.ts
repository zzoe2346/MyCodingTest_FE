import React, {useCallback, useEffect, useState} from "react";
import {PageResponse, SolvedProblemWithReview} from "./types.ts";
import api from "../api/api.ts";

export type Order = 'asc' | 'desc';

interface FilterOptions {
    isReviewed?: boolean;
    isFavorite?: boolean;
    field: string;
    order: Order;
}

const initialSolvedProblems: SolvedProblemWithReview[] = [
    {
        solvedProblemId: 0,
        problemNumber: 0,
        problemTitle: "로딩 중...",
        recentSubmitAt: "...",
        recentResultText: "...",
        isFavorite: false,
        reviewId: 0,
        difficultyLevel: 0,
        importanceLevel: 0,
        tags: null,
        isReviewed: false,
    },
    {
        solvedProblemId: 1,
        problemNumber: 0,
        problemTitle: "로딩 중...",
        recentSubmitAt: "...",
        recentResultText: "...",
        isFavorite: false,
        reviewId: 0,
        difficultyLevel: 0,
        importanceLevel: 0,
        tags: null,
        isReviewed: false,
    },
    {
        solvedProblemId: 2,
        problemNumber: 0,
        problemTitle: "로딩 중...",
        recentSubmitAt: "...",
        recentResultText: "...",
        isFavorite: false,
        reviewId: 0,
        difficultyLevel: 0,
        importanceLevel: 0,
        tags: null,
        isReviewed: false,
    },
    {
        solvedProblemId: 3,
        problemNumber: 0,
        problemTitle: "로딩 중...",
        recentSubmitAt: "...",
        recentResultText: "...",
        isFavorite: false,
        reviewId: 0,
        difficultyLevel: 0,
        importanceLevel: 0,
        tags: null,
        isReviewed: false,
    },
    {
        solvedProblemId: 4,
        problemNumber: 0,
        problemTitle: "로딩 중...",
        recentSubmitAt: "...",
        recentResultText: "...",
        isFavorite: false,
        reviewId: 0,
        difficultyLevel: 0,
        importanceLevel: 0,
        tags: null,
        isReviewed: false,
    }
];

const defaultFilterOptions: FilterOptions = {
    isReviewed: false,
    isFavorite: false,
    order: 'desc',
    field: 'recentSubmitAt'
};

const useSolvedProblem = (filterOptions: FilterOptions = defaultFilterOptions) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState<SolvedProblemWithReview[]>(initialSolvedProblems);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(0);
    const [options, setOptions] = useState<FilterOptions>(filterOptions);

    const fetchData = async (page: number, rowsPerPage: number) => {
        setLoading(true);
        let apiPath = '/api/solved-problems';
        if (options.isFavorite) apiPath += '/favorites';
        if (options.isReviewed) apiPath += '/review';
        try {
            const response = await api.get<PageResponse<SolvedProblemWithReview>>(
                apiPath += `?page=${page}&size=${rowsPerPage}&sort=${options.field},${options.order}`
            );
            setRows(response.data.content);
            setCount(response.data.totalElements);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(page, rowsPerPage);
    }, [options]);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
        fetchData(newPage, rowsPerPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setPage(0);
        fetchData(0, newRowsPerPage);
    };

    const handleFavorite = async (solvedProblemId: number) => {
        try {
            await api.patch(`/api/solved-problems/${solvedProblemId}/favorite`);
            setRows(prevRows =>
                prevRows.map(row =>
                    row.solvedProblemId === solvedProblemId ? {...row, isFavorite: !row.isFavorite} : row
                )
            );
        } catch (error) {
            console.error('Failed to update favorite:', error);
        }
    }

    const handleRequestSort = useCallback((property: keyof SolvedProblemWithReview) => {
        setOptions((prev) => ({
            ...prev,
            order: prev.field === property && prev.order === 'asc' ? 'desc' : 'asc',
            field: property,
        }));
        setPage(0);
    }, []);

    return {
        page,
        rowsPerPage,
        rows,
        loading,
        count,
        handleChangePage,
        handleChangeRowsPerPage,
        handleFavorite,
        handleRequestSort,
        order: options.order,
        orderBy: options.field
    };
}

export default useSolvedProblem;