import {CircularProgress, Paper, Typography} from '@mui/material';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {materialLight} from 'react-syntax-highlighter/dist/esm/styles/prism';
import api from "../api/api.ts";
import {useEffect, useState} from "react";

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
            const response = await api.get(`/api/solved-problems/judgment-results/${judgmentResultId}/submitted-code`);
            setCode(response.data.code); // 응답 데이터에 코드 내용이 있다고 가정
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
                height: 'calc(100vh - 60px - 50px)', // 앱바 높이와 여백 제외
                padding: 10,
                backgroundColor: '#f4f4f4',
                overflow: 'auto', // 스크롤 가능
            }}
        >
            {loading ? (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                    <CircularProgress/>
                </div>
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <SyntaxHighlighter language={language} style={materialLight}>
                    {code}
                </SyntaxHighlighter>
            )}
        </Paper>
    );
}

export default CodeArea;
