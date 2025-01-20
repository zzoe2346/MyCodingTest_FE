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
    const [isEditing, setIsEditing] = useState(false);
    const {memo, isLoading, fetchMemo, saveMemo} = useReviewMemo();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (reviewId) {
            fetchMemo(reviewId);
        }
    }, [fetchMemo, reviewId]);

    useEffect(() => {
        if (memo) {
            setContent(memo.content);
        } else {
            setContent("");
        }
    }, [memo]);

    const handleSave = async () => {
        await saveMemo(reviewId, content);
        enqueueSnackbar('메모 저장 완료!', { variant: 'success' });
        setIsEditing(false);
    };

    const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setContent(event.target.value);
    };

    const handleToggleMode = () => {
        setIsEditing(!isEditing);
        if(!isEditing){
            enqueueSnackbar('작성 완료 후 "저장" 버튼을 클릭해야지 서버에 저장이 됩니다.', { variant: 'info' });
        }
    };

    return (
        <Paper style={{minHeight: 400, padding: 20}}>
            <Stack spacing={1}>
                <Typography variant="h6" >
                    메모{"  "}
                    <Typography variant="caption">
                        markdown 지원, 작성 완료 후 꼭 "저장" 버튼 눌러주세요
                    </Typography>
                </Typography>

                <Button
                    onClick={handleToggleMode}
                    variant="outlined"
                    disabled={isLoading}
                    fullWidth
                >
                    {isEditing ? "미리보기" : "편집하기"}
                </Button>

                {isEditing ? (
                    <TextField
                        label="내용을 작성하세요"
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
                <Button
                    onClick={handleSave}
                    variant="contained"
                    color="primary"
                    disabled={isLoading || !isEditing}
                    fullWidth
                >
                    {isLoading ? "저장 중..." : "저장"}
                </Button>
            </Stack>
        </Paper>
    );
}

export default ReviewMemo;