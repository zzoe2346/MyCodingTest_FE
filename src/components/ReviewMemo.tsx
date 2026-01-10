import { Box, Paper, Stack, Typography } from "@mui/material";
import ReactMarkdown from 'react-markdown';

interface ReviewMemoProps {
    content: string;
}

function ReviewMemo({ content }: ReviewMemoProps) {
    return (
        <Paper style={{ minHeight: 200 }}>
            <Stack spacing={0.5}>
                <Typography variant="h6">
                    메모
                </Typography>
                <Typography variant="caption" gutterBottom sx={{ marginTop: 0, color: 'text.secondary' }}>
                    markdown 지원
                </Typography>

                <Box style={{ padding: 10, minHeight: 150 }}>
                    {content ? (
                        <ReactMarkdown>{content}</ReactMarkdown>
                    ) : (
                        <Typography color="text.secondary" sx={{ fontStyle: 'italic' }}>
                            작성된 메모가 없습니다
                        </Typography>
                    )}
                </Box>
            </Stack>
        </Paper>
    );
}

export default ReviewMemo;