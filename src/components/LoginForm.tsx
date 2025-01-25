import React, {useEffect, useState} from 'react';
import {Box, Button, Divider, Fade, Paper, Stack, Typography} from '@mui/material';

interface SocialLoginButtonProps {
    src: string; // 이미지 경로
    alt: string; // 대체 텍스트
    onClick: () => void; // 클릭 이벤트 핸들러
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({src, alt, onClick}) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <Button
            onClick={onClick}
            style={{
                padding: 0,
                border: 'none',
                background: 'none',
                boxShadow: 'none',
                width: '30%', // 모든 버튼 너비 통일
                minWidth: "300px",
                height: '70%', // 모든 버튼 높이 통일
                display: 'flex', // 이미지 중앙 정렬
                justifyContent: 'center', // 이미지 중앙 정렬
                alignItems: 'center', // 이미지 중앙 정렬
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    opacity: loaded ? 1 : 0,
                    transform: loaded ? 'scale(1)' : 'scale(0.95)',
                    transition: 'opacity 0.5s ease, transform 0.5s ease',
                }}
            >
                <img
                    src={src}
                    alt={alt}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                    }}
                    onLoad={() => setLoaded(true)}
                />
            </Box>
        </Button>
    );
};

const Login = () => {
    const [loaded, setLoaded] = useState(false);
    const handleGoogleLogin = () => {
        // window.location.href = 'http://localhost:8080/oauth2/authorization/google';
        window.location.href = 'https://api.mycodingtest.com/oauth2/authorization/google';
    };

    const handleKakaoLogin = () => {
        // window.location.href = 'http://localhost:8080/oauth2/authorization/kakao';
        window.location.href = 'https://api.mycodingtest.com/oauth2/authorization/kakao';
    };

    const handleNaverLogin = () => {
        window.location.href = 'http://localhost:8080/oauth2/authorization/naver';
        // window.location.href = 'https://api.mycodingtest.com/oauth2/authorization/naver';
    };
    useEffect(() => {
        setLoaded(true);
    }, []);
    return (
        <Fade in={loaded} timeout={500}>
            <Paper sx={{padding: '16px', margin: '16px 0', width: 'auto', height: 'auto'}}>
                <Stack spacing={3} direction="column" alignItems="center">
                    <Typography variant="h4" align="center">
                        Login
                    </Typography>
                    <Typography variant="body1" align="center">
                        서비스를 이용하기 위해선 로그인이 필요합니다
                        <br/>
                        회원가입 없이 간편하게 로그인하세요
                    </Typography>

                    <Divider sx={{width: '100%', marginY: 2}}/>
                    {/* 컴포넌트화된 소셜 로그인 버튼 사용 */}
                    <SocialLoginButton src="images/my-google.png" alt="Google Icon" onClick={handleGoogleLogin}/>
                    <SocialLoginButton src="images/my-kakao.png" alt="Kakao Icon" onClick={handleKakaoLogin}/>
                    <SocialLoginButton src="images/my-naver.png" alt="Naver Icon" onClick={handleNaverLogin}/>
                </Stack>
            </Paper>
        </Fade>
    );
};

export default Login;
