import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Divider,
    Fade,
    Grid2,
    Link,
    Paper,
    Stack,
    Typography,
    alpha,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import ExtensionRoundedIcon from '@mui/icons-material/ExtensionRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import SpeedRoundedIcon from '@mui/icons-material/SpeedRounded';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import UpdateRoundedIcon from '@mui/icons-material/UpdateRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';

// Mock announcements data (최신 5개)
// Mock announcements data (최신 5개)
const announcements = [
    { id: 1, title: "로그인 UX 개선 및 점검 알림 기능", date: "2026.01.18", isNew: true },
    { id: 2, title: "데모 모드 오픈 & UI 디자인 개편", date: "2026.01.09", isNew: false },
    { id: 3, title: "서비스 재시작 준비(프론트, 서버 모두 재정비 진행 중...)", date: "2026.01.08", isNew: false },
    { id: 4, title: "UI 개선 및 스크린샷 GIF 추가", date: "2025.02.06", isNew: false },
    { id: 5, title: "서비스 정식 오픈!", date: "2025.01.25", isNew: false },
];

// Mock updates data (최신 5개)
const updates = [
    { id: 1, version: "v2.1.0", title: "로그인 UX 및 알림 개선", date: "2026.01.18" },
    { id: 2, version: "v2.0.1", title: "안정화 및 구조 개선", date: "2026.01.10" },
    { id: 3, version: "v2.0.0", title: "데모 모드 및 UI 리뉴얼", date: "2026.01.09" },
    { id: 4, version: "v1.1.0", title: "결과 색상 구분 및 GIF 추가", date: "2025.02.06" },
    { id: 5, version: "v1.0.0", title: "크롬 익스텐션 등록", date: "2025.01.25" },
];

// Features data
const features = [
    {
        icon: <AutoAwesomeRoundedIcon sx={{ fontSize: 32 }} />,
        title: "자동 저장",
        description: "문제 풀이 기록을 자동으로 저장하여 편한 복습을 지원합니다.",
        color: "#6366f1",
    },
    {
        icon: <SpeedRoundedIcon sx={{ fontSize: 32 }} />,
        title: "체계적 관리",
        description: "난이도, 중요도, 태그, 북마크로 취약 부분을 집중 학습하세요.",
        color: "#8b5cf6",
    },
    {
        icon: <EditNoteRoundedIcon sx={{ fontSize: 32 }} />,
        title: "코드 편집 & 메모",
        description: "제출 코드를 수정하고, 마크다운 메모로 풀이 과정을 기록하세요.",
        color: "#f59e0b",
    },
    {
        icon: <DevicesRoundedIcon sx={{ fontSize: 32 }} />,
        title: "모바일 지원",
        description: "대중교통, 자기 전 등 자투리 시간에 틈틈이 복습하세요.",
        color: "#10b981",
    },
];

// Steps data
const steps = [
    {
        step: 1,
        title: "로그인",
        description: "회원가입 없이 소셜(구글, 카카오) 계정으로 간편하게 시작하세요.",
    },
    {
        step: 2,
        title: "크롬 익스텐션 설치",
        description: "Chrome Web Store에서 My Coding Test Connector를 설치하세요.",
    },
    {
        step: 3,
        title: "문제 풀이",
        description: "백준에서 문제를 풀면 자동으로 기록이 저장됩니다.",
    },
    {
        step: 4,
        title: "복습 시작",
        description: "저장된 기록을 바탕으로 효율적으로 복습하세요!",
    },
];

const HomePage = () => {
    return (
        <>
            <Fade in={true} timeout={500}>
                <Container maxWidth="xl" sx={{ py: 2 }}>
                {/* Hero Section */}
                <Box
                    sx={{
                        // background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
                        // background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)',
                        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
                        py: { xs: 5, md: 8 },
                        px: { xs: 3, md: 5 },
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: '16px',
                        mb: 4,
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                            opacity: 0.5,
                        }
                    }}
                >
                    <Box>
                        <Grid2 container spacing={4} alignItems="center">
                            <Grid2 size={{ xs: 12, md: 7 }}>
                                <Stack spacing={3}>
                                    <Typography
                                        variant="h2"
                                        fontWeight={800}
                                        sx={{
                                            color: 'white',
                                            fontSize: { xs: '2rem', md: '3rem' },
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        코딩테스트 복습,
                                        <br />
                                        이제 쉽고 체계적으로
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            color: 'rgba(255,255,255,0.9)',
                                            fontWeight: 400,
                                            maxWidth: 500,
                                        }}
                                    >
                                        백준 문제 풀이 기록을 자동으로 저장하고,
                                        <br />
                                        언제 어디서나 효율적으로 복습하세요.
                                    </Typography>
                                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                        <Button
                                            component={RouterLink}
                                            to="/login"
                                            variant="contained"
                                            size="large"
                                            startIcon={<LoginRoundedIcon />}
                                            sx={{
                                                backgroundColor: 'white',
                                                color: '#6366f1',
                                                fontWeight: 700,
                                                px: 4,
                                                py: 1.5,
                                                borderRadius: '12px',
                                                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(219, 218, 222, 0.92)',
                                                    // boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
                                                }
                                            }}
                                        >
                                            시작하기
                                        </Button>
                                        <Button
                                            component={RouterLink}
                                            to="/demo/solved-problems"
                                            variant="outlined"
                                            size="large"
                                            startIcon={<PlayCircleFilledRoundedIcon />}
                                            sx={{
                                                borderColor: 'rgba(255,255,255,0.5)',
                                                color: 'white',
                                                fontWeight: 600,
                                                px: 4,
                                                py: 1.5,
                                                borderRadius: '12px',
                                                '&:hover': {
                                                    borderColor: 'white',
                                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                                }
                                            }}
                                        >
                                            데모 체험하기
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Grid2>
                            <Grid2 size={{ xs: 12, md: 5 }} sx={{ display: { xs: 'none', md: 'block' } }}>
                                <Box
                                    sx={{
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                        backdropFilter: 'blur(10px)',
                                        borderRadius: '24px',
                                        p: 3,
                                        border: '1px solid rgba(255,255,255,0.2)',
                                    }}
                                >
                                    <Stack spacing={2}>
                                        {steps.map((item) => (
                                            <Box
                                                key={item.step}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 2,
                                                    p: 2,
                                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                                    borderRadius: '12px',
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: 40,
                                                        height: 40,
                                                        borderRadius: '10px',
                                                        backgroundColor: 'rgba(255,255,255,0.2)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontWeight: 700,
                                                        color: 'white',
                                                    }}
                                                >
                                                    {item.step}
                                                </Box>
                                                <Box>
                                                    <Typography fontWeight={600} color="white">
                                                        {item.title}
                                                    </Typography>
                                                    <Typography variant="body2" color="rgba(255,255,255,0.7)">
                                                        {item.description}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        ))}
                                    </Stack>
                                </Box>
                            </Grid2>
                        </Grid2>
                    </Box>
                </Box>

                {/* Features Section */}
                <Box sx={{ py: 6 }}>
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Chip
                            icon={<RocketLaunchRoundedIcon style={{ color: 'white' }} />}
                            label="주요 기능"
                            sx={{
                                mb: 2,
                                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                color: 'white',
                                fontWeight: 800,
                            }}
                        />
                        <Typography variant="h4" fontWeight={700} gutterBottom>
                            왜 My Coding Test를 사용해야 할까요?
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                            더 이상 코드와 문제 주소를 복붙하지 마세요.
                            스마트한 복습으로 코딩테스트 실력을 키워보세요.
                        </Typography>
                    </Box>

                    <Grid2 container spacing={3}>
                        {features.map((feature) => (
                            <Grid2 size={{ xs: 12, sm: 6, md: 3 }} key={feature.title}>
                                <Card
                                    elevation={0}
                                    sx={{
                                        height: '100%',
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        borderRadius: '16px',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: `0 12px 40px ${alpha(feature.color, 0.15)}`,
                                            borderColor: feature.color,
                                        }
                                    }}
                                >
                                    <CardContent sx={{ p: 3 }}>
                                        <Box
                                            sx={{
                                                width: 56,
                                                height: 56,
                                                borderRadius: '14px',
                                                backgroundColor: alpha(feature.color, 0.1),
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: feature.color,
                                                mb: 2,
                                            }}
                                        >
                                            {feature.icon}
                                        </Box>
                                        <Typography variant="h6" fontWeight={600} gutterBottom>
                                            {feature.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {feature.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid2>
                        ))}
                    </Grid2>
                </Box>

                {/* Announcements & Updates Section */}
                <Paper
                    elevation={0}
                    sx={{
                        backgroundColor: '#f8fafc',
                        py: 4,
                        px: 3,
                        borderRadius: '16px',
                        mb: 4,
                    }}>
                    <Grid2 container spacing={3}>
                        {/* Announcements */}
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    borderRadius: '16px',
                                    height: '100%',
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                                    <Box
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: '10px',
                                            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <CampaignRoundedIcon sx={{ color: 'white' }} />
                                    </Box>
                                    <Typography variant="h6" fontWeight={700}>
                                        공지사항
                                    </Typography>
                                </Box>
                                <Stack spacing={0} divider={<Divider />}>
                                    {announcements.map((item) => (
                                        <Box
                                            key={item.id}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                py: 1.5,
                                                cursor: 'pointer',
                                                '&:hover': { backgroundColor: 'action.hover' },
                                                borderRadius: '8px',
                                                px: 1,
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography fontWeight={500}>
                                                    {item.title}
                                                </Typography>
                                                {item.isNew && (
                                                    <Chip
                                                        label="NEW"
                                                        size="small"
                                                        sx={{
                                                            height: 20,
                                                            fontSize: '0.65rem',
                                                            fontWeight: 700,
                                                            backgroundColor: '#ef4444',
                                                            color: 'white',
                                                        }}
                                                    />
                                                )}
                                            </Box>
                                            <Typography variant="body2" color="text.secondary">
                                                {item.date}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Stack>
                            </Paper>
                        </Grid2>

                        {/* Updates */}
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    borderRadius: '16px',
                                    height: '100%',
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                                    <Box
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: '10px',
                                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <UpdateRoundedIcon sx={{ color: 'white' }} />
                                    </Box>
                                    <Typography variant="h6" fontWeight={700}>
                                        업데이트
                                    </Typography>
                                </Box>
                                <Stack spacing={0} divider={<Divider />}>
                                    {updates.map((item) => (
                                        <Box
                                            key={item.id}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                py: 1.5,
                                                cursor: 'pointer',
                                                '&:hover': { backgroundColor: 'action.hover' },
                                                borderRadius: '8px',
                                                px: 1,
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                <Chip
                                                    label={item.version}
                                                    size="small"
                                                    sx={{
                                                        height: 22,
                                                        fontSize: '0.7rem',
                                                        fontWeight: 600,
                                                        backgroundColor: alpha('#10b981', 0.1),
                                                        color: '#10b981',
                                                    }}
                                                />
                                                <Typography fontWeight={500}>
                                                    {item.title}
                                                </Typography>
                                            </Box>
                                            <Typography variant="body2" color="text.secondary">
                                                {item.date}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Stack>
                            </Paper>
                        </Grid2>
                    </Grid2>
                </Paper>

                {/* Extension CTA Section */}
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 4, md: 5 },
                        background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
                        borderRadius: '16px',
                        textAlign: 'center',
                        mb: 4,
                    }}
                >
                    <ExtensionRoundedIcon sx={{ fontSize: 48, color: 'white', mb: 2 }} />
                    <Typography variant="h5" fontWeight={700} color="white" gutterBottom>
                        크롬 익스텐션 설치하고 바로 시작하세요
                    </Typography>
                    <Typography color="rgba(255,255,255,0.9)" sx={{ mb: 3, maxWidth: 500, mx: 'auto' }}>
                        My Coding Test Connector를 설치하면
                        백준에서 문제를 풀 때마다 자동으로 기록됩니다.
                    </Typography>
                    <Button
                        component={Link}
                        href="https://chromewebstore.google.com/detail/my-coding-test-connector/ekmnmpgdcpflanopjcopleffealdeifj"
                        target="_blank"
                        variant="contained"
                        size="large"
                        endIcon={<ArrowForwardRoundedIcon />}
                        sx={{
                            backgroundColor: 'white',
                            color: '#f59e0b',
                            fontWeight: 700,
                            px: 4,
                            py: 1.5,
                            borderRadius: '12px',
                            '&:hover': {
                                backgroundColor: 'white',
                                transform: 'translateY(-2px)',
                            }
                        }}
                    >
                        Chrome Web Store에서 설치
                    </Button>
                </Paper>

                {/* Footer Contact */}
                <Paper
                    elevation={0}
                    sx={{
                        backgroundColor: '#0f172a',
                        py: 3,
                        px: 3,
                        borderRadius: '16px',
                    }}
                >
                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                    >
                        <Typography color="rgba(255,255,255,0.7)" variant="body2">
                            © 2025 My Coding Test. 문의: tjdgns5506@gmail.com
                        </Typography>
                        <Typography color="rgba(255,255,255,0.5)" variant="body2">
                            비정상적인 트래픽을 유발하는 계정이나 IP는 차단될 수 있습니다.
                        </Typography>
                    </Stack>
                </Paper>
            </Container>
        </Fade>
        </>
    );
}

export default HomePage;