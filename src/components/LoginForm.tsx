import React, { useState } from 'react';
import { Paper, Stack, Typography, Button, Divider, Box } from '@mui/material';

interface SocialLoginButtonProps {
    src: string; // 이미지 경로
    alt: string; // 대체 텍스트
    onClick: () => void; // 클릭 이벤트 핸들러
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({ src, alt, onClick }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <Button
            onClick={onClick}
            style={{
                padding: 0,
                border: 'none',
                background: 'none',
                boxShadow: 'none',
                width: '50%', // 모든 버튼 너비 통일
                height: 'auto', // 모든 버튼 높이 통일
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
                        objectFit: 'contain',
                    }}
                    onLoad={() => setLoaded(true)}
                />
            </Box>
        </Button>
    );
};

const Login = () => {
    const handleGoogleLogin = () => {
        console.log('Google Login Clicked');
    };

    const handleKakaoLogin = () => {
        console.log('Kakao Login Clicked');
    };

    const handleNaverLogin = () => {
        console.log('Naver Login Clicked');
    };

    return (
        <Paper sx={{ padding: 4, width: '700px' }}>
            <Stack spacing={3} direction="column" alignItems="center">
                <Typography variant="h4" align="center">
                    Login
                </Typography>
                <Typography variant="body1" align="center">
                    회원가입 없이 간편하게 로그인하세요
                </Typography>
                <Divider sx={{ width: '100%', marginY: 2 }} />

                {/* 컴포넌트화된 소셜 로그인 버튼 사용 */}
                <SocialLoginButton src="images/my-google.png" alt="Google Icon" onClick={handleGoogleLogin} />
                <SocialLoginButton src="images/my-kakao.png" alt="Kakao Icon" onClick={handleKakaoLogin} />
                <SocialLoginButton src="images/my-naver.png" alt="Naver Icon" onClick={handleNaverLogin} />
            </Stack>
        </Paper>
    );
};

export default Login;
