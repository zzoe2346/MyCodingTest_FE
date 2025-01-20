import {CircularProgress, Paper, Typography} from '@mui/material';
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
    judgmentResultId: number;
    language: string
}

function CodeArea({judgmentResultId, language}: CodeAreaProps) {
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get(`/api/solved-problems/judgment-results/${judgmentResultId}/submitted-code`);
            setCode(response.data.code);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError("error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [judgmentResultId]);

    return (
        <Paper
            style={{
                height: '100%',
                padding: 5,
                backgroundColor: '#edeaea',
                overflow: 'auto',
                marginBottom: 80
            }}
        >
            {loading ? (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                    <CircularProgress/>
                </div>
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <SyntaxHighlighter language={mapLanguageToPrism(language)} style={oneLight} showLineNumbers
                                   lineNumberStyle={{minWidth: '25px', padding: '0 2', textAlign: 'right'}}>
                    {code}
                </SyntaxHighlighter>
            )}
        </Paper>
    );
}

export default CodeArea;
