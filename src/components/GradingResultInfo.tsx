import { Paper, Typography, Link, Chip, IconButton, Collapse } from '@mui/material';
import { useState } from 'react';

// ResultInfo 컴포넌트
interface Result {
    submissionId: string;
    userId: string;
    problemId: string;
    resultText: string;
    memory: string;
    time: string;
    language: string;
    codeLength: string;
    submittedAt: string;
}

const ResultInfo = ({ result }: { result: Result }) => {

    const [showDetails, setShowDetails] = useState(true); // 초기 상태는 정보를 보이도록 설정
    const handleToggleDetails = () => {
        setShowDetails(!showDetails);
    };
    if (!result) {
        return null; // result 데이터가 없으면 아무것도 렌더링하지 않음
    }

    return (
        <Paper style={{ padding: 10 }}>
            <Typography variant="h6" gutterBottom>
                채점 결과
                <IconButton onClick={handleToggleDetails} size="small" style={{ marginLeft: 10 }}>
                    자세히
                </IconButton>
            </Typography>
            {/* 나머지 정보는 Collapse 컴포넌트로 감싸기 */}
            <Collapse in={showDetails}>
                {/* ... (나머지 정보 표시 코드) ... */}
                {/* 제출 ID */}
                <Typography variant="body1">
                    <b>제출 번호:</b> {result.submissionId}
                </Typography>

                {/* 사용자 ID */}
                <Typography variant="body1">
                    <b>사용자:</b>{' '}
                    <Link href={result.userId} target="_blank" rel="noopener noreferrer">
                        {result.userId.split('/').pop()}
                    </Link>
                </Typography>

                {/* 문제 ID */}
                <Typography variant="body1">
                    <b>문제:</b>{' '}
                    <Link href={result.problemId} target="_blank" rel="noopener noreferrer">
                        {result.problemId.split('/').pop()}
                    </Link>
                </Typography>

                {/* 결과 */}
                <Typography variant="body1" style={{ marginBottom: 10 }}>
                    <b>결과:</b> <Chip label={result.resultText} color={result.resultText === '맞았습니다!!' ? 'success' : 'error'} />
                </Typography>

                {/* 메모리 */}
                <Typography variant="body1">
                    <b>메모리:</b> {result.memory} KB
                </Typography>

                {/* 시간 */}
                <Typography variant="body1">
                    <b>시간:</b> {result.time} ms
                </Typography>

                {/* 언어 */}
                <Typography variant="body1">
                    <b>언어:</b> {result.language}
                </Typography>

                {/* 코드 길이 */}
                <Typography variant="body1">
                    <b>코드 길이:</b> {result.codeLength} B
                </Typography>

                {/* 제출 시간 */}
                <Typography variant="body1">
                    <b>제출 시간:</b> {result.submittedAt}
                </Typography>
            </Collapse>

        </Paper>
    );
};



export default ResultInfo;