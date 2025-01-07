import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Chip,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from '@mui/material';
import api from '../api/api.ts';
import {ApiResponse, SolvedProblemWithReviewStatus} from '../hooks/types.ts';

const PaginationTable: React.FC = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState<SolvedProblemWithReviewStatus[]>([]);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(0);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
        fetchData(newPage, rowsPerPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setPage(0); // 페이지 크기 변경 시 첫 페이지로 이동
        fetchData(0, newRowsPerPage);
    };

    const fetchData = async (page: number, rowsPerPage: number) => {
        setLoading(true);
        try {
            const response = await api.get<ApiResponse>(
                `/api/solved-problems?page=${page}&size=${rowsPerPage}`
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
    }, []);

    return (
        <Box sx={{height: 600, width: '100%'}}>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>문제 번호</TableCell>
                            <TableCell>문제 제목</TableCell>
                            <TableCell>최근 제출 시간</TableCell>
                            <TableCell>최근 결과</TableCell>
                            <TableCell>난이도</TableCell>
                            <TableCell>중요도</TableCell>
                            <TableCell>태그</TableCell>
                            <TableCell>리뷰 여부</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={8} align="center">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : (
                            rows.map((row) => (
                                <TableRow key={row.solvedProblemId}>
                                    <TableCell component="th" scope="row" width='auto'>
                                        {row.problemNumber}
                                    </TableCell>
                                    <TableCell width='auto'>{row.problemTitle}</TableCell>
                                    <TableCell>
                                        {new Date(row.recentSubmitAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>{row.recentResultText}</TableCell>
                                    <TableCell>{row.isReviewed ? row.difficultyLevel :
                                        <Chip label="미복습" variant="outlined"/>}</TableCell>
                                    <TableCell>{row.isReviewed ? row.importanceLevel : <Chip label="미복습"/>}</TableCell>
                                    <TableCell>{row.tags}</TableCell>
                                    <TableCell>{row.isReviewed ? <Button>재복습</Button> :
                                        <Button>복습하기</Button>}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={count}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </Box>
    );
};

export default PaginationTable;