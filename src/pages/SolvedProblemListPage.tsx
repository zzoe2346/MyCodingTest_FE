import {Divider, Grid2, Typography} from "@mui/material";
import PaginationTable from "../components/PaginationTable.tsx";

const SolveProblemListPage = () => {
    return (
        <Grid2 container justifyContent='center' spacing={4} mt="10px">
            <Grid2 size={11}>
                <Typography variant="subtitle1"> 풀이한 문제들 입니다. </Typography>
                <Divider></Divider>
            </Grid2>
            <Grid2 size={11}>
                <PaginationTable/>
            </Grid2>
        </Grid2>
    );
};

export default SolveProblemListPage;