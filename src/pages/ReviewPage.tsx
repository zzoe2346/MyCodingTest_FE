import { Box, Button, Fade, Grid2, Paper, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import ResultInfo from "../components/GradingResultInfo";
import ReviewMemo from "../components/ReviewMemo.tsx";
import { useParams, useSearchParams } from "react-router-dom";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
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

    return (
        <>
            {!isMobile ? (
                <Grid2 container spacing={0}>
                    <Grid2 size={8} sx={{
                        height: `calc(95vh - ${appBarHeight}px)`, // 수정: AppBar 높이 고려
                        padding: 2,
                        overflowY: "auto",
                        borderRight: "2px solid #ccc",
                    }}>
                        <Fade in={true} timeout={500}>
                            <Stack spacing={1}>
                                <Paper>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>

                                        {/*<Typography variant="body2">최신 제출 결과</Typography>*/}
                                        {/*<IconButton onClick={handlePrevious} disabled={currentResultIndex === 0}>*/}
                                        {/*    <NavigateBeforeIcon/>*/}
                                        {/*</IconButton>*/}
                                        {/*<Typography sx={{mx: 2}}>*/}
                                        {/*    {currentResultIndex + 1} / {judgmentResults.length}*/}
                                        {/*</Typography>*/}
                                        {/*<IconButton onClick={handleNext}*/}
                                        {/*            disabled={currentResultIndex === judgmentResults.length - 1}>*/}
                                        {/*    <NavigateNextIcon/>*/}
                                        {/*</IconButton>*/}
                                        {/*<Typography variant="body2">과거 제출 결과</Typography>*/}
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
                                        <ResultInfo problemTitle={problemTitle}
                                            result={currentJudgmentResult} />
                                        <CodeArea submissionId={currentJudgmentResult.submissionId}
                                            language={currentJudgmentResult.language} />
                                    </>
                                )}
                            </Stack>
                        </Fade>
                    </Grid2>

                    <Grid2 size={4} sx={{
                        height: `calc(95vh - ${appBarHeight}px)`, // 수정: AppBar 높이 고려
                        padding: 2,
                        borderLeft: "2px solid #ccc",
                        overflowY: "auto"
                    }}>
                        <Fade in={true} timeout={500} style={{ transitionDelay: '0ms' }}>
                            <Stack spacing={1}>
                                <Grid2 container spacing={1}>
                                    <Grid2 size={10.5}>
                                        <ReviewStatusChangeButton reviewId={parseInt(reviewId)} />
                                    </Grid2>
                                    <Grid2 size={1.5}>
                                        <DeleteButton solvedProblemId={solvedProblemId} />
                                    </Grid2>
                                </Grid2>
                                <ReviewRatingForm isMobile={false} reviewId={parseInt(reviewId)}></ReviewRatingForm>
                                <TagSelection solvedProblemId={solvedProblemId}></TagSelection>
                                <ReviewMemo reviewId={parseInt(reviewId)} />
                            </Stack>
                        </Fade>
                    </Grid2>
                </Grid2>
            ) : (
                <Stack spacing={2} padding={1}>
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
                            <ResultInfo problemTitle={problemTitle}
                                result={currentJudgmentResult} />
                            <CodeArea submissionId={currentJudgmentResult.submissionId}
                                language={currentJudgmentResult.language} />
                        </>
                    )}
                    <Grid2 container spacing={1}>
                        <Grid2 size={10.5}>
                            <ReviewStatusChangeButton reviewId={parseInt(reviewId)} />
                        </Grid2>
                        <Grid2 size={1.5}>
                            <DeleteButton solvedProblemId={solvedProblemId} />
                        </Grid2>
                    </Grid2>
                    <ReviewRatingForm isMobile={true} reviewId={parseInt(reviewId)}></ReviewRatingForm>
                    <TagSelection solvedProblemId={solvedProblemId}></TagSelection>
                    <ReviewMemo reviewId={parseInt(reviewId)} />
                </Stack>
            )}
        </>

    );

}

export default ReviewPage;
