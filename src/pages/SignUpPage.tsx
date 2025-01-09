import {Container, Grid2} from "@mui/material";
import SignUpForm from "../components/SignUpForm.tsx";


export default () =>{

    return (
        <Container>
            <Grid2 container justifyContent='center' spacing={2}>
                <SignUpForm/>
            </Grid2>
        </Container>
    )
}