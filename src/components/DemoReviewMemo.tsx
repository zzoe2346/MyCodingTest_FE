import { Box, Paper, Stack, Typography, Button, TextField, IconButton } from "@mui/material";
import ReactMarkdown from 'react-markdown';
import { useState, useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { demoMemos } from '../demo/demoData';

interface DemoReviewMemoProps {
    reviewId: number;
}

function DemoReviewMemo({ reviewId }: DemoReviewMemoProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState("");
    const [tempContent, setTempContent] = useState("");

    useEffect(() => {
        const mockMemo = demoMemos[reviewId] || "";
        setContent(mockMemo);
        setTempContent(mockMemo);
    }, [reviewId]);

    const handleSave = () => {
        setContent(tempContent);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setTempContent(content);
        setIsEditing(false);
    };

    return (
        <Paper style={{ minHeight: 200 }}>
            <Stack spacing={0.5} sx={{ p: 2 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Box>
                        <Typography variant="h6">
                            메모
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            markdown 지원 · 📌 데모 모드
                        </Typography>
                    </Box>
                    {!isEditing && (
                        <IconButton onClick={() => setIsEditing(true)} size="small">
                            <EditIcon />
                        </IconButton>
                    )}
                </Stack>

                <Box style={{ minHeight: 150 }}>
                    {isEditing ? (
                        <Stack spacing={2}>
                            <TextField
                                multiline
                                minRows={6}
                                fullWidth
                                value={tempContent}
                                onChange={(e) => setTempContent(e.target.value)}
                                placeholder="메모를 입력하세요..."
                            />
                            <Stack direction="row" spacing={1} justifyContent="flex-end">
                                <Button variant="outlined" onClick={handleCancel}>취소</Button>
                                <Button variant="contained" onClick={handleSave}>저장</Button>
                            </Stack>
                        </Stack>
                    ) : (
                        <Box>
                            {content ? (
                                <ReactMarkdown>{content}</ReactMarkdown>
                            ) : (
                                <Typography color="text.secondary" sx={{ fontStyle: 'italic' }}>
                                    작성된 메모가 없습니다
                                </Typography>
                            )}
                        </Box>
                    )}
                </Box>
            </Stack>
        </Paper>
    );
}

export default DemoReviewMemo;
