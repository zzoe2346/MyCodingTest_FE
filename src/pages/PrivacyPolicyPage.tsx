import {
    Box,
    Container,
    Divider,
    Fade,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    alpha,
} from "@mui/material";
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import ContactMailRoundedIcon from '@mui/icons-material/ContactMailRounded';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';

interface SectionProps {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
    color: string;
}

const Section = ({ icon, title, children, color }: SectionProps) => (
    <Paper
        elevation={0}
        sx={{
            p: 3,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '16px',
        }}
    >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Box
                sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '10px',
                    background: `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.7)} 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {icon}
            </Box>
            <Typography variant="h6" fontWeight={700}>
                {title}
            </Typography>
        </Box>
        {children}
    </Paper>
);

const PrivacyPolicyPage = () => {
    return (
        <Fade in={true} timeout={500}>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                {/* Header */}
                <Box sx={{ textAlign: 'center', mb: 5 }}>
                    <Box
                        sx={{
                            width: 64,
                            height: 64,
                            borderRadius: '16px',
                            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 2,
                        }}
                    >
                        <SecurityRoundedIcon sx={{ fontSize: 32, color: 'white' }} />
                    </Box>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        개인정보처리방침
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        'MyCodingTest'(이하 '서비스')는 이용자의 개인정보를 보호하고
                        <br />
                        관련 법령을 준수하기 위해 다음과 같은 처리방침을 두고 있습니다.
                    </Typography>
                </Box>

                <Stack spacing={3}>
                    {/* 1. 개인정보의 처리 목적 */}
                    <Section
                        icon={<GavelRoundedIcon sx={{ color: 'white' }} />}
                        title="1. 개인정보의 처리 목적"
                        color="#6366f1"
                    >
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            서비스는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
                        </Typography>
                        <Stack spacing={1.5}>
                            <Box sx={{ pl: 2, borderLeft: '3px solid #6366f1' }}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    회원 가입 및 관리
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    소셜 로그인(Google, Kakao)을 통한 본인 확인, 서비스 이용에 따른 이용자 식별
                                </Typography>
                            </Box>
                            <Box sx={{ pl: 2, borderLeft: '3px solid #8b5cf6' }}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    서비스 제공
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    코딩 테스트 문제 검토, 학습 데이터 관리, 크롬 익스텐션을 통한 문제 풀이 내역 저장 및 연동
                                </Typography>
                            </Box>
                        </Stack>
                    </Section>

                    {/* 2. 처리하는 개인정보의 항목 */}
                    <Section
                        icon={<StorageRoundedIcon sx={{ color: 'white' }} />}
                        title="2. 처리하는 개인정보의 항목"
                        color="#8b5cf6"
                    >
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            서비스는 회원가입 및 원활한 서비스 제공을 위해 아래와 같은 개인정보를 수집하고 있습니다.
                        </Typography>
                        <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 600 }}>구분</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>수집 항목</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>수집 방법</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>필수 항목</TableCell>
                                        <TableCell>이메일, 프로필 이름, 프로필 이미지, 고유 식별자(ID)</TableCell>
                                        <TableCell>소셜 로그인(OAuth2)</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>서비스 이용</TableCell>
                                        <TableCell>백준 온라인 저지 문제 번호, 제출 상태, 학습 기록</TableCell>
                                        <TableCell>크롬 익스텐션 연동</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>자동 수집</TableCell>
                                        <TableCell>IP 주소, 쿠키, 서비스 이용 기록, 접속 로그</TableCell>
                                        <TableCell>서비스 이용 과정 중 생성</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Section>

                    {/* 3. 개인정보의 보유 및 이용 기간 */}
                    <Section
                        icon={<PersonRoundedIcon sx={{ color: 'white' }} />}
                        title="3. 개인정보의 보유 및 이용 기간"
                        color="#10b981"
                    >
                        <Typography variant="body2" color="text.secondary">
                            이용자의 개인정보는 원칙적으로 <strong>회원 탈퇴 시까지</strong> 보유 및 이용합니다.
                            단, 관계 법령의 규정에 따라 보존할 필요가 있는 경우 해당 기간까지 보관합니다.
                        </Typography>
                    </Section>

                    {/* 4. 개인정보의 제3자 제공 */}
                    <Section
                        icon={<VerifiedUserRoundedIcon sx={{ color: 'white' }} />}
                        title="4. 개인정보의 제3자 제공"
                        color="#f59e0b"
                    >
                        <Typography variant="body2" color="text.secondary">
                            서비스는 이용자의 개인정보를 <strong>제3자에게 제공하지 않습니다</strong>.
                            단, 이용자의 동의가 있거나 법령의 규정에 의거한 경우에는 예외로 합니다.
                        </Typography>
                    </Section>

                    {/* 5. 이용자의 권리·의무 및 그 행사방법 */}
                    <Section
                        icon={<PersonRoundedIcon sx={{ color: 'white' }} />}
                        title="5. 이용자의 권리·의무 및 그 행사방법"
                        color="#ef4444"
                    >
                        <Typography variant="body2" color="text.secondary">
                            이용자는 언제든지 등록되어 있는 자신의 개인정보를 <strong>조회하거나 수정</strong>할 수 있으며,
                            <strong> 회원 탈퇴</strong>를 통해 개인정보 이용에 대한 동의를 철회할 수 있습니다.
                        </Typography>
                    </Section>

                    {/* 6. 개인정보의 안전성 확보 조치 */}
                    <Section
                        icon={<LockRoundedIcon sx={{ color: 'white' }} />}
                        title="6. 개인정보의 안전성 확보 조치"
                        color="#0ea5e9"
                    >
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            서비스는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.
                        </Typography>
                        <Stack spacing={1.5}>
                            <Box sx={{ pl: 2, borderLeft: '3px solid #0ea5e9' }}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    해킹 등에 대비한 기술적 대책
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    JWT 기반 인증을 통한 데이터 접근 제한, SSL을 이용한 암호화 통신(HTTPS) 적용
                                </Typography>
                            </Box>
                            <Box sx={{ pl: 2, borderLeft: '3px solid #6366f1' }}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    접근 권한의 관리
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    데이터베이스 접근 권한 제한 및 비밀번호 암호화 저장
                                </Typography>
                            </Box>
                        </Stack>
                    </Section>

                    {/* 7. 개인정보 보호책임자 */}
                    <Section
                        icon={<ContactMailRoundedIcon sx={{ color: 'white' }} />}
                        title="7. 개인정보 보호책임자"
                        color="#6366f1"
                    >
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            서비스 이용 중 발생하는 모든 개인정보 보호 관련 민원은 아래의 보호책임자에게 문의하실 수 있습니다.
                        </Typography>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 2,
                                backgroundColor: alpha('#6366f1', 0.05),
                                border: '1px solid',
                                borderColor: alpha('#6366f1', 0.2),
                                borderRadius: '12px',
                            }}
                        >
                            <Stack spacing={1}>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Typography variant="body2" fontWeight={600} sx={{ minWidth: 60 }}>
                                        성명:
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        정성훈
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Typography variant="body2" fontWeight={600} sx={{ minWidth: 60 }}>
                                        문의:
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        tjdgns5506@gmail.com
                                    </Typography>
                                </Box>
                            </Stack>
                        </Paper>
                    </Section>
                </Stack>

                {/* Footer */}
                <Divider sx={{ my: 4 }} />
                <Typography variant="body2" color="text.secondary" textAlign="center">
                    본 방침은 2025년 1월 25일부터 시행됩니다.
                </Typography>
            </Container>
        </Fade>
    );
};

export default PrivacyPolicyPage;
