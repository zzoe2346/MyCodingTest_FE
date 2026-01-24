import {
    Box,
    Chip,
    IconButton,
    Link,
    Paper,
    Rating,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    alpha
} from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import useSolvedProblem, { Order } from "../hooks/useSolvedProblem.ts";
import { SolvedProblemWithReview } from "../hooks/types.ts";
import React from "react";

interface SolvedProblemTableProps {
    isReviewed?: boolean | null;
    isFavorite?: boolean;
    initSortField: string;
    isTagged?: boolean;
    tagId?: number | undefined;
}

interface HeadCell {
    id: keyof SolvedProblemWithReview | string;
    label: string;
    disableSorting?: boolean;
}

const headCells: HeadCell[] = [
    { id: 'problemNumber', label: '문제 번호' },
    { id: 'problemTitle', label: '문제 제목' },
    { id: 'recentSubmitAt', label: '최근 제출 시간' },
    { id: 'recentResultText', label: '최근 결과' },
    { id: 'difficultyLevel', label: '체감 난이도' },
    { id: 'importanceLevel', label: '재복습 필요도' },
    { id: 'status', label: '상태' },
    { id: 'isFavorite', label: '북마크', disableSorting: true },
];

// Status styling configuration
const statusConfig = {
    TO_DO: {
        label: '복습 대기',
        backgroundColor: alpha('#78909c', 0.15),
        color: '#455a64',
        borderColor: '#78909c',
    },
    IN_PROGRESS: {
        label: '복습 중',
        backgroundColor: alpha('#2196f3', 0.15),
        color: '#1565c0',
        borderColor: '#2196f3',
    },
    COMPLETED: {
        label: '복습 완료',
        backgroundColor: alpha('#4caf50', 0.15),
        color: '#2e7d32',
        borderColor: '#4caf50',
    },
    MASTERED: {
        label: '완벽히 이해',
        backgroundColor: alpha('#9c27b0', 0.15),
        color: '#6a1b9a',
        borderColor: '#9c27b0',
    },
};

interface TableHeaderProps {
    handleRequestSort: (property: keyof SolvedProblemWithReview | string) => void;
    order: Order;
    orderBy: string;
}

const TableHeader: React.FC<TableHeaderProps> = ({ handleRequestSort, order, orderBy }) => {
    // const createSortHandler = (property: keyof SolvedProblemWithReview | string) => () => {
    //     handleRequestSort(property);
    // };
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        sx={{ whiteSpace: 'nowrap' }}
                        key={headCell.id}
                        sortDirection={orderBy === headCell.id ? order : undefined}
                    >
                        {/* Sorting disabled temporarily
                        {headCell.disableSorting ? (
                            headCell.label
                        ) : (
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                                hideSortIcon={true}
                            >
                                {headCell.label}
                            </TableSortLabel>
                        )} 
                        */}
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

interface TableBodyProps {
    rows: SolvedProblemWithReview[]
    handleFavorite: (reviewId: number) => void;
}

const TableBodyComponent: React.FC<TableBodyProps> = ({ rows, handleFavorite }) => {
    return (
        <TableBody sx={{ whiteSpace: 'nowrap' }}>
            {rows.map((row) => {
                const status = row.status || 'TO_DO';
                const statusStyle = statusConfig[status];
                
                return (
                    <TableRow key={row.solvedProblemId}>
                        <TableCell component="th" scope="row" width='auto'>
                            {row.problemNumber}
                        </TableCell>
                        <TableCell width='auto'>
                            <Link
                                underline='none'
                                href={`/review/${row.reviewId}?problemTitle=${row.problemTitle}&sp=${row.solvedProblemId}`}
                            >
                                {row.problemTitle}
                            </Link>
                        </TableCell>
                        <TableCell>
                            {new Date(row.recentSubmitAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2" fontWeight={'bold'} color={row.recentResultText === 'SUCCESS' ? 'success' : 'error'}>
                                {row.recentResultText}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Rating name="half-rating-read" value={row.difficultyLevel} size="small" readOnly />
                        </TableCell>
                        <TableCell>
                            <Rating name="half-rating-read" value={row.importanceLevel} size="small" readOnly />
                        </TableCell>
                        <TableCell>
                            <Link
                                href={`/review/${row.reviewId}?problemTitle=${row.problemTitle}&sp=${row.solvedProblemId}`}
                                underline="none"
                            >
                                <Chip
                                    label={statusStyle.label}
                                    size="small"
                                    sx={{
                                        backgroundColor: statusStyle.backgroundColor,
                                        color: statusStyle.color,
                                        border: `1px solid ${statusStyle.borderColor}`,
                                        fontWeight: 600,
                                        fontSize: '0.75rem',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            backgroundColor: alpha(statusStyle.borderColor, 0.25),
                                        },
                                    }}
                                />
                            </Link>
                        </TableCell>
                        <TableCell>
                            {row.isFavorite ?
                                <IconButton onClick={() => handleFavorite(row.reviewId)}>
                                    <BookmarkIcon />
                                </IconButton>
                                :
                                <IconButton onClick={() => handleFavorite(row.reviewId)}
                                    color="success">
                                    <BookmarkBorderIcon />
                                </IconButton>
                            }
                        </TableCell>
                    </TableRow>
                );
            })}
        </TableBody>
    );
};

const SolvedProblemTable = ({ isReviewed, isFavorite, initSortField, isTagged, tagId }: SolvedProblemTableProps) => {
    const {
        page,
        rowsPerPage,
        rows,
        count,
        handleChangePage,
        handleChangeRowsPerPage,
        handleFavorite,
        handleRequestSort,
        order,
        orderBy,
        dataLoaded, // dataLoaded 상태 사용
    } = useSolvedProblem({ isReviewed, isFavorite, field: initSortField, order: 'desc', tagId, isTagged });


    return (
        <Box sx={{ height: '100%', width: '100%' }}>
            <TableContainer component={Paper}
                sx={{
                    opacity: dataLoaded ? 1 : 0, // dataLoaded에 따라 opacity 변경
                    transition: 'opacity 0.5s ease-in-out' // 부드러운 트랜지션 효과
                }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHeader
                        handleRequestSort={handleRequestSort}
                        order={order}
                        orderBy={orderBy}
                    />
                    <TableBodyComponent
                        rows={rows}
                        handleFavorite={handleFavorite}
                    />
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
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

export default SolvedProblemTable;