import React, {useEffect, useState} from 'react';
import {Box, Divider, Fade, Link, Paper, Stack, Typography,} from '@mui/material';
import ExtensionIcon from '@mui/icons-material/Extension';
import BojImageList from "./BojImageList.tsx";
import MCTShowImageList from "./MCTShowImageList.tsx";

const NoticeComponent: React.FC = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
    }, []);

    return (
        <Fade in={show} timeout={500}>
            <Paper elevation={3}>
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
                            위 과정만 끝냈으면 모든 준비는 끝이났습니다. 이제 풀이한 문제를 <b>My Coding Test</b> 에서 편하게 복습해보세요!
                        </Typography>
                        <BojImageList/>

                    </Box>
                    <Divider/>
                    <Box>
                        <Typography variant="h5" fontWeight={'bold'} gutterBottom>
                            🚀 왜 My Coding Test를 사용해야 할까요?
                        </Typography>
                        <Typography variant="body1" gutterBottom sx={{lineHeight: 1.8}}>
                            - 더 이상 코드와 문제 주소를 복붙하지 마세요!<b> 문제 풀이 기록을 자동으로 저장하여 편한 복습을 지원합니다.</b><br/>
                            - 난이도 매기기, 중요도 매기기, 태그, 북마크, 정렬 등의 기능을 활용해 <b>풀이한 문제를 체계적으로 관리하고, 취약한 부분을 집중적으로 학습할 수
                            있습니다.</b><br/>
                            - 제출한 코드를 바로 수정 가능하고, 마크다운이 지원되는 메모기능을 지원합니다.<br/>
                            - 별도의 복잡한 설정 없이, 크롬 익스텐션 한 번만 설치하면 이 모든 기능을 간편하게 사용할 수 있습니다.<br/>
                            - 모바일 UI를 지원합니다. 자기 전, 대중교통에서 등 자투리 시간에 틈틈이 코딩테스트를 준비해 보세요.
                        </Typography>
                    </Box>
                    <Divider/>

                    {/* 추가: 사용 스크린샷 */}
                    <Box>
                        <Typography variant="h5" fontWeight={'bold'} gutterBottom>
                            📸 사용 스크린샷
                        </Typography>
                        <MCTShowImageList/>
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
                            🛠️ 업데이트
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            25.01.25
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            - 크롬 익스텐션 등록 완료 🎉<br/>
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            25.01.31
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            - 공지 페이지 완성<br/>
                            - 핵심 기능 정상 작동 확인
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            25.02.06
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            - 풀이 결과 '맞았습니다!!' 인 경우와 그 외의 경우의 표현 색상을 구분하였습니다.<br/>
                            - 스크린샷에 움직이는 GIF를 추가하였습니다.
                        </Typography>
                    </Box>
                    <Divider/>
                    <Box>
                        <Typography variant="h5" fontWeight={'bold'} gutterBottom>
                            🌏 소통
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            - 서비스 이용 중 궁금하신 점, 개선이 필요한 부분이 있으시다면 tjdgns5506@gmail.com 으로 언제든 문의해 주시기 바랍니다.<br/>
                            - 비정상적인 트래픽을 유발하는 계정이나 IP는 차단될수 있습니다.
                        </Typography>
                    </Box>
                </Stack>
            </Paper>
        </Fade>
    );
};

export default NoticeComponent;