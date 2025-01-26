import {Container, Divider, Stack, Typography} from "@mui/material";
import SolvedProblemTable from "../components/SolvedProblemTable.tsx";

const SolveProblemListPage = () => {
    return (
        <Container>
            <Stack justifyContent='center' spacing={1}>
                <Typography variant="h6"> 🔎 풀이한 문제 모음 </Typography>
                <Divider></Divider>
                <SolvedProblemTable isFavorite={false} isReviewed={null} initSortField={"recentSubmitAt"}/>
            </Stack>
        </Container>
    );
};

export default SolveProblemListPage;