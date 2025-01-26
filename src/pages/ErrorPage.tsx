import {Container, Paper, Stack, Typography} from "@mui/material";
import {useSearchParams} from "react-router-dom";

const ErrorPage = () => {
    const [searchParams] = useSearchParams();
    const title = searchParams.get("title");
    const status = searchParams.get("status");
    const detail = searchParams.get("detail");

    function externalFail() {
        return (
            <>
                <Typography>
                    죄송합니다. 현재 시스템 외부의 장애(AWS)로 인하여 정상적인 서비스 제공이 불가합니다.
                </Typography>
                <Typography>
                    관련 문의를 홈의 연락처를 통해 해주시면 감사하겠습니다.
                </Typography>
            </>

        )
    }


    function internalFail() {
        return (
            <Typography>
                {title}
                <Typography>
                    {detail}
                </Typography>
            </Typography>

        )
    }


    return (
        <Container>
            <Paper sx={{padding: '16px', margin: '16px 0'}}>
                <Stack spacing={3} direction="column" alignItems="center" sx={{textAlign: 'center'}}>
                    <Typography variant={"h2"}>
                        {"⚠️ "}{status}
                    </Typography>
                    <Typography variant={"body1"}>
                        {title === 'undefined'
                            ? externalFail()
                            : internalFail()}
                    </Typography>
                </Stack>

            </Paper>
        </Container>
    );

}

export default ErrorPage;