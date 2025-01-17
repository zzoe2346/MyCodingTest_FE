import {Box, Button, Paper, TextField, Typography} from "@mui/material";
import {SetStateAction, useEffect, useState} from "react";
import ReactMarkdown from 'react-markdown';
import useMemoApi from "../hooks/useMemoApi";

interface ReviewMemoProps {
    reviewId: number;
}

function ReviewMemo({reviewId}: ReviewMemoProps) {
    const [content, setContent] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const {memo, isLoading, error, fetchMemo, saveMemo} = useMemoApi();

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
        setIsEditing(false);
    };

    const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setContent(event.target.value);
    };

    const handleToggleMode = () => {
        setIsEditing(!isEditing);
    };

    useEffect(() => {
        if (error) {
            alert(error);
        }
    }, [error]);

    return (
        <Paper style={{minHeight: 400, padding: 10}}>
            <Typography variant="h6" gutterBottom>
                메모
            </Typography>

            <Button onClick={handleToggleMode} style={{marginBottom: 10}} disabled={isLoading}>
                {isEditing ? "미리보기" : "편집"}
            </Button>

            {isEditing ? (
                <TextField
                    label="내용을 작성하세요"
                    multiline
                    rows={15}
                    variant="outlined"
                    fullWidth
                    style={{backgroundColor: '#fff', marginBottom: 10}}
                    value={content}
                    onChange={handleInputChange}
                />
            ) : (
                <Box style={{padding: 10, minHeight: 200, marginBottom: 10}}>
                    <ReactMarkdown>{content}</ReactMarkdown>
                </Box>
            )}

            <div>
                <Button onClick={handleSave} disabled={isLoading || !isEditing}>
                    {isLoading ? '저장 중...' : '저장'}
                </Button>
            </div>
        </Paper>
    );
}

export default ReviewMemo;