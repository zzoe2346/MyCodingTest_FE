import { Container, Typography, Box, Chip, Stack, Alert, Button } from "@mui/material";
import DemoSolvedProblemTable from "../components/DemoSolvedProblemTable";
import { Link as RouterLink } from "react-router-dom";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const DemoSolvedProblemPage = () => {
    return (
        <Container>
            <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="h5" fontWeight="bold">
                        📚 푼 문제들
                    </Typography>
                    <Chip
                        label="데모 모드"
                        color="warning"
                        size="small"
                        icon={<PlayArrowIcon />}
                    />
                </Box>

                <Alert severity="info" sx={{ mb: 2 }}>
                    <Typography variant="body2">
                        🎯 <strong>데모 모드</strong>입니다! 실제 데이터가 아닌 샘플 데이터로 서비스를 체험해보세요.
                        <br />
                        문제를 클릭하면 복습 페이지로 이동하며, 코드와 메모를 확인할 수 있습니다.
                    </Typography>
                    <Button
                        component={RouterLink}
                        to="/login"
                        size="small"
                        variant="outlined"
                        sx={{ mt: 1 }}
                    >
                        로그인하고 내 문제 관리하기
                    </Button>
                </Alert>

                <DemoSolvedProblemTable initSortField="recentSubmitAt" />
            </Stack>
        </Container>
    );
};

export default DemoSolvedProblemPage;
