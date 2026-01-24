import { Paper, Stack, Typography, Box, TextField, Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useState, useEffect } from 'react';
import { demoCodeSnippets, demoReviewCodes } from "../demo/demoData";

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
    reviewId: number;
    language: string;
}

function DemoCodeArea({ submissionId, reviewId, language }: DemoCodeAreaProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [reviewCode, setReviewCode] = useState("");
    const [tempCode, setTempCode] = useState("");
    const [viewMode, setViewMode] = useState<'review' | 'original'>('review');

    const originalCode = demoCodeSnippets[submissionId] || "";

    useEffect(() => {
        const storedCode = demoReviewCodes[reviewId] || "";
        setReviewCode(storedCode);
        setTempCode(storedCode);
    }, [reviewId]);

    const handleSave = () => {
        setReviewCode(tempCode);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setTempCode(reviewCode);
        setIsEditing(false);
    };

    const handleViewModeChange = (_: React.MouseEvent<HTMLElement>, newMode: 'review' | 'original' | null) => {
        if (newMode !== null) {
            setViewMode(newMode);
            if (newMode === 'original' && isEditing) {
                handleCancel();
            }
        }
    };

    const currentCode = viewMode === 'original' ? originalCode : reviewCode;
    const hasOriginalCode = originalCode && originalCode.length > 0;

    return (
        <Paper>
            <Stack spacing={1}>
                {/* Header */}
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    px: 2,
                    pt: 2,
                    flexWrap: 'wrap',
                    gap: 1,
                }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        {language || '코드'}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        {hasOriginalCode && (
                            <ToggleButtonGroup
                                value={viewMode}
                                exclusive
                                onChange={handleViewModeChange}
                                size="small"
                                sx={{ height: 32 }}
                            >
                                <ToggleButton value="review" sx={{ px: 1.5, fontSize: '0.75rem' }}>
                                    수정 가능 코드
                                </ToggleButton>
                                <ToggleButton value="original" sx={{ px: 1.5, fontSize: '0.75rem' }}>
                                    제출한 원본 코드
                                </ToggleButton>
                            </ToggleButtonGroup>
                        )}
                    </Box>
                </Box>

                {/* Demo Mode Notice */}
                <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic', px: 2 }}>
                    📌 데모 모드: 코드 수정은 임시로만 저장됩니다
                </Typography>

                {/* Code Content */}
                {isEditing ? (
                    <Box sx={{ p: 2, pt: 0 }}>
                        <TextField
                            multiline
                            fullWidth
                            minRows={10}
                            maxRows={30}
                            value={tempCode}
                            onChange={(e) => setTempCode(e.target.value)}
                            placeholder="코드를 입력하세요..."
                            sx={{
                                fontFamily: 'monospace',
                                '& .MuiInputBase-input': {
                                    fontFamily: 'monospace',
                                    fontSize: '0.875rem',
                                },
                            }}
                        />
                        <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{ mt: 1 }}>
                            <Button variant="outlined" size="small" onClick={handleCancel}>취소</Button>
                            <Button variant="outlined" size="small" onClick={handleSave}>저장</Button>
                        </Stack>
                    </Box>
                ) : (
                    <>
                        {currentCode ? (
                            <SyntaxHighlighter
                                language={mapLanguageToPrism(language)}
                                style={oneLight}
                                showLineNumbers
                                lineNumberStyle={{ minWidth: '25px', padding: '0 2', textAlign: 'right' }}
                            >
                                {currentCode}
                            </SyntaxHighlighter>
                        ) : (
                            <Typography color="text.secondary" sx={{ fontStyle: 'italic', p: 2, pt: 0 }}>
                                {viewMode === 'original' ? '원본 코드가 없습니다' : '작성된 코드가 없습니다'}
                            </Typography>
                        )}
                        
                        {/* Edit Button */}
                        {viewMode === 'review' && (
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2, pb: 2 }}>
                                <Button variant="outlined" size="small" onClick={() => setIsEditing(true)}>
                                    코드 수정
                                </Button>
                            </Box>
                        )}
                    </>
                )}
            </Stack>
        </Paper>
    );
}

export default DemoCodeArea;
