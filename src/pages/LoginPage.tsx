import LoginForm from "../components/LoginForm.tsx";
import {Container, Grid2} from "@mui/material";

const LoginPage = () => {

    return (
        <Container>
            <Grid2
                container
                justifyContent="center"
                style={{minHeight: '100vh'}}
            >
                <LoginForm/>
            </Grid2>
        </Container>

    );
};

export default LoginPage;
