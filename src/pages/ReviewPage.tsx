import {Alert, Grid2, IconButton, Paper, Stack, Typography, useTheme} from "@mui/material";
import ResultInfo from "../components/GradingResultInfo";
import ReviewMemo from "../components/ReviewMemo.tsx";
import {useLocation, useParams} from "react-router-dom";
import {SolvedProblemWithReview} from "../hooks/types.ts";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CodeArea from "../components/CodeArea.tsx";
import {ReviewRatingForm} from "../components/ReviewRatingForm.tsx";
import {ReviewStatusChangeButton} from "../components/ReviewStautsChangeButton.tsx";
import {useJudgmentResult} from "../hooks/useJudgmentResult.ts";
import TagSelection from "../components/TagSelection.tsx";

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
    const location = useLocation();
    const {solvedProblemId} = useParams<{ solvedProblemId: string }>();
    const {problemData} = (location.state as { problemData: SolvedProblemWithReview }) || {};
    const {
        judgmentResults,
        currentResultIndex,
        handlePrevious,
        handleNext,
    } = useJudgmentResult(solvedProblemId);


    // const [judgmentResults, setJudgmentResults] = useState<JudgmentResult[]>([]);
    // const [currentResultIndex, setCurrentResultIndex] = useState(0); // 현재 선택된 채점 결과 인덱스
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState<string | null>(null);


    const currentJudgmentResult = judgmentResults[currentResultIndex];
    const theme = useTheme();
    const appBarHeight = theme.mixins.toolbar.minHeight; // AppBar의 최소 높이
    const gridHeight = `calc(100vh - ${appBarHeight}px)`; // 뷰포트 높이에서 AppBar 높이를 뺀 값

    if (solvedProblemId === undefined) {
        return <div>solvedProblemId가 없습니다.</div>; // 에러 메시지 또는 다른 적절한 처리
    }
    return (
        <Grid2 container spacing={2} style={{height: '100vh'}}>
            <Grid2 size={8} sx={{
                height: gridHeight,
                pl: 2,
                pr: 1,
                pt: 2,
                pb: 10,
                overflowY: "auto",
                borderRight: "1px solid #ccc"
            }}>
                <Stack spacing={1}>
                    <Paper>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 2}}>
                            <IconButton onClick={handlePrevious} disabled={currentResultIndex === 0}>
                                <NavigateBeforeIcon/>
                            </IconButton>
                            <Typography sx={{mx: 2}}>
                                {currentResultIndex + 1} / {judgmentResults.length}
                            </Typography>
                            <IconButton onClick={handleNext}
                                        disabled={currentResultIndex === judgmentResults.length - 1}>
                                <NavigateNextIcon/>
                            </IconButton>
                        </div>
                    </Paper>
                    {currentJudgmentResult &&
                        (<>
                                <ResultInfo problemTitle={problemData.problemTitle} result={currentJudgmentResult}/>
                                <CodeArea judgmentResultId={currentJudgmentResult.judgmentResultId}
                                          language={currentJudgmentResult.language}/>
                            </>

                        )
                    }

                </Stack>
            </Grid2>

            <Grid2 size={4} sx={{height: gridHeight, pl: 1, pr: 2, pt: 2, pb: 10, overflowY: "auto"}}>
                <Stack spacing={1}>
                    <Paper>
                        <Alert variant="filled" severity="info">
                            방가방가
                        </Alert>
                    </Paper>
                    <ReviewStatusChangeButton reviewId={problemData.reviewId}/>
                    <ReviewRatingForm reviewId={problemData.reviewId}></ReviewRatingForm>
                    <TagSelection></TagSelection>
                    <ReviewMemo reviewId={problemData.reviewId}/>
                </Stack>
            </Grid2>
        </Grid2>
    )
        ;


}
export default ReviewPage;
