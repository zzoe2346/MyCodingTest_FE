import { Container, Typography, Box, Chip, Stack, Button, Paper } from "@mui/material";
import DemoSolvedProblemTable from "../components/DemoSolvedProblemTable";
import { Link as RouterLink } from "react-router-dom";
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';

const DemoSolvedProblemPage = () => {
    return (
        <Container>
            <Stack spacing={3}>
                {/* Header */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 2
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography
                            variant="h4"
                            fontWeight="700"
                            sx={{
                                background: 'linear-gradient(135deg, #0f172a 0%, #475569 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            푼 문제들
                        </Typography>
                        <Chip
                            label="데모 체험중"
                            size="small"
                            icon={<RocketLaunchRoundedIcon sx={{ fontSize: 16 }} />}
                            sx={{
                                background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
                                color: 'white',
                                fontWeight: 600,
                                '& .MuiChip-icon': {
                                    color: 'white',
                                }
                            }}
                        />
                    </Box>
                    <Button
                        component={RouterLink}
                        to="/login"
                        variant="contained"
                        startIcon={<LoginRoundedIcon />}
                        sx={{
                            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                            borderRadius: '10px',
                            px: 2.5,
                            py: 1,
                            fontWeight: 600,
                            boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                                boxShadow: '0 6px 20px rgba(99, 102, 241, 0.45)',
                                transform: 'translateY(-1px)',
                            }
                        }}
                    >
                        로그인하고 시작하기
                    </Button>
                </Box>

                {/* Demo Info Banner */}
                <Paper
                    elevation={0}
                    sx={{
                        p: 2.5,
                        background: 'linear-gradient(135deg, #fef3c7 0%, #fef9c3 100%)',
                        border: '1px solid #fcd34d',
                        borderRadius: '16px',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <Box sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                        }}>
                            <Typography sx={{ fontSize: 20 }}>🎮</Typography>
                        </Box>
                        <Box>
                            <Typography fontWeight={600} color="#92400e" gutterBottom>
                                데모 모드로 체험 중이에요!
                            </Typography>
                            <Typography variant="body2" color="#a16207">
                                샘플 데이터로 서비스의 주요 기능을 미리 체험해보세요.
                                문제를 클릭하면 코드와 메모를 확인할 수 있어요.
                            </Typography>
                        </Box>
                    </Box>
                </Paper>

                {/* Table */}
                <DemoSolvedProblemTable initSortField="recentSubmitAt" />
            </Stack>
        </Container>
    );
};

export default DemoSolvedProblemPage;
