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
import React from "react";

interface SolvedProblemTableProps {
    isReviewed?: boolean;
    isFavorite?: boolean;
}

interface HeadCell {
    id: keyof SolvedProblemWithReview;
    label: string;
    disableSorting?: boolean;
}

const headCells: HeadCell[] = [
    {id: 'problemNumber', label: '문제 번호'},
    {id: 'problemTitle', label: '문제 제목'},
    {id: 'recentSubmitAt', label: '최근 제출 시간'},
    {id: 'recentResultText', label: '최근 결과'},
    {id: 'difficultyLevel', label: '난이도'},
    {id: 'importanceLevel', label: '중요도'},
    {id: 'isReviewed', label: '복습'},
    {id: 'isFavorite', label: '북마크', disableSorting: true},
];

interface TableHeaderProps {
    handleRequestSort: (property: keyof SolvedProblemWithReview) => void;
    order: Order;
    orderBy: string;
}

const TableHeader: React.FC<TableHeaderProps> = ({handleRequestSort, order, orderBy}) => {
    const createSortHandler = (property: keyof SolvedProblemWithReview) => () => {
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
                        {row.isReviewed
                            ? row.difficultyLevel
                            : <Rating name="half-rating-read" defaultValue={0} size="small" readOnly/>}
                    </TableCell>
                    <TableCell>
                        {row.isReviewed
                            ? <Rating name="half-rating-read" defaultValue={row.importanceLevel} size="small" readOnly/>
                            : <Rating name="half-rating-read" defaultValue={0} size="small" readOnly/>}
                    </TableCell>
                    <TableCell>
                        {row.isReviewed
                            ? <Button>다시보기</Button>
                            : <Button>복습하기</Button>}
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

const SolvedProblemTable = ({isReviewed, isFavorite}: SolvedProblemTableProps) => {
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
        orderBy
    } = useSolvedProblem({isReviewed, isFavorite, field: 'recentSubmitAt', order: 'desc'});

    return (
        <Box sx={{height: 600, width: '100%'}}>
            <TableContainer component={Paper}>
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