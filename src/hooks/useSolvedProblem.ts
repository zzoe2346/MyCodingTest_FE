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
        try {
            await apiClient.put(`/api/reviews/${solvedProblemId}/favorite`);
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
        handleFavorite, //여기좀
        handleRequestSort,
        order: options.order,
        orderBy: options.field,
        dataLoaded
    };
}

export default useSolvedProblem;