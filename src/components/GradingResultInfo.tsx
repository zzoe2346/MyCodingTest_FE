import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Chip,
    Link,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography
} from '@mui/material';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { JudgmentResult } from "../pages/ReviewPage.tsx";
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

const ResultInfo = ({ result, problemTitle }: { result: JudgmentResult, problemTitle: string }) => {

    if (!result) {
        return null;
    }

    return (
        <>
            <Paper
                elevation={0}
                sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: '12px',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                    <Typography variant="h5" fontWeight={600}>
                        <Link
                            href={`https://www.acmicpc.net/problem/${result.problemId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                textDecoration: 'none',
                                color: 'inherit',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 0.5,
                                '&:hover': {
                                    color: 'primary.main',
                                }
                            }}
                        >
                            {problemTitle}
                            <OpenInNewRoundedIcon fontSize="small" sx={{ opacity: 0.6 }} />
                        </Link>
                    </Typography>
                    <Chip
                        label={result.resultText}
                        color={result.resultText === '맞았습니다!!' ? 'success' : 'error'}
                        sx={{
                            fontWeight: 600,
                            borderRadius: '8px',
                            px: 1,
                        }}
                    />
                </Box>
            </Paper>

            <Accordion
                elevation={0}
                sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: '12px !important',
                    '&:before': { display: 'none' },
                    overflow: 'hidden',
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreRoundedIcon />}
                    sx={{
                        backgroundColor: 'background.default',
                        '&:hover': {
                            backgroundColor: 'action.hover',
                        }
                    }}
                >
                    <Typography variant="subtitle1" fontWeight={500} color="text.secondary">
                        채점 결과 자세히 보기
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0 }}>
                    <Table size="small">
                        <TableBody>
                            {[
                                { label: '제출 번호', value: result.submissionId, link: `https://www.acmicpc.net/submit/${result.problemId}/${result.submissionId}` },
                                { label: '백준 ID', value: result.baekjoonId, link: `https://www.acmicpc.net/user/${result.baekjoonId}` },
                                { label: '문제 번호', value: result.problemId, link: `https://www.acmicpc.net/problem/${result.problemId}` },
                                { label: '결과', value: result.resultText },
                                { label: '메모리', value: `${result.memory} KB` },
                                { label: '시간', value: `${result.time} ms` },
                                { label: '언어', value: result.language },
                                { label: '코드 길이', value: `${result.codeLength} B` },
                                { label: '제출 시간', value: result.submittedAt },
                            ].map((row, index) => (
                                <TableRow
                                    key={row.label}
                                    sx={{
                                        '&:last-child td': { borderBottom: 0 },
                                        backgroundColor: index % 2 === 0 ? 'transparent' : 'action.hover',
                                    }}
                                >
                                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', width: '40%' }}>
                                        {row.label}
                                    </TableCell>
                                    <TableCell>
                                        {row.link ? (
                                            <Link
                                                href={row.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {row.value}
                                            </Link>
                                        ) : row.value}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default ResultInfo;