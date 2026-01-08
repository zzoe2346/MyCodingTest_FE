import React, { useCallback, useState } from "react";
import { SolvedProblemWithReview } from "./types";
import { demoSolvedProblems } from "../demo/demoData";

export type Order = 'asc' | 'desc';

interface FilterOptions {
    isReviewed?: boolean | null;
    isFavorite?: boolean;
    field: string;
    order: Order;
    isTagged?: boolean;
    tagId?: number;
}

const useDemoSolvedProblem = (filterOptions: FilterOptions) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [options, setOptions] = useState<FilterOptions>(filterOptions);
    const [favorites, setFavorites] = useState<Set<number>>(
        new Set(demoSolvedProblems.filter(p => p.isFavorite).map(p => p.solvedProblemId))
    );

    // Filter and sort data
    const getFilteredData = () => {
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
            const field = options.field as keyof SolvedProblemWithReview;
            let aVal = a[field];
            let bVal = b[field];

            // Handle nested fields like 'review.difficultyLevel'
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

        return filtered;
    };

    const filteredData = getFilteredData();
    const rows = filteredData.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    const count = filteredData.length;

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setPage(0);
    };

    const handleFavorite = async (solvedProblemId: number) => {
        setFavorites(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(solvedProblemId)) {
                newFavorites.delete(solvedProblemId);
            } else {
                newFavorites.add(solvedProblemId);
            }
            return newFavorites;
        });
    };

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
        loading: false,
        count,
        handleChangePage,
        handleChangeRowsPerPage,
        handleFavorite,
        handleRequestSort,
        order: options.order,
        orderBy: options.field,
        dataLoaded: true,
    };
};

export default useDemoSolvedProblem;
