import {CircularProgress, Paper, Typography} from '@mui/material';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {materialLight} from 'react-syntax-highlighter/dist/esm/styles/prism';
import apiClient from "../api/apiClient.ts";
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
                height: 'auto',
                padding: 10,
                backgroundColor: '#edeaea',
                overflow: 'auto',
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
