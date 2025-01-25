import React, {useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown';
import {Paper} from '@mui/material';

const NoticeComponent: React.FC = () => {
    const [markdown, setMarkdown] = useState('');

    useEffect(() => {
        fetch('public/notice.md')
            .then((response) => response.text())
            .then((text) => setMarkdown(text))
            .catch((error) => console.error('Error fetching markdown:', error));
    }, []);

    return (
        <Paper style={{padding: '16px', margin: '16px'}}>
            {/*<Typography variant="h4" gutterBottom>*/}
            {/*    공지사항*/}
            {/*</Typography>*/}
            <ReactMarkdown>{markdown}</ReactMarkdown>
        </Paper>
    );
};

export default NoticeComponent;