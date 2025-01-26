import {Container, Divider, Stack, Typography} from "@mui/material";
import SolvedProblemTable from "../components/SolvedProblemTable.tsx";


export default () => {
    return (
        <Container>
            <Stack justifyContent='center' spacing={1}>
                <Typography variant="h6"> 🔎 복습 대기 문제 모음 </Typography>
                <Divider></Divider>
                <SolvedProblemTable isReviewed={false} isFavorite={false} initSortField={"recentSubmitAt"}/>
            </Stack>
        </Container>
    );
}