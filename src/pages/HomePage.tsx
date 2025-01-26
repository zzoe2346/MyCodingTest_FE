import {Container} from "@mui/material";
import NoticeComponent from "../components/Notice.tsx";

const HomePage = () => {
    return (
        <Container maxWidth="xl">
            <NoticeComponent></NoticeComponent>
        </Container>
    );
}

export default HomePage;