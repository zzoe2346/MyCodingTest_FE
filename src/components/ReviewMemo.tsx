import {Box, Button, Paper, Stack, TextField, Typography} from "@mui/material";
import {SetStateAction, useEffect, useState} from "react";
import ReactMarkdown from 'react-markdown';
import useReviewMemo from "../hooks/useReviewMemo.ts";
import {useSnackbar} from "notistack";

interface ReviewMemoProps {
    reviewId: number;
}

function ReviewMemo({reviewId}: ReviewMemoProps) {
    const [content, setContent] = useState("");
    const [originalContent, setOriginalContent] = useState(""); // 원본 내용 저장
    const [isEditing, setIsEditing] = useState(false);
    const {memo, isLoading, fetchMemo, saveMemo} = useReviewMemo();
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        if (reviewId) {
            fetchMemo(reviewId);
        }
    }, [fetchMemo, reviewId]);

    useEffect(() => {
        if (memo) {
            setContent(memo);
            setOriginalContent(memo); // 처음 로드될 때 원본 내용 설정
        } else {
            setContent("");
            setOriginalContent("");
        }
    }, [memo]);

    const handleSave = async () => {
        await saveMemo(reviewId, content);
        enqueueSnackbar('메모 저장 완료!', {variant: 'success'});
        setIsEditing(false);
        setOriginalContent(content); // 저장 후 원본 내용 업데이트
    };

    const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setContent(event.target.value);
    };

    const handleToggleMode = () => {
        setIsEditing(!isEditing);
        if (!isEditing) {
            enqueueSnackbar('작성 완료 후 "저장" 버튼을 클릭해야지 서버에 저장이 됩니다.', {variant: 'info'});
        }
    };

    const handleCancel = () => {
        setContent(originalContent);
        setIsEditing(false);
    };

    return (
        <Paper style={{minHeight: 400}}>
            <Stack spacing={0.5}>
                <Typography variant="h6">
                    메모
                </Typography>
                <Typography variant="caption" gutterBottom sx={{marginTop: 0}}>
                    markdown 지원, 작성 완료 후 꼭 "저장" 버튼 눌러주세요
                </Typography>
                {!isEditing ? (
                    <Button variant="outlined" onClick={handleToggleMode}>메모 수정</Button>
                ) : (
                    <>
                        <Button
                            onClick={handleSave}
                            variant="outlined"
                            color="primary"
                            disabled={isLoading || !isEditing}
                            fullWidth
                        >
                            {isLoading ? "저장 중..." : "저장"}
                        </Button>
                        <Button variant="outlined" onClick={handleCancel}>취소</Button>
                    </>
                )}

                {isEditing ? (
                    <TextField
                        // label="내용을 작성하세요"
                        multiline
                        rows={15}
                        variant="outlined"
                        fullWidth
                        style={{backgroundColor: "#fff"}}
                        value={content}
                        onChange={handleInputChange}
                    />
                ) : (
                    <Box style={{padding: 10, minHeight: 200}}>
                        <ReactMarkdown>{content}</ReactMarkdown>
                    </Box>
                )}

            </Stack>
        </Paper>
    );
}

export default ReviewMemo;