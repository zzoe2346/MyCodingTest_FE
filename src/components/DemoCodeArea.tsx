import { Button, Fade, Paper, Stack, TextField, Typography } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { useState, useEffect } from "react";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { demoCodeSnippets } from "../demo/demoData";

function mapLanguageToPrism(language: string): string {
    const languageMap: { [key: string]: string } = {
        "C++17": "cpp",
        "Java 8": "java",
        "Python 3": "python",
        "C11": "c",
        "PyPy3": "python",
        "Java 11": "java",
    };

    return languageMap[language] || "text";
}

interface DemoCodeAreaProps {
    submissionId: number;
    language: string;
}

function DemoCodeArea({ submissionId, language }: DemoCodeAreaProps) {
    const [originalCode, setOriginalCode] = useState("");
    const [code, setCode] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const mockCode = demoCodeSnippets[submissionId] || "# 코드를 찾을 수 없습니다";
        setOriginalCode(mockCode);
        setCode(mockCode);
    }, [submissionId]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setCode(originalCode);
        setIsEditing(false);
    };

    const handleCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCode(event.target.value);
    };

    const handleSave = () => {
        // In demo mode, just update local state
        setOriginalCode(code);
        setIsEditing(false);
    };

    return (
        <Paper>
            <Fade in={true} timeout={500}>
                <Stack spacing={1}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                        📌 데모 모드: 코드 수정은 임시로만 저장됩니다
                    </Typography>
                    {!isEditing ? (
                        <Button variant="outlined" onClick={handleEdit}>코드 수정</Button>
                    ) : (
                        <>
                            <Button variant="outlined" onClick={handleSave}>저장</Button>
                            <Button variant="outlined" onClick={handleCancel}>취소</Button>
                        </>
                    )}
                    {!isEditing ? (
                        <SyntaxHighlighter
                            language={mapLanguageToPrism(language)}
                            style={oneLight}
                            showLineNumbers
                            lineNumberStyle={{ minWidth: '25px', padding: '0 2', textAlign: 'right' }}
                        >
                            {code}
                        </SyntaxHighlighter>
                    )
                        : (
                            <TextField
                                value={code}
                                onChange={handleCodeChange}
                                multiline={true}
                                sx={{ fontFamily: 'monospace' }}
                            />
                        )}
                </Stack>
            </Fade>
        </Paper>
    );
}

export default DemoCodeArea;
