import { Box, Button, CircularProgress, Container, Fade, Grid2, Paper, Stack, Typography, useMediaQuery, useTheme, alpha } from "@mui/material";
import ReviewMemo from "../components/ReviewMemo.tsx";
import { useParams, useSearchParams } from "react-router-dom";
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import CodeArea from "../components/CodeArea.tsx";
import { ReviewRatingForm } from "../components/ReviewRatingForm.tsx";
import { ReviewStatusChangeButton } from "../components/ReviewStautsChangeButton.tsx";
import { useReview } from "../hooks/useReview.ts";
import { useJudgmentResult } from "../hooks/useJudgmentResult.ts";
import TagSelection from "../components/TagUpdater.tsx";
import ResultInfo from "../components/GradingResultInfo.tsx";
import { FavoriteButton } from "../components/FavoriteButton.tsx";
import { ReviewStatusSelect } from "../components/ReviewStatusSelect.tsx";

const ReviewPage = () => {
    const { reviewId } = useParams();
    const [searchParams] = useSearchParams();
    const solvedProblemId = searchParams.get("sp");
    const problemTitle = searchParams.get("problemTitle") || "";
    const theme = useTheme();
    const isMobile = useMediaQuery('(max-width:1200px)');

    // Review 데이터 가져오기 - 한 번만 호출
    const {
        reviewData,
        content,
        sourceCode,
        loading: reviewLoading,
        updateMemo,
        updateCode,
        isFavorite,
        updateFavorite,
        updateStatus,
        difficulty,
        importance,
        handleSave,
        reviewed,
        reviewedAt,
        handleStatusChange,
    } = useReview(reviewId ? parseInt(reviewId) : 0);

    // Judgment 데이터 가져오기 (problemId 사용)
    const {
        judgmentResults,
        currentJudgment,
        currentResultIndex,
        loading: judgmentLoading,
        handlePrevious,
        handleNext,
    } = useJudgmentResult(reviewData?.problemId);

    if (!reviewId) {
        return <Typography>reviewId가 없습니다.</Typography>;
    }

    if (reviewLoading) {
        return (
            <Container maxWidth="xl" sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Container>
        );
    }

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

    // Current status for ReviewStatusSelect
    const currentStatus = reviewData?.status || 'TO_DO';

    // Sidebar Component
    const Sidebar = () => (
        <Stack spacing={2}>
            {/* Status Select & Favorite */}
            <Box sx={{ display: 'flex', gap: 1 }}>
                <FavoriteButton 
                    isFavorite={isFavorite} 
                    onToggle={updateFavorite} 
                />
                <Box sx={{ flex: 1 }}>
                    <ReviewStatusSelect 
                        status={currentStatus} 
                        onStatusChange={updateStatus} 
                    />
                </Box>
            </Box>

            {/* Rating Form */}
            <ReviewRatingForm 
                isMobile={false} 
                difficulty={difficulty}
                importance={importance}
                onSave={handleSave}
            />

            {/* Tags 태그 일단 주석화한다.*/}
            {/* {solvedProblemId && <TagSelection solvedProblemId={solvedProblemId} />} */}

            {/* Memo - 편집 가능 */}
            <ReviewMemo content={content} onUpdate={updateMemo} />
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
                                    {judgmentLoading ? (
                                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                                            <CircularProgress />
                                        </Box>
                                    ) : (
                                        <>
                                            {currentJudgment && (
                                                <ResultInfo
                                                    problemTitle={problemTitle}
                                                    result={currentJudgment}
                                                />
                                            )}
                                            <CodeArea
                                                originalCode={currentJudgment?.sourceCode}
                                                reviewCode={sourceCode}
                                                language={currentJudgment?.metaData?.language || ''}
                                                onUpdate={updateCode}
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
                        {judgmentLoading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <>
                                {currentJudgment && (
                                    <ResultInfo
                                        problemTitle={problemTitle}
                                        result={currentJudgment}
                                    />
                                )}
                                <CodeArea
                                    originalCode={currentJudgment?.sourceCode}
                                    reviewCode={sourceCode}
                                    language={currentJudgment?.metaData?.language || ''}
                                    onUpdate={updateCode}
                                />
                            </>
                        )}
                        <ReviewStatusChangeButton 
                            reviewed={reviewed ?? false}
                            reviewedAt={reviewedAt}
                            onStatusChange={handleStatusChange}
                        />
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <FavoriteButton 
                                isFavorite={isFavorite} 
                                onToggle={updateFavorite} 
                            />
                            <Box sx={{ flex: 1 }}>
                                <ReviewStatusSelect 
                                    status={currentStatus} 
                                    onStatusChange={updateStatus} 
                                />
                            </Box>
                        </Box>
                        <ReviewRatingForm 
                            isMobile={true} 
                            difficulty={difficulty}
                            importance={importance}
                            onSave={handleSave}
                        />
                        {solvedProblemId && <TagSelection solvedProblemId={solvedProblemId} />}
                        <ReviewMemo content={content} onUpdate={updateMemo} />
                    </Stack>
                </Fade>
            )}
        </Container>
    );
}

export default ReviewPage;
