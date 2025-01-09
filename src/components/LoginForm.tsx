import React, {useState} from 'react';
import {Box, Button, Paper, TextField, Typography} from '@mui/material';
import {useAuth} from "../context/AuthContext.tsx";
import {Link as RouterLink} from "react-router-dom";

const LoginForm: React.FC = () => {
    const {isLoggedIn, error, loading, signIn} = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await signIn(username, password);
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
