import {
    Box,
    Button,
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
    TableSortLabel, Typography
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
    { id: 'reviewedAt', label: '복습' },
    { id: 'isFavorite', label: '북마크', disableSorting: true },
];

interface TableHeaderProps {
    handleRequestSort: (property: keyof SolvedProblemWithReview | string) => void;
    order: Order;
    orderBy: string;
}

const TableHeader: React.FC<TableHeaderProps> = ({ handleRequestSort, order, orderBy }) => {
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
            {rows.map((row) => (
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
                        <Typography variant="body2" fontWeight={'bold'} color={row.recentResultText === '맞았습니다!!' ? 'success' : 'error'}>
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
                            href={`/review/${row.reviewId}?problemTitle=${row.problemTitle}&sp=${row.solvedProblemId}`}>
                            <Button>
                                {row.isReviewed ? (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            margin: "0px"
                                        }}
                                    >
                                        <Typography variant="body2">다시보기</Typography>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                marginTop: "0px"
                                            }}
                                        >
                                            {new Date(row.reviewedAt).toLocaleDateString()}
                                        </Typography>
                                    </Box>
                                ) : (
                                    "복습하기"
                                )}
                            </Button>
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
            ))}
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