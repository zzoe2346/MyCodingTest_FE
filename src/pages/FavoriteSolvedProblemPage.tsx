import {Container, Divider, Stack, Typography} from "@mui/material";
import SolvedProblemTable from "../components/SolvedProblemTable.tsx";

export default () => {
    return (
        <Container>
            <Stack justifyContent='center' spacing={1}>
                <Typography variant="h6"> 🔎 즐겨찾기 문제 모음 </Typography>
                <Divider></Divider>
                <SolvedProblemTable isFavorite={true} isReviewed={null} initSortField={"recentSubmitAt"}/>
            </Stack>
        </Container>
    );
}