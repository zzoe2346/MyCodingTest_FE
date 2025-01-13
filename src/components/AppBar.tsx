import {AppBar, Avatar, Badge, Box, Button, Container, Link, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import {Link as RouterLink, useLocation} from 'react-router-dom';
import {useAuth} from "../context/AuthContext.tsx";
import React, {useState} from "react";

function UserMenu() {
    const {isLoggedIn, user, signOut} = useAuth();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box display="flex" justifyContent='flex-end' sx={{padding: '0 0', margin: '0 0'}}>
            {isLoggedIn ? (
                <>
                    <div style={{textAlign: 'center'}}>
                        <Avatar
                            alt={user?.username}
                            onClick={handleMenuOpen}
                            sx={{cursor: 'pointer'}}
                        />
                        <div style={{fontSize: '12px', color: '#555', marginTop: '2px'}}>
                            {user?.username}
                        </div>
                    </div>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={() => {
                            handleMenuClose();
                            // 마이페이지로 이동 나중에 라우드 되도록 수정
                            window.location.href = '/mypage';
                        }}>
                            마이페이지
                        </MenuItem>
                        <MenuItem onClick={() => {
                            handleMenuClose();
                            signOut();
                        }}>
                            로그아웃
                        </MenuItem>
                    </Menu>
                </>
            ) : (
                <Typography variant="body2" marginRight="1rem">
                    <Link
                        component={RouterLink}
                        to="/login"
                        color="primary"
                        underline="hover"
                        margin="1px"
                    >
                        로그인
                    </Link>
                    <Box component="span" sx={{color: 'gray', mx: 1}}>
                        /
                    </Box>
                    <Link
                        component={RouterLink}
                        to="/sign-up"
                        color="primary"
                        underline="hover"
                        margin="1px"
                    >
                        회원가입
                    </Link>
                </Typography>
            )}
        </Box>
    );
}

function LogoAndTitle() {
    return (
        <>
            <Box
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <img
                    src="/images/logo.png"
                    alt="My Coding Test Logo"
                    style={{height: '60px'}}
                />
            </Box>
        </>
    );
}

function getButtonStyle(currentPath: string, targetPath: string) {
    const isActive = currentPath === targetPath || currentPath.startsWith(targetPath + '/');
    return {
        fontWeight: isActive ? '800' : 'normal',
        // color: isActive ? 'red' : 'secondary'
    };
}

function NavigationButtons() {
    const {unreviewedCount} = useAuth();
    const location = useLocation();

    return (
        <Box sx={{display: 'flex', alignItems: 'center', ml: 3, gap: 2}}>
            <Button
                component={RouterLink}
                to="/"
                color="primary"
                size="large"
                sx={getButtonStyle(location.pathname, "/")}
            >
                홈
            </Button>
            <Button
                component={RouterLink}
                to="/solvedProblems"
                color="primary"
                size="large"
                sx={getButtonStyle(location.pathname, "/solvedProblems")}
            >
                푼 문제들
            </Button>
            <Badge badgeContent={unreviewedCount} color="warning">
                <Button
                    component={RouterLink}
                    to="/review-unclear"
                    color="primary"
                    size="large"
                    sx={getButtonStyle(location.pathname, "/review-unclear")}
                >
                    복습 대기 문제들
                </Button>
            </Badge>
            <Button
                component={RouterLink}
                to="/review-clear"
                color="primary"
                size="large"
                sx={getButtonStyle(location.pathname, "/review-clear")}
            >
                복습 완료 문제들
            </Button>
            <Button
                component={RouterLink}
                to="/tag"
                color="primary"
                size="large"
                sx={getButtonStyle(location.pathname, "/tag")}
            >
                태그별 문제들
            </Button>
            <Button
                component={RouterLink}
                to="/favorite"
                color="primary"
                size="large"
                sx={getButtonStyle(location.pathname, "/favorite")}
            >
                북마크 문제들
            </Button>
        </Box>
    );
}

function MyAppBar() {
    return (
        <>
            <AppBar
                sx={{
                    height: 'auto',
                    backgroundColor: 'white',
                    boxShadow: 'none',
                    borderBottom: '1px solid #bdbdbd',
                    top: 'auto',
                }}
                position="static"
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters
                             sx={{
                                 minHeight: '48px', // 기본 높이를 48px로 줄임
                                 padding: '0 0px', // 상하 여백 0, 좌우 여백 16px
                             }}>
                        <Box sx={{display: 'flex', alignItems: 'center'}}> {/* Flex 컨테이너 추가 */}
                            <LogoAndTitle/>
                            <NavigationButtons/>
                        </Box>
                        <Box sx={{flexGrow: 1}}/> {/* 남은 공간을 채워 UserMenu를 오른쪽 정렬 */}
                        <UserMenu/>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}

export default MyAppBar;