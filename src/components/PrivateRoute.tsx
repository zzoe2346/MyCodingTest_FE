import React from 'react';
import { Navigate } from 'react-router-dom';
import { Box, CircularProgress, Stack, Typography, Fade } from '@mui/material';
import { UserAuth } from "../context/AuthContext.tsx";

interface PrivateRouteProps {
    children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { isLoggedIn, loading } = UserAuth();

    if (loading) {
        return (
            <Fade in={true} timeout={300}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '60vh',
                    }}
                >
                    <Stack spacing={2} alignItems="center">
                        <CircularProgress size={40} sx={{ color: 'primary.main' }} />
                        <Typography variant="body1" color="text.secondary">
                            로딩 중...
                        </Typography>
                    </Stack>
                </Box>
            </Fade>
        );
    }

    if (isLoggedIn) {
        return children;
    } else {
        return <Navigate to="/login" />;
    }
};

export default PrivateRoute;

