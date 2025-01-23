import {Button, CircularProgress, Paper, Stack, Typography} from '@mui/material';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import apiClient from "../api/apiClient.ts";
import {useEffect, useState} from "react";
import {oneLight} from "react-syntax-highlighter/dist/cjs/styles/prism";

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
        return "";
    }
}

interface CodeAreaProps {
    submissionId: number;
    language: string
}

function CodeArea({submissionId, language}: CodeAreaProps) {
    const [originalCode, setOriginalCode] = useState("");
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const urlResponse = await apiClient.get(`/api/solved-problems/judgment-results/submission-code/read/${submissionId}`);
            const codeUrl = urlResponse.data.url;
            const codeResponse = await apiClient.get(codeUrl);
            setOriginalCode(codeResponse.data);
            setCode(codeResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError("Error fetching code. Please check the console for more details.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
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


    const handleSave = async () => {
        setLoading(true);
        try {
            const putUrlResponse = await apiClient.get(`/api/solved-problems/judgment-results/submission-code/update/${submissionId}`);
            const s3PutUrl = putUrlResponse.data.url;

            await apiClient.put(s3PutUrl, code, {
                headers: {
                    'Content-Type': 'text/plain'
                }
            });

            setOriginalCode(code);
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving code:', error);
            setError("Error saving code. Please check the console for more details.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                <CircularProgress/>
            </div>
        );
    }

    if (error) {
        return (
            <Typography color="error">{error}</Typography>
        );
    }

    return (
        <Paper
            style={{
                height: '100%',
                padding: 5,
                overflow: 'auto',
                marginBottom: 80
            }}
        >
            <Stack spacing={1}>
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
                            lineNumberStyle={{minWidth: '25px', padding: '0 2', textAlign: 'right'}}
                        >
                            {code}
                        </SyntaxHighlighter>
                    )
                    : (
                        <textarea
                            value={code}
                            onChange={handleCodeChange}
                            style={{
                                width: "100%",
                                height: "600px",
                                fontFamily: "monospace",
                                fontSize: "14px",
                                lineHeight: "1.5",
                            }}
                        />
                    )}
            </Stack>
        </Paper>
    );
}

export default CodeArea;
