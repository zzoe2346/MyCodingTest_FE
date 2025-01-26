import {
    Box,
    Button,
    IconButton,
    Paper,
    Rating,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel
} from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import useSolvedProblem, {Order} from "../hooks/useSolvedProblem.ts";
import {SolvedProblemWithReview} from "../hooks/types.ts";
import {Link} from 'react-router-dom'
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
    {id: 'problemNumber', label: '문제 번호'},
    {id: 'problemTitle', label: '문제 제목'},
    {id: 'recentSubmitAt', label: '최근 제출 시간'},
    {id: 'recentResultText', label: '최근 결과'},
    {id: 'review.difficultyLevel', label: '체감 난이도'},
    {id: 'review.importanceLevel', label: '재복습 필요도'},
    {id: 'review.reviewedAt', label: '복습'},
    {id: 'isFavorite', label: '북마크', disableSorting: true},
];

interface TableHeaderProps {
    handleRequestSort: (property: keyof SolvedProblemWithReview | string) => void;
    order: Order;
    orderBy: string;
}

const TableHeader: React.FC<TableHeaderProps> = ({handleRequestSort, order, orderBy}) => {
    const createSortHandler = (property: keyof SolvedProblemWithReview | string) => () => {
        handleRequestSort(property);
    };
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        sortDirection={orderBy === headCell.id ? order : undefined}
                    >
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
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

interface TableBodyProps {
    rows: SolvedProblemWithReview[]
    handleFavorite: (solvedProblemId: number) => void;
}

const TableBodyComponent: React.FC<TableBodyProps> = ({rows, handleFavorite}) => {
    return (
        <TableBody>
            {rows.map((row) => (
                <TableRow key={row.solvedProblemId}>
                    <TableCell component="th" scope="row" width='auto'>
                        {row.problemNumber}
                    </TableCell>
                    <TableCell width='auto'>{row.problemTitle}</TableCell>
                    <TableCell>
                        {new Date(row.recentSubmitAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{row.recentResultText}</TableCell>
                    <TableCell>
                        <Rating name="half-rating-read" value={row.difficultyLevel} size="small" readOnly/>
                    </TableCell>
                    <TableCell>
                        <Rating name="half-rating-read" value={row.importanceLevel} size="small" readOnly/>
                    </TableCell>
                    <TableCell>
                        <Link to={`/review/${row.reviewId}?problemTitle=${row.problemTitle}&sp=${row.solvedProblemId}`}>
                            <Button>
                                {row.isReviewed ? (
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        margin: "0px"
                                    }}>
                                        <div>다시보기</div>
                                        <div style={{
                                            fontSize: "0.8rem",
                                            marginTop: "0px"
                                        }}>{new Date(row.reviewedAt).toLocaleDateString()}</div>
                                    </div>
                                ) : (
                                    "복습하기"
                                )}
                            </Button>
                        </Link>
                    </TableCell>
                    <TableCell>
                        {row.isFavorite ?
                            <IconButton onClick={() => handleFavorite(row.solvedProblemId)}>
                                <BookmarkIcon/>
                            </IconButton>
                            :
                            <IconButton onClick={() => handleFavorite(row.solvedProblemId)}
                                        color="success">
                                <BookmarkBorderIcon/>
                            </IconButton>
                        }
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
};

const SolvedProblemTable = ({isReviewed, isFavorite, initSortField, isTagged, tagId}: SolvedProblemTableProps) => {
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
    } = useSolvedProblem({isReviewed, isFavorite, field: initSortField, order: 'desc', tagId, isTagged});


    return (
        <Box sx={{height: '100%', width: '100%'}}>
            <TableContainer component={Paper}
                            sx={{
                                opacity: dataLoaded ? 1 : 0, // dataLoaded에 따라 opacity 변경
                                transition: 'opacity 0.5s ease-in-out' // 부드러운 트랜지션 효과
                            }}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
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