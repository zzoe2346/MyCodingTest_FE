import React, { useCallback, useEffect, useState } from "react";
import { PageResponse, SolvedProblemWithReview } from "./types.ts";
import apiClient from "../api/apiClient.ts";

export type Order = 'asc' | 'desc';

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

    const fetchData = async (page: number, rowsPerPage: number) => {
        setLoading(true);
        setDataLoaded(false);

        try {
            let apiPath: string;
            const queryParams = new URLSearchParams();

            queryParams.append('page', page.toString());
            queryParams.append('size', rowsPerPage.toString());
            // Keeping sort parameter as it is often supported by default in Spring Pageable even if not in explicit openapi params for business logic
            // queryParams.append('sort', `${options.field},${options.order}`);

            if (options.isReviewed === false) {
                // Review Waiting -> filter=TO_DO
                apiPath = '/api/reviews';
                queryParams.append('filter', 'TO_DO');
            } else if (options.isReviewed === true) {
                // Review Completed -> filter=COMPLETED
                apiPath = '/api/reviews';
                queryParams.append('filter', 'COMPLETED');
            } else {
                // All Solved Problems -> /api/reviews/all
                apiPath = '/api/reviews/all';
            }

            // Note: isFavorite usage is not explicitly supported in the new fetch API spec provided. 
            // We focus on the 3 main pages requested.

            const response = await apiClient.get<PageResponse<SolvedProblemWithReview>>(
                `${apiPath}?${queryParams.toString()}`
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

    const handleFavorite = async (reviewId: number) => {
        try {
            // PUT /api/reviews/{reviewId}/favorite
            await apiClient.put(`/api/reviews/${reviewId}/favorite`);
            setRows(prevRows =>
                prevRows.map(row =>
                    row.reviewId === reviewId ? { ...row, isFavorite: !row.isFavorite } : row
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