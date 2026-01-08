import React, { useCallback, useEffect, useState } from "react";
import { PageResponse, SolvedProblemWithReview } from "./types.ts";
import apiClient from "../api/apiClient.ts";
import { demoSolvedProblems } from "../demo/demoData.ts";

export type Order = 'asc' | 'desc';

// Development mode check
const isDevelopment = import.meta.env.DEV;

interface FilterOptions {
    isReviewed?: boolean | null;
    isFavorite?: boolean;
    field: string;
    order: Order;
    isTagged?: boolean
    tagId?: number
}

const useSolvedProblem = (filterOptions: FilterOptions) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState<SolvedProblemWithReview[]>([]);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(0);
    const [options, setOptions] = useState<FilterOptions>(filterOptions);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [favorites, setFavorites] = useState<Set<number>>(
        new Set(demoSolvedProblems.filter(p => p.isFavorite).map(p => p.solvedProblemId))
    );

    // Mock data fetching for development mode
    const fetchMockData = (page: number, rowsPerPage: number) => {
        setLoading(true);
        setDataLoaded(false);

        // Simulate network delay
        setTimeout(() => {
            let filtered = [...demoSolvedProblems].map(p => ({
                ...p,
                isFavorite: favorites.has(p.solvedProblemId)
            }));

            // Apply filters
            if (options.isReviewed !== null && options.isReviewed !== undefined) {
                filtered = filtered.filter(p => p.isReviewed === options.isReviewed);
            }
            if (options.isFavorite) {
                filtered = filtered.filter(p => p.isFavorite);
            }

            // Sort
            filtered.sort((a, b) => {
                let aVal: unknown = a[options.field as keyof SolvedProblemWithReview];
                let bVal: unknown = b[options.field as keyof SolvedProblemWithReview];

                // Handle nested fields
                if (options.field.includes('.')) {
                    const [, subField] = options.field.split('.');
                    aVal = a[subField as keyof SolvedProblemWithReview];
                    bVal = b[subField as keyof SolvedProblemWithReview];
                }

                if (aVal === null || aVal === undefined) return 1;
                if (bVal === null || bVal === undefined) return -1;

                if (typeof aVal === 'string' && typeof bVal === 'string') {
                    return options.order === 'asc'
                        ? aVal.localeCompare(bVal)
                        : bVal.localeCompare(aVal);
                }

                if (typeof aVal === 'number' && typeof bVal === 'number') {
                    return options.order === 'asc' ? aVal - bVal : bVal - aVal;
                }

                return 0;
            });

            setCount(filtered.length);
            setRows(filtered.slice(page * rowsPerPage, (page + 1) * rowsPerPage));
            setDataLoaded(true);
            setLoading(false);
        }, 300); // Simulate 300ms network delay
    };

    const fetchData = async (page: number, rowsPerPage: number) => {
        // Use mock data in development mode
        if (isDevelopment) {
            fetchMockData(page, rowsPerPage);
            return;
        }

        setLoading(true);
        setDataLoaded(false);

        try {
            let apiPath = '/api/solved-problems';
            if (options.isTagged) apiPath += `/tags/${options.tagId}`
            if (options.isFavorite) apiPath += '/favorites';
            if (options.isReviewed !== null) apiPath += `/review/${options.isReviewed}`;
            const response = await apiClient.get<PageResponse<SolvedProblemWithReview>>(
                apiPath + `?page=${page}&size=${rowsPerPage}&sort=${options.field},${options.order}`
            );
            setRows(response.data.content);
            setCount(response.data.totalElements);
            setDataLoaded(true);

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
        // Use local state update in development mode
        if (isDevelopment) {
            setFavorites(prev => {
                const newFavorites = new Set(prev);
                if (newFavorites.has(solvedProblemId)) {
                    newFavorites.delete(solvedProblemId);
                } else {
                    newFavorites.add(solvedProblemId);
                }
                return newFavorites;
            });
            setRows(prevRows =>
                prevRows.map(row =>
                    row.solvedProblemId === solvedProblemId ? { ...row, isFavorite: !row.isFavorite } : row
                )
            );
            return;
        }

        try {
            await apiClient.patch(`/api/solved-problems/${solvedProblemId}/favorite`);
            setRows(prevRows =>
                prevRows.map(row =>
                    row.solvedProblemId === solvedProblemId ? { ...row, isFavorite: !row.isFavorite } : row
                )
            );
        } catch (error) {
            console.error('Failed to update favorite:', error);
        }
    }

    const handleRequestSort = useCallback((property: keyof SolvedProblemWithReview | string) => {
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
        orderBy: options.field,
        dataLoaded
    };
}

export default useSolvedProblem;