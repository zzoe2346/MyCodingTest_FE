import React, {useState} from 'react';
import {Box, Button, Paper, TextField, Typography} from '@mui/material';
import {useAuth} from "../../context/AuthContext.tsx";
import {Link as RouterLink} from "react-router-dom";

const LoginForm: React.FC = () => {
    const {isLoggedIn, error, loading} = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    const handleGoogleLogin = () => {
        const googleLoginUrl = 'http://localhost:8080/oauth2/authorization/google';
        window.location.href = googleLoginUrl;
    };


    if (loading) {
        return (
            <Typography>LOADING...</Typography>
        )
    }

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1, width: '500px'}}>
            {isLoggedIn ? (
                <Typography textAlign="center" alignContent='center' variant="h6">환영합니다!</Typography>
            ) : (
                <Paper sx={{width: '100%', padding: 3}}>
                    <Typography variant='h4'>
                        로그인
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="ID"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="PASSWORD"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && (
                        <Typography color="error" sx={{mt: 1}}>
                            {error}
                        </Typography>
                    )}
                    <Button
                        onClick={handleGoogleLogin}
                        style={{
                            padding: 0, // 내부 패딩 제거
                            border: 'none', // 테두리 제거
                            background: 'none', // 배경 제거
                            boxShadow: 'none', // 그림자 제거
                        }}
                    >
                        <img
                            src="images/google-icon.svg"
                            alt="Google Icon"
                            style={{width: '100%', height: '100%', objectFit: 'fill'}}
                        />
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        disabled={loading}
                    >
                        {loading ? '로그인 중...' : '로그인'}
                    </Button>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        sx={{mt: 0, mb: 2}}
                        disabled={loading}
                        component={RouterLink}
                        to="/sign-up"
                    >
                        회원가입
                    </Button>
                </Paper>
            )}
        </Box>
    );

};

export default LoginForm;
