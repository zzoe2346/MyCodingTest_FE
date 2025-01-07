import {Grid2} from "@mui/material";
import CodeArea from "../components/CodeArea";
import ResultInfo from "../components/GradingResultInfo";
import WriteArea from "../components/WriteArea";

const resultData = {
    "submissionId": "87819421",
    "userId": "zzoe2346",
    "problemId": "2698",
    "resultText": "맞았습니다!!",
    "memory": "42540",
    "time": "204",
    "language": "Java 11",
    "codeLength": "1332",
    "submittedAt": "2024년 12월 26일 12:47:20"
};

const Review = () => {
    return (<Grid2 container spacing={2} style={{height: '100vh'}}>

            {/* 좌측 코드 영역 */}
            <Grid2 size={8} sx={{pl: 2, pr: 1, pt: 2, pb: 10}}>
                <CodeArea/>
            </Grid2>

            {/* 우측 영역 */}
            <Grid2 size={4} sx={{pl: 1, pr: 2, pt: 2, pb: 10}}>
                {/* ResultInfo와 WriteArea를 감싸는 새로운 Grid2 컨테이너 */}
                <Grid2 container spacing={2}>
                    {/* ResultInfo 영역 */}
                    <Grid2 size={12}>
                        {/* 여기에 ResultInfo 컴포넌트 배치 */}
                        <ResultInfo result={resultData}/> {/* resultData는 props 또는 state로 전달 */}
                    </Grid2>
                    {/* WriteArea 영역 */}
                    <Grid2 size={12}>
                        <WriteArea/>
                    </Grid2>
                </Grid2>
            </Grid2>
        </Grid2>


    );


}
export default Review;
