import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Alert,
} from '@mui/material';

interface User {
  username: string;
  // 필요한 경우 더 많은 필드를 여기에 추가
}

const AuthPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 로컬 스토리지에서 사용자 정보를 확인하여 로그인 상태를 복원
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:8080/sign-in', { username, password });
      const loggedInUser: User = response.data;
      setUser(loggedInUser);
      setIsLoggedIn(true);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      // 로그인 성공 후 처리 (예: 페이지 리디렉션)
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || '로그인에 실패했습니다.');
      } else {
        setError('로그인 중 오류가 발생했습니다.');
      }
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:8080/sign-out');
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem('user');
      // 로그아웃 성공 후 처리
    } catch (err) {
      setError('로그아웃 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8} display="flex" flexDirection="column" alignItems="center">
        <Typography component="h1" variant="h5">
          {isLoggedIn ? '로그인 상태' : '로그인'}
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {!isLoggedIn ? (
          <Box width="100%" mt={2}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="사용자 이름"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              mt={3}
              onClick={handleSignIn}
              disabled={loading}
            >
              로그인
            </Button>
          </Box>
        ) : (
          <Box mt={2}>
            <Typography>
              {user ? `환영합니다, ${user.username}님!` : ''}
            </Typography>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              mt={2}
              onClick={handleSignOut}
              disabled={loading}
            >
              로그아웃
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default AuthPage;