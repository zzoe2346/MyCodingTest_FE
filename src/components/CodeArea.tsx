import { Paper, Stack, Typography, Box, TextField, Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useState, useEffect } from 'react';

function mapLanguageToPrism(language: string): string {
    const languageMap: { [key: string]: string } = {
        "C++17": "cpp",
        "Java 8": "java",
        "Python 3": "python",
        "C11": "c",
        "PyPy3": "python",
        "C99": "c",
        "C++98": "cpp",
        "C++11": "cpp",
        "C++14": "cpp",
        "Java 8 (OpenJDK)": "java",
        "Java 11": "java",
        "C++20": "cpp",
        "C++23": "cpp",
        "C++26": "cpp",
        "Ruby": "ruby",
        "Kotlin (JVM)": "kotlin",
        "Swift": "swift",
        "C#": "csharp",
        "node.js": "javascript",
        "Go": "go",
        "Go (gccgo)": "go",
        "Java 15": "java",
        "D": "d",
        "D (LDC)": "d",
        "PHP": "php",
        "Rust 2015": "rust",
        "Rust 2018": "rust",
        "Rust 2021": "rust",
        "Pascal": "pascal",
        "Lua": "lua",
        "Perl": "perl",
        "F#": "fsharp",
        "Visual Basic": "vbnet",
        "Objective-C": "objectivec",
        "Objective-C++": "objectivec",
        "C99 (Clang)": "c",
        "C++98 (Clang)": "cpp",
        "C++11 (Clang)": "cpp",
        "C++14 (Clang)": "cpp",
        "C11 (Clang)": "c",
        "C++17 (Clang)": "cpp",
        "C++20 (Clang)": "cpp",
        "Golfscript": "golfscript",
        "C90": "c",
        "C2x": "c",
        "C90 (Clang)": "c",
        "C2x (Clang)": "c",
        "TypeScript": "typescript",
        "Assembly (32bit)": "asm32",
        "Assembly (64bit)": "asm64",
        "Bash": "bash",
        "Fortran": "fortran",
        "Scheme": "scheme",
        "Ada": "ada",
        "awk": "awk",
        "OCaml": "ocaml",
        "Brainf**k": "brainfuck",
        "Whitespace": "whitespace",
        "Tcl": "tcl",
        "Rhino": "javascript",
        "Pike": "pike",
        "sed": "sed",
        "INTERCAL": "intercal",
        "bc": "bc",
        "Algol 68": "algol68",
        "Befunge": "befunge",
        "FreeBASIC": "basic",
        "Haxe": "haxe",
        "LOLCODE": "lolcode",
        "아희": "ahk",
        "SystemVerilog": "systemverilog",
    };

    if (languageMap[language]) {
        return languageMap[language];
    } else {
        console.warn(`Language not found in map: ${language}`);
        return "text";
    }
}

interface CodeAreaProps {
    // Original judgment code (read-only)
    originalCode?: string;
    // Review code (editable)
    reviewCode: string;
    language: string;
    onUpdate?: (code: string) => Promise<void>;
}

function CodeArea({ originalCode, reviewCode, language, onUpdate }: CodeAreaProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [tempCode, setTempCode] = useState(reviewCode);
    const [viewMode, setViewMode] = useState<'review' | 'original'>('review');

    useEffect(() => {
        setTempCode(reviewCode);
    }, [reviewCode]);

    const handleSave = async () => {
        if (onUpdate) {
            await onUpdate(tempCode);
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setTempCode(reviewCode);
        setIsEditing(false);
    };

    const handleViewModeChange = (_: React.MouseEvent<HTMLElement>, newMode: 'review' | 'original' | null) => {
        if (newMode !== null) {
            setViewMode(newMode);
            // Cancel editing if switching to original view
            if (newMode === 'original' && isEditing) {
                handleCancel();
            }
        }
    };

    const currentCode = viewMode === 'original' ? (originalCode || '') : reviewCode;
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
                        {/* View Mode Toggle */}
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
                        
                        {/* Edit Button - Tag Style (only for review mode) */}
                        {viewMode === 'review' && onUpdate && (
                            <Box sx={{ px: 2, pb: 2 }}>
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

export default CodeArea;
