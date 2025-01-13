import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Chip,
    Link,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {JudgmentResult} from "../pages/ReviewPage.tsx";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const ResultInfo = ({result, problemTitle}: { result: JudgmentResult, problemTitle: string }) => {

    if (!result) {
        return null;
    }

    return (
        <>
            <Paper style={{padding: 10, marginBottom: 10}}>
                <Typography variant="h6" gutterBottom>
                    <Link
                        href={`https://www.acmicpc.net/problem/${result.problemId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{textDecoration: 'none', color: 'inherit'}}
                    >
                        {problemTitle}
                        <OpenInNewIcon
                            fontSize="small"
                            // sx={{
                            //     position: 'absolute', // 아이콘을 절대 위치로 설정
                            //     top: 0, // 부모 요소의 상단에 위치
                            //     right: 0, // 부모 요소의 우측에 위치
                            // }}
                        />
                    </Link>
                </Typography>
                <Chip
                    label={result.resultText}
                    color={result.resultText === '맞았습니다!!' ? 'success' : 'error'}
                    style={{marginTop: 5}}
                />

            </Paper>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography variant="subtitle1">
                        채점 결과 자세히 보기
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Table size="small">
                        <TableBody>
                            <TableRow>
                                <TableCell><b>제출 번호</b></TableCell>
                                <TableCell>{result.submissionId}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><b>백준 ID</b></TableCell>
                                <TableCell>
                                    <Link
                                        href={`https://www.acmicpc.net/user/${result.baekjoonId}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {result.baekjoonId}
                                    </Link>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><b>문제 번호</b></TableCell>
                                <TableCell>
                                    <Link
                                        href={`https://www.acmicpc.net/problem/${result.problemId}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {result.problemId}
                                    </Link>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><b>결과</b></TableCell>
                                <TableCell>{result.resultText}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><b>메모리</b></TableCell>
                                <TableCell>{result.memory} KB</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><b>시간</b></TableCell>
                                <TableCell>{result.time} ms</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><b>언어</b></TableCell>
                                <TableCell>{result.language}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><b>코드 길이</b></TableCell>
                                <TableCell>{result.codeLength} B</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><b>제출 시간</b></TableCell>
                                <TableCell>{result.submittedAt}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </AccordionDetails>
            </Accordion>
        </>


    );
};


export default ResultInfo;