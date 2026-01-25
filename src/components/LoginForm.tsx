import { useEffect, useState } from 'react';
import { Box, CircularProgress, Divider, Fade, Paper, Stack, Typography } from '@mui/material';
import MaintenanceNotice from "./MaintenanceNotice.tsx";

const Login = () => {
    const [loaded, setLoaded] = useState(false);
    const [maintenanceOpen, setMaintenanceOpen] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const handleGoogleLogin = () => {
        setMaintenanceOpen(false);
        setIsLoggingIn(true);
        // window.location.href = 'http://localhost:8080/oauth2/authorization/google';
        window.location.href = 'https://api.mycodingtest.com/oauth2/authorization/google';
    };

    const handleKakaoLogin = () => {
        setMaintenanceOpen(false);
        setIsLoggingIn(true);
        // window.location.href = 'http://localhost:8080/oauth2/authorization/kakao';
        window.location.href = 'https://api.mycodingtest.com/oauth2/authorization/kakao';
    };

    useEffect(() => {
        setLoaded(true);
    }, []);

    // 로딩 중 화면
    if (isLoggingIn) {
        return (
            <Fade in={true} timeout={300}>
                <Paper
                    elevation={0}
                    sx={{
                        p: 5,
                        borderRadius: '20px',
                        border: '1px solid',
                        borderColor: 'divider',
                        maxWidth: 420,
                        mx: 'auto',
                    }}
                >
                    <Stack spacing={3} alignItems="center" sx={{ py: 4 }}>
                        <CircularProgress 
                            size={48} 
                            sx={{ 
                                color: 'primary.main',
                            }} 
                        />
                        <Typography variant="h6" fontWeight={600} color="text.primary">
                            로그인 중...
                        </Typography>
                        <Typography variant="body2" color="text.secondary" textAlign="center">
                            잠시만 기다려주세요
                        </Typography>
                    </Stack>
                </Paper>
            </Fade>
        );
    }

    return (
        <>
        <Fade in={loaded} timeout={500}>
            <Paper
                elevation={0}
                sx={{
                    p: 5,
                    borderRadius: '20px',
                    border: '1px solid',
                    borderColor: 'divider',
                    maxWidth: 420,
                    mx: 'auto',
                }}
            >
                <Stack spacing={4} alignItems="center">
                    {/* Header */}
                    <Box textAlign="center">
                        <Typography
                            variant="h4"
                            fontWeight={700}
                            sx={{
                                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: 1,
                            }}
                        >
                            로그인
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            서비스를 이용하기 위해 로그인이 필요합니다
                            <br />
                            회원가입 없이 간편하게 로그인하세요
                        </Typography>
                    </Box>

                    <Divider sx={{ width: '100%' }} />

                    {/* Social Login Buttons - Using existing images */}
                    <Stack spacing={2} sx={{ width: '100%' }}>
                        {/* Google Button */}
                        <Box
                            component="button"
                            onClick={handleGoogleLogin}
                            sx={{
                                p: 0,
                                border: 'none',
                                background: 'transparent',
                                cursor: 'pointer',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                transition: 'all 0.2s ease',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                                }
                            }}
                        >
                            <Box
                                component="img"
                                src="images/my-google.png"
                                alt="Google 로그인"
                                sx={{
                                    width: '104%',
                                    height: 'auto',
                                    display: 'block',
                                    marginLeft: '-2%',
                                    marginTop: '-2%',
                                    marginBottom: '-2%',
                                }}
                            />
                        </Box>

                        {/* Kakao Button */}
                        <Box
                            component="button"
                            onClick={handleKakaoLogin}
                            sx={{
                                p: 0,
                                border: 'none',
                                background: 'transparent',
                                cursor: 'pointer',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                transition: 'all 0.2s ease',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.12)',

                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 24px rgba(254, 229, 0, 0.3)',
                                }
                            }}
                        >
                            <Box
                                component="img"
                                src="images/my-kakao.png"
                                alt="카카오 로그인"
                                sx={{
                                    width: '104%',
                                    height: 'auto',
                                    display: 'block',
                                    marginLeft: '-2%',
                                    marginTop: '-2%',
                                    marginBottom: '-2%',
                                }}
                            />
                        </Box>
                    </Stack>

                    {/* Footer note */}
                    <Typography variant="caption" color="text.secondary" textAlign="center">
                        로그인 시 서비스 이용약관에 동의하게 됩니다
                    </Typography>
                </Stack>
            </Paper>
        </Fade>
        <MaintenanceNotice open={maintenanceOpen} onClose={() => setMaintenanceOpen(false)} />
        </>
    );
};

export default Login;

