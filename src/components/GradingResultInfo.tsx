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
import { Judgment } from "../hooks/useJudgmentResult";
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

const ResultInfo = ({ result, problemTitle }: { result: Judgment, problemTitle: string }) => {

    if (!result) {
        return null;
    }

    const meta = result.metaData;
    const resultText = meta?.resultText || (result.status === 'SUCCESS' ? '맞았습니다!!' : result.status === 'FAIL' ? '틀렸습니다' : '컴파일 에러');

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
                        label={resultText}
                        color={result.status === 'SUCCESS' ? 'success' : 'error'}
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
                                ...(meta?.baekjoonId ? [{ label: '백준 ID', value: meta.baekjoonId, link: `https://www.acmicpc.net/user/${meta.baekjoonId}` }] : []),
                                { label: '문제 번호', value: result.problemId, link: `https://www.acmicpc.net/problem/${result.problemId}` },
                                { label: '결과', value: resultText },
                                { label: '상태', value: result.status },
                                { label: '플랫폼', value: result.platform },
                                ...(meta?.memory !== undefined ? [{ label: '메모리', value: `${meta.memory} KB` }] : []),
                                ...(meta?.time !== undefined ? [{ label: '시간', value: `${meta.time} ms` }] : []),
                                ...(meta?.language ? [{ label: '언어', value: meta.language }] : []),
                                ...(meta?.codeLength !== undefined ? [{ label: '코드 길이', value: `${meta.codeLength} B` }] : []),
                                ...(meta?.submittedAt ? [{ label: '제출 시간', value: new Date(meta.submittedAt).toLocaleString() }] : []),
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
                                        {'link' in row && row.link ? (
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