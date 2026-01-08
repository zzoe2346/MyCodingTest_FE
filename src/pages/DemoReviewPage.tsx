import { Box, Button, Chip, Fade, Grid2, Paper, Stack, Typography, useMediaQuery, useTheme, Alert, Rating } from "@mui/material";
import { useParams, useSearchParams, Link as RouterLink } from "react-router-dom";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DemoCodeArea from "../components/DemoCodeArea";
import DemoReviewMemo from "../components/DemoReviewMemo";
import { useDemoJudgmentResult } from "../hooks/useDemoJudgmentResult";
import { demoSolvedProblems } from "../demo/demoData";
import { useState } from "react";

// Demo version of ReviewRatingForm
const DemoReviewRatingForm = ({ reviewId }: { reviewId: number }) => {
    const problem = demoSolvedProblems.find(p => p.reviewId === reviewId);
    const [difficulty, setDifficulty] = useState(problem?.difficultyLevel || 0);
    const [importance, setImportance] = useState(problem?.importanceLevel || 0);

    return (
        <Paper sx={{ p: 2 }}>
            <Stack spacing={2}>
                <Typography variant="h6">⭐ 평가</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    📌 데모 모드: 평가 변경은 임시로만 저장됩니다
                </Typography>
                <Box>
                    <Typography variant="body2">체감 난이도</Typography>
                    <Rating
                        value={difficulty}
                        onChange={(_, newValue) => setDifficulty(newValue || 0)}
                    />
                </Box>
                <Box>
                    <Typography variant="body2">재복습 필요도</Typography>
                    <Rating
                        value={importance}
                        onChange={(_, newValue) => setImportance(newValue || 0)}
                    />
                </Box>
            </Stack>
        </Paper>
    );
};

// Demo version of ResultInfo
const DemoResultInfo = ({
    problemTitle,
    result
}: {
    problemTitle: string;
    result: {
        resultText: string;
        memory: number;
        time: number;
        language: string;
        codeLength: number;
        submittedAt: string;
        problemId: number;
    }
}) => {
    return (
        <Paper sx={{ p: 2 }}>
            <Stack spacing={1}>
                <Typography variant="h6">
                    📊 {result.problemId}번: {problemTitle}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Chip
                        label={result.resultText}
                        color={result.resultText === '맞았습니다!!' ? 'success' : 'error'}
                        size="small"
                    />
                    <Typography variant="body2">메모리: {result.memory} KB</Typography>
                    <Typography variant="body2">시간: {result.time} ms</Typography>
                    <Typography variant="body2">언어: {result.language}</Typography>
                    <Typography variant="body2">코드 길이: {result.codeLength} B</Typography>
                    <Typography variant="body2">제출 시간: {new Date(result.submittedAt).toLocaleString()}</Typography>
                </Box>
            </Stack>
        </Paper>
    );
};

// Demo version of ReviewStatusChangeButton
const DemoReviewStatusChangeButton = ({ reviewId }: { reviewId: number }) => {
    const problem = demoSolvedProblems.find(p => p.reviewId === reviewId);
    const [isReviewed, setIsReviewed] = useState(problem?.isReviewed || false);

    return (
        <Paper sx={{ p: 2 }}>
            {isReviewed ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography color="success.main" fontWeight="bold">✅ 복습 완료</Typography>
                </Box>
            ) : (
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => setIsReviewed(true)}
                >
                    복습 완료로 표시
                </Button>
            )}
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

    const currentJudgmentResult = judgmentResults[currentResultIndex];

    const appBarHeight = theme.mixins.toolbar.minHeight;

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

    return (
        <>
            {!isMobile ? (
                <Grid2 container spacing={0}>
                    <Grid2 size={8} sx={{
                        height: `calc(95vh - ${appBarHeight}px)`,
                        padding: 2,
                        overflowY: "auto",
                        borderRight: "2px solid #ccc",
                    }}>
                        <Fade in={true} timeout={500}>
                            <Stack spacing={1}>
                                <DemoModeAlert />
                                <Paper>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Button
                                            variant="text"
                                            onClick={handlePrevious}
                                            disabled={currentResultIndex === 0}
                                            startIcon={<NavigateBeforeIcon />}
                                        >
                                            최신 제출 결과
                                        </Button>

                                        <Typography sx={{ mx: 2 }}>
                                            {currentResultIndex + 1} / {judgmentResults.length}
                                        </Typography>

                                        <Button
                                            variant="text"
                                            onClick={handleNext}
                                            disabled={currentResultIndex === judgmentResults.length - 1}
                                            endIcon={<NavigateNextIcon />}
                                        >
                                            과거 제출 결과
                                        </Button>
                                    </Box>
                                </Paper>
                                {currentJudgmentResult && (
                                    <>
                                        <DemoResultInfo
                                            problemTitle={problemTitle}
                                            result={currentJudgmentResult}
                                        />
                                        <DemoCodeArea
                                            submissionId={currentJudgmentResult.submissionId}
                                            language={currentJudgmentResult.language}
                                        />
                                    </>
                                )}
                            </Stack>
                        </Fade>
                    </Grid2>

                    <Grid2 size={4} sx={{
                        height: `calc(95vh - ${appBarHeight}px)`,
                        padding: 2,
                        borderLeft: "2px solid #ccc",
                        overflowY: "auto"
                    }}>
                        <Fade in={true} timeout={500} style={{ transitionDelay: '0ms' }}>
                            <Stack spacing={1}>
                                <DemoReviewStatusChangeButton reviewId={parseInt(reviewId)} />
                                <DemoReviewRatingForm reviewId={parseInt(reviewId)} />
                                <DemoReviewMemo reviewId={parseInt(reviewId)} />
                            </Stack>
                        </Fade>
                    </Grid2>
                </Grid2>
            ) : (
                <Stack spacing={2} padding={1}>
                    <DemoModeAlert />
                    <Paper>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Button
                                variant="text"
                                onClick={handlePrevious}
                                disabled={currentResultIndex === 0}
                                startIcon={<NavigateBeforeIcon />}
                            >
                                최신 제출
                            </Button>

                            <Typography sx={{ mx: 2 }}>
                                {currentResultIndex + 1} / {judgmentResults.length}
                            </Typography>

                            <Button
                                variant="text"
                                onClick={handleNext}
                                disabled={currentResultIndex === judgmentResults.length - 1}
                                endIcon={<NavigateNextIcon />}
                            >
                                과거 제출
                            </Button>
                        </Box>
                    </Paper>
                    {currentJudgmentResult && (
                        <>
                            <DemoResultInfo
                                problemTitle={problemTitle}
                                result={currentJudgmentResult}
                            />
                            <DemoCodeArea
                                submissionId={currentJudgmentResult.submissionId}
                                language={currentJudgmentResult.language}
                            />
                        </>
                    )}
                    <DemoReviewStatusChangeButton reviewId={parseInt(reviewId)} />
                    <DemoReviewRatingForm reviewId={parseInt(reviewId)} />
                    <DemoReviewMemo reviewId={parseInt(reviewId)} />
                </Stack>
            )}
        </>
    );
};

export default DemoReviewPage;
