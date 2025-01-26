import {Container, Divider, Stack, Typography} from "@mui/material";
import SolvedProblemTable from "../components/SolvedProblemTable.tsx";

const ReviewClearSolvedProblemPage = () => {
    return (
        <Container>
            <Stack justifyContent='center' spacing={1}>
                <Typography variant="h6"> 🔎 복습 완료 문제 모음 </Typography>
                <Divider></Divider>
                <SolvedProblemTable isReviewed={true} isFavorite={false} initSortField={"review.reviewedAt"}/>
            </Stack>
        </Container>
    );
};

export default ReviewClearSolvedProblemPage;