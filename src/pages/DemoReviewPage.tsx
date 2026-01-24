import { Box, Button, Container, Fade, Grid2, Paper, Stack, Typography, useMediaQuery, useTheme, alpha, Chip, Alert, IconButton } from "@mui/material";
import { useParams, useSearchParams, Link as RouterLink } from "react-router-dom";
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DemoCodeArea from "../components/DemoCodeArea";
import DemoReviewMemo from "../components/DemoReviewMemo";
import { useDemoJudgmentResult } from "../hooks/useDemoJudgmentResult";
import { demoSolvedProblems } from "../demo/demoData";
import { useState } from "react";
import { JudgmentResult } from "../hooks/useJudgmentResult";
import { ReviewRatingForm } from "../components/ReviewRatingForm";
import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";

// Status color configuration (same as ReviewStatusSelect)
const statusStyles = {
    TO_DO: {
        backgroundColor: alpha('#78909c', 0.1),
        borderColor: '#78909c',
        color: '#455a64',
    },
    IN_PROGRESS: {
        backgroundColor: alpha('#2196f3', 0.1),
        borderColor: '#2196f3',
        color: '#1565c0',
    },
    COMPLETED: {
        backgroundColor: alpha('#4caf50', 0.1),
        borderColor: '#4caf50',
        color: '#2e7d32',
    },
    MASTERED: {
        backgroundColor: alpha('#9c27b0', 0.1),
        borderColor: '#9c27b0',
        color: '#6a1b9a',
    },
};

type ReviewStatus = 'TO_DO' | 'IN_PROGRESS' | 'COMPLETED' | 'MASTERED';

// Demo FavoriteButton
const DemoFavoriteButton = ({ reviewId }: { reviewId: number }) => {
    const problem = demoSolvedProblems.find(p => p.reviewId === reviewId);
    const [isFavorite, setIsFavorite] = useState(problem?.isFavorite || false);

    return (
        <IconButton 
            onClick={() => setIsFavorite(!isFavorite)} 
            color={isFavorite ? "primary" : "default"}
            sx={{ 
                border: '1px solid', 
                borderColor: 'divider', 
                borderRadius: '8px', 
                height: 55, 
                width: 55,
                backgroundColor: 'white',
            }}
        >
            {isFavorite ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </IconButton>
    );
};

// Demo ReviewStatusSelect
const DemoReviewStatusSelect = ({ reviewId }: { reviewId: number }) => {
    const problem = demoSolvedProblems.find(p => p.reviewId === reviewId);
    const [status, setStatus] = useState<ReviewStatus>(problem?.status || 'TO_DO');

    const handleChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value as ReviewStatus);
    };

    const currentStyle = statusStyles[status];

    return (
        <FormControl fullWidth>
            <Select
                value={status}
                onChange={handleChange}
                displayEmpty
                sx={{ 
                    height: 55,
                    backgroundColor: currentStyle.backgroundColor,
                    border: `2px solid ${currentStyle.borderColor}`,
                    borderRadius: '8px',
                    fontWeight: 600,
                    color: currentStyle.color,
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                    '&:hover': {
                        backgroundColor: alpha(currentStyle.borderColor, 0.15),
                    },
                    '& .MuiSelect-icon': {
                        color: currentStyle.color,
                    },
                }}
            >
                <MenuItem value="TO_DO" sx={{ color: statusStyles.TO_DO.color, fontWeight: 500 }}>
                    🔘 복습 대기
                </MenuItem>
                <MenuItem value="IN_PROGRESS" sx={{ color: statusStyles.IN_PROGRESS.color, fontWeight: 500 }}>
                    🔵 복습 중
                </MenuItem>
                <MenuItem value="COMPLETED" sx={{ color: statusStyles.COMPLETED.color, fontWeight: 500 }}>
                    ✅ 복습 완료
                </MenuItem>
                <MenuItem value="MASTERED" sx={{ color: statusStyles.MASTERED.color, fontWeight: 500 }}>
                    🌟 완벽히 이해
                </MenuItem>
            </Select>
        </FormControl>
    );
};

// Demo ReviewRatingForm
const DemoReviewRatingForm = ({ reviewId, isMobile }: { reviewId: number; isMobile: boolean }) => {
    const problem = demoSolvedProblems.find(p => p.reviewId === reviewId);
    const [difficulty, setDifficulty] = useState<number | null>(problem?.difficultyLevel || null);
    const [importance, setImportance] = useState<number | null>(problem?.importanceLevel || null);

    const handleSave = (diff: number | null, imp: number | null) => {
        setDifficulty(diff);
        setImportance(imp);
    };

    return (
        <ReviewRatingForm 
            isMobile={isMobile}
            difficulty={difficulty}
            importance={importance}
            onSave={handleSave}
        />
    );
};

// Demo ResultInfo
const DemoResultInfo = ({ problemTitle, result }: { problemTitle: string; result: JudgmentResult }) => {
    const { metaData } = result;
    return (
        <Paper sx={{ p: 2 }}>
            <Stack spacing={1}>
                <Typography variant="h6">
                    📊 {result.problemId}번: {problemTitle}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Chip
                        label={metaData.resultText}
                        color={metaData.resultText === '맞았습니다!!' ? 'success' : 'error'}
                        size="small"
                    />
                    <Typography variant="body2">메모리: {metaData.memory} KB</Typography>
                    <Typography variant="body2">시간: {metaData.time} ms</Typography>
                    <Typography variant="body2">언어: {metaData.language}</Typography>
                    <Typography variant="body2">코드 길이: {metaData.codeLength} B</Typography>
                    <Typography variant="body2">제출 시간: {new Date(metaData.submittedAt).toLocaleString()}</Typography>
                </Box>
            </Stack>
        </Paper>
    );
};

const DemoReviewPage = () => {
    const { reviewId } = useParams();
    const [searchParams] = useSearchParams();
    const solvedProblemId = searchParams.get("sp");
    const problemTitle = searchParams.get("problemTitle") || "";
    const theme = useTheme();
    const isMobile = useMediaQuery('(max-width:1200px)');

    const {
        judgmentResults,
        currentResultIndex,
        handlePrevious,
        handleNext,
    } = useDemoJudgmentResult(solvedProblemId);

    if (solvedProblemId === null || reviewId === undefined) {
        return <Typography>solvedProblemId가 없습니다.</Typography>;
    }

    const currentJudgment = judgmentResults[currentResultIndex];
    const appBarHeight = theme.mixins.toolbar.minHeight;

    // Demo Mode Alert
    const DemoModeAlert = () => (
        <Alert severity="info" sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip label="데모 모드" color="warning" size="small" icon={<PlayArrowIcon />} />
                <Typography variant="body2">
                    샘플 데이터로 복습 기능을 체험해보세요!
                </Typography>
            </Box>
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
    );

    // Navigation Header Component
    const NavigationHeader = () => (
        <Paper
            elevation={0}
            sx={{
                p: 1.5,
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: '12px',
            }}
        >
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
            }}>
                <Button
                    variant="text"
                    onClick={handlePrevious}
                    disabled={currentResultIndex === 0}
                    startIcon={<NavigateBeforeRoundedIcon />}
                    sx={{
                        color: 'text.secondary',
                        fontWeight: 500,
                        '&:hover': {
                            backgroundColor: alpha('#6366f1', 0.08),
                        },
                    }}
                >
                    최신
                </Button>

                <Box sx={{
                    px: 2,
                    py: 0.5,
                    borderRadius: '8px',
                    backgroundColor: alpha('#6366f1', 0.1),
                }}>
                    <Typography fontWeight={600} color="primary" sx={{ fontSize: '0.9rem' }}>
                        {judgmentResults.length > 0 ? `${currentResultIndex + 1} / ${judgmentResults.length}` : '0 / 0'}
                    </Typography>
                </Box>

                <Button
                    variant="text"
                    onClick={handleNext}
                    disabled={currentResultIndex === judgmentResults.length - 1 || judgmentResults.length === 0}
                    endIcon={<NavigateNextRoundedIcon />}
                    sx={{
                        color: 'text.secondary',
                        fontWeight: 500,
                        '&:hover': {
                            backgroundColor: alpha('#6366f1', 0.08),
                        },
                    }}
                >
                    과거
                </Button>
            </Box>
        </Paper>
    );

    // Sidebar Component
    const Sidebar = () => (
        <Stack spacing={2}>
            {/* Status Select & Favorite */}
            <Box sx={{ display: 'flex', gap: 1 }}>
                <DemoFavoriteButton reviewId={parseInt(reviewId)} />
                <Box sx={{ flex: 1 }}>
                    <DemoReviewStatusSelect reviewId={parseInt(reviewId)} />
                </Box>
            </Box>

            {/* Rating Form */}
            <DemoReviewRatingForm reviewId={parseInt(reviewId)} isMobile={false} />

            {/* Memo */}
            <DemoReviewMemo reviewId={parseInt(reviewId)} />
        </Stack>
    );

    return (
        <Container maxWidth="xl" sx={{ py: 2 }}>
            {!isMobile ? (
                <Grid2 container spacing={3}>
                    {/* Left Column - Code Area */}
                    <Grid2 size={8}>
                        <Box sx={{
                            height: `calc(90vh - ${appBarHeight}px)`,
                            overflowY: 'auto',
                            pr: 1,
                        }}>
                            <Fade in={true} timeout={400}>
                                <Stack spacing={2}>
                                    <DemoModeAlert />
                                    <NavigationHeader />
                                    {currentJudgment && (
                                        <DemoResultInfo
                                            problemTitle={problemTitle}
                                            result={currentJudgment}
                                        />
                                    )}
                                    <DemoCodeArea
                                        submissionId={currentJudgment?.submissionId || 101}
                                        reviewId={parseInt(reviewId)}
                                        language={currentJudgment?.metaData?.language || ''}
                                    />
                                </Stack>
                            </Fade>
                        </Box>
                    </Grid2>

                    {/* Right Column - Sidebar */}
                    <Grid2 size={4}>
                        <Box sx={{
                            height: `calc(90vh - ${appBarHeight}px)`,
                            overflowY: 'auto',
                            pl: 2,
                            borderLeft: '1px solid',
                            borderColor: 'divider',
                        }}>
                            <Fade in={true} timeout={400} style={{ transitionDelay: '100ms' }}>
                                <Box>
                                    <Sidebar />
                                </Box>
                            </Fade>
                        </Box>
                    </Grid2>
                </Grid2>
            ) : (
                /* Mobile Layout */
                <Fade in={true} timeout={400}>
                    <Stack spacing={2}>
                        <DemoModeAlert />
                        <NavigationHeader />
                        {currentJudgment && (
                            <DemoResultInfo
                                problemTitle={problemTitle}
                                result={currentJudgment}
                            />
                        )}
                        <DemoCodeArea
                            submissionId={currentJudgment?.submissionId || 101}
                            reviewId={parseInt(reviewId)}
                            language={currentJudgment?.metaData?.language || ''}
                        />
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <DemoFavoriteButton reviewId={parseInt(reviewId)} />
                            <Box sx={{ flex: 1 }}>
                                <DemoReviewStatusSelect reviewId={parseInt(reviewId)} />
                            </Box>
                        </Box>
                        <DemoReviewRatingForm reviewId={parseInt(reviewId)} isMobile={true} />
                        <DemoReviewMemo reviewId={parseInt(reviewId)} />
                    </Stack>
                </Fade>
            )}
        </Container>
    );
};

export default DemoReviewPage;
