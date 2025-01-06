import LoginForm from "../components/LoginForm.tsx";
import {Grid2} from "@mui/material";

const AuthPage = () => {

    return (
        <Grid2
            container
            justifyContent="center"
            style={{minHeight: '100vh'}}
        >
            <LoginForm/>
        </Grid2>
    );
};

export default AuthPage;
