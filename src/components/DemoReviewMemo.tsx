import { useState, useEffect } from 'react';
import { Paper, TextField, Button, Stack, Typography, CircularProgress } from '@mui/material';
import { demoMemos } from '../demo/demoData';

interface DemoReviewMemoProps {
    reviewId: number;
}

function DemoReviewMemo({ reviewId }: DemoReviewMemoProps) {
    const [memo, setMemo] = useState("");
    const [originalMemo, setOriginalMemo] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        // Simulate loading delay
        setTimeout(() => {
            const mockMemo = demoMemos[reviewId] || "";
            setMemo(mockMemo);
            setOriginalMemo(mockMemo);
            setIsLoading(false);
        }, 300);
    }, [reviewId]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        // In demo mode, just update local state
        setOriginalMemo(memo);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setMemo(originalMemo);
        setIsEditing(false);
    };

    if (isLoading) {
        return (
            <Paper sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress size={24} />
            </Paper>
        );
    }

    return (
        <Paper sx={{ p: 2 }}>
            <Stack spacing={2}>
                <Typography variant="h6">📝 메모</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    📌 데모 모드: 메모 수정은 임시로만 저장됩니다
                </Typography>
                {!isEditing ? (
                    <>
                        <Button variant="outlined" onClick={handleEdit} size="small">
                            메모 수정
                        </Button>
                        {memo ? (
                            <Typography
                                component="pre"
                                sx={{
                                    whiteSpace: 'pre-wrap',
                                    fontFamily: 'inherit',
                                    backgroundColor: '#f5f5f5',
                                    p: 2,
                                    borderRadius: 1
                                }}
                            >
                                {memo}
                            </Typography>
                        ) : (
                            <Typography color="text.secondary">
                                아직 메모가 없습니다. 메모를 추가해보세요!
                            </Typography>
                        )}
                    </>
                ) : (
                    <>
                        <Stack direction="row" spacing={1}>
                            <Button variant="contained" onClick={handleSave} size="small">
                                저장
                            </Button>
                            <Button variant="outlined" onClick={handleCancel} size="small">
                                취소
                            </Button>
                        </Stack>
                        <TextField
                            value={memo}
                            onChange={(e) => setMemo(e.target.value)}
                            multiline
                            rows={10}
                            placeholder="복습 메모를 작성해보세요..."
                            fullWidth
                        />
                    </>
                )}
            </Stack>
        </Paper>
    );
}

export default DemoReviewMemo;
