import {Container, Divider, Grid2, Typography} from "@mui/material";
import SolvedProblemTable from "../components/SolvedProblemTable.tsx";

export default () => {
    return (
        <Container maxWidth="xl" sx={{mt: "10px"}}>
            <Grid2 container justifyContent='center' spacing={2}>
                <Grid2 size={12}>
                    <Typography variant="subtitle1"> 즐겨찾기된 문제들 입니다. </Typography>
                    <Divider></Divider>
                </Grid2>
                <Grid2 size={12}>
                    <SolvedProblemTable isFavorite={true} isReviewed={null} initSortField={"recentSubmitAt"}/>
                </Grid2>
            </Grid2>
        </Container>


    );
}