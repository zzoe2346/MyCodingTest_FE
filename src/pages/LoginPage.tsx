import LoginForm from "../components/LoginForm.tsx";
import {Container} from "@mui/material";

const LoginPage = () => {

    return (
        <Container maxWidth="xl" sx={{mt: "10px"}}>
            <LoginForm/>
        </Container>
    );
};

export default LoginPage;
