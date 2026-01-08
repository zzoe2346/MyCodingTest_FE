import { Box, Button, Container, Fade, Grid2, Paper, Stack, Typography, useMediaQuery, useTheme, alpha } from "@mui/material";
import ResultInfo from "../components/GradingResultInfo";
import ReviewMemo from "../components/ReviewMemo.tsx";
import { useParams, useSearchParams } from "react-router-dom";
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import CodeArea from "../components/CodeArea.tsx";
import { ReviewRatingForm } from "../components/ReviewRatingForm.tsx";
import { ReviewStatusChangeButton } from "../components/ReviewStautsChangeButton.tsx";
import { useJudgmentResult } from "../hooks/useJudgmentResult.ts";
import TagSelection from "../components/TagUpdater.tsx";
import DeleteButton from "../components/DeleteButton.tsx";

export interface JudgmentResult {
    submissionId: number;
    baekjoonId: string;
    problemId: number;
    resultText: string;
    memory: number;
    time: number;
    language: string;
    codeLength: number;
    submittedAt: string;
    problemTitle: string;
    judgmentResultId: number;
}

const ReviewPage = () => {
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
    } = useJudgmentResult(solvedProblemId);

    if (solvedProblemId === null || reviewId === undefined) {
        return <Typography>solvedProblemId가 없습니다.</Typography>;
    }

    const currentJudgmentResult = judgmentResults[currentResultIndex];
    const appBarHeight = theme.mixins.toolbar.minHeight;

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
                        '&.Mui-disabled': {
                            color: 'text.disabled',
                        }
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
                        {currentResultIndex + 1} / {judgmentResults.length}
                    </Typography>
                </Box>

                <Button
                    variant="text"
                    onClick={handleNext}
                    disabled={currentResultIndex === judgmentResults.length - 1}
                    endIcon={<NavigateNextRoundedIcon />}
                    sx={{
                        color: 'text.secondary',
                        fontWeight: 500,
                        '&:hover': {
                            backgroundColor: alpha('#6366f1', 0.08),
                        },
                        '&.Mui-disabled': {
                            color: 'text.disabled',
                        }
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
            {/* Status & Delete */}
            <Box sx={{ display: 'flex', gap: 1 }}>
                <Box sx={{ flex: 1 }}>
                    <ReviewStatusChangeButton reviewId={parseInt(reviewId)} />
                </Box>
                <DeleteButton solvedProblemId={solvedProblemId} />
            </Box>

            {/* Rating Form */}
            <ReviewRatingForm isMobile={false} reviewId={parseInt(reviewId)} />

            {/* Tags */}
            <TagSelection solvedProblemId={solvedProblemId} />

            {/* Memo */}
            <ReviewMemo reviewId={parseInt(reviewId)} />
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
                                    <NavigationHeader />
                                    {currentJudgmentResult && (
                                        <>
                                            <ResultInfo
                                                problemTitle={problemTitle}
                                                result={currentJudgmentResult}
                                            />
                                            <CodeArea
                                                submissionId={currentJudgmentResult.submissionId}
                                                language={currentJudgmentResult.language}
                                            />
                                        </>
                                    )}
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
                        <NavigationHeader />
                        {currentJudgmentResult && (
                            <>
                                <ResultInfo
                                    problemTitle={problemTitle}
                                    result={currentJudgmentResult}
                                />
                                <CodeArea
                                    submissionId={currentJudgmentResult.submissionId}
                                    language={currentJudgmentResult.language}
                                />
                            </>
                        )}
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Box sx={{ flex: 1 }}>
                                <ReviewStatusChangeButton reviewId={parseInt(reviewId)} />
                            </Box>
                            <DeleteButton solvedProblemId={solvedProblemId} />
                        </Box>
                        <ReviewRatingForm isMobile={true} reviewId={parseInt(reviewId)} />
                        <TagSelection solvedProblemId={solvedProblemId} />
                        <ReviewMemo reviewId={parseInt(reviewId)} />
                    </Stack>
                </Fade>
            )}
        </Container>
    );
}

export default ReviewPage;
