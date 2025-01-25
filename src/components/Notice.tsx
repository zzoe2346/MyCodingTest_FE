import React, {useEffect, useState} from 'react';
import {Box, Divider, Fade, Link, Paper, Stack, Typography,} from '@mui/material';
import ExtensionIcon from '@mui/icons-material/Extension';

const NoticeComponent: React.FC = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
    }, []);

    return (
        <Fade in={show} timeout={500}>
            <Paper
                sx={{
                    overflowY: 'auto',
                    height: '82vh',
                    padding: '16px',
                    margin: '16px 0',
                    opacity: 1,
                    transition: 'opacity 0.5s ease-in-out',
                }}
            >
                <Stack spacing={2}>
                    <Typography variant="h4">🙇🏻 환영합니다!</Typography>
                    <Divider/>
                    <Box>
                        <Typography variant="h5" fontWeight={'bold'} gutterBottom>
                            📣 서비스 이용 절차
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            1. 회원가입 없이 간편히 <Link href="/login" underline="hover">로그인</Link>
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            2. Chrome Web Store 에서{' '}
                            <Link
                                href="https://chromewebstore.google.com/detail/my-coding-test-connector/ekmnmpgdcpflanopjcopleffealdeifj"
                                underline="hover">
                                My Coding Test Connector
                            </Link>
                            {' '}설치
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            이제 평소처럼 백준에서 문제를 풀고 <b>My Coding Test</b> 에서 편하게 복습
                            가능합니다.
                        </Typography>
                    </Box>
                    <Divider/>
                    <Box>
                        <Typography variant="h5" fontWeight='bold' gutterBottom>
                            🎯 My Coding Test Connector 의 로그인 유무 확인방법
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            1. 크롬 주소창 우측에 퍼즐버튼(<ExtensionIcon
                            sx={{fontSize: 16, marginBottom: -0.3, paddingBottom: 0}}/>) 클릭
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            2. 확장 프로그램 리스트 중 My Coding Test Connector 클릭
                        </Typography>
                        <Box
                            component="img"
                            sx={{
                                width: '25%',
                                minWidth: 250,
                                marginBottom: 0,
                            }}
                            alt="로그인 익스텐션 연결 확인 이미지"
                            src="notice/tip-2.png"
                        />
                        <Typography variant="body1" gutterBottom>
                            3. 아래 이미지처럼 본인 계정에 등록된 이름이 나오면 연결 상태
                        </Typography>
                        <Box
                            component="img"
                            sx={{
                                width: '25%',
                                minWidth: 250,
                                marginBottom: 0,
                            }}
                            alt="로그인 익스텐션 연결 확인 이미지"
                            src="notice/img_2.png"
                        />
                    </Box>
                    <Divider/>
                    <Box>
                        <Typography variant="h5" fontWeight={'bold'} gutterBottom>
                            ✅ 제공되는 기능
                        </Typography>
                    </Box>
                    <Divider/>
                    <Box>
                        <Typography variant="h5" fontWeight={'bold'} gutterBottom>
                            🛠️ 업데이트
                        </Typography>

                        <Typography variant="subtitle1" gutterBottom>
                            25.01.25
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            - 크롬 익스텐션 등록 완료 🎉<br/>
                            - 약간의 테스트 기간 거치고 홍보
                        </Typography>
                    </Box>
<Divider/>
                    <Box>
                        <Typography variant="h5" fontWeight={'bold'} gutterBottom>
                            🌏 소통
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            google@gmail.com 으로 메일 주세요.
                        </Typography>
                    </Box>

                </Stack>
            </Paper>
        </Fade>
    );
};

export default NoticeComponent;