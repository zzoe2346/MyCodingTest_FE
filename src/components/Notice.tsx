import React, {useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown';
import {Paper} from '@mui/material';

const NoticeComponent: React.FC = () => {
    const [markdown, setMarkdown] = useState('');
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        setDataLoaded(false);
        fetch('notice/notice.md')
            .then((response) => response.text())
            .then((text) => {
                setMarkdown(text);
                setDataLoaded(true);
            })
            .catch((error) => console.error('Error fetching markdown:', error));

    }, []);

    return (
        <Paper sx={{
            padding: '16px', margin: '16px', opacity: dataLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out'
        }}>
            {/*<Typography variant="h4" gutterBottom>*/}
            {/*    공지사항*/}
            {/*</Typography>*/}
            <ReactMarkdown>{markdown}</ReactMarkdown>
        </Paper>
    );
};

export default NoticeComponent;