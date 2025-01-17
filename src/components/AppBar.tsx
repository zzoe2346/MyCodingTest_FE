import {
    AppBar,
    Avatar,
    Badge,
    Box,
    Button,
    Container,
    Link,
    Menu,
    MenuItem,
    Stack,
    Toolbar,
    Typography
} from "@mui/material";
import {Link as RouterLink, useLocation, useNavigate} from 'react-router-dom';
import {UserAuth} from "../context/AuthContext.tsx";
import React, {useState} from "react";

function Logo() {
    return (
        <Box
            sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                paddingTop: '0px'
            }}
        >
            <img
                src="/images/logo.svg"
                alt="My Coding Test Logo"
                style={{height: '65px'}}
            />
        </Box>
    );
}

function UserStatus() {
    const {isLoggedIn, user, signOut} = UserAuth();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = async () => {
        handleMenuClose();
        await signOut();
        navigate('/login');
    };

    return (
        <Box display="flex" justifyContent='flex-end' sx={{padding: '0 0', margin: '0 0'}}>
            {isLoggedIn ? (
                <>
                    <Stack direction="column" alignItems="center" spacing={0}>
                        <Avatar
                            src={user?.picture}
                            onClick={handleMenuOpen}
                            sx={{cursor: 'pointer'}}
                        />
                        <Typography color={"black"} variant="caption">{user?.name}</Typography>
                    </Stack>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={() => {
                            navigate('/my-page')
                            handleMenuClose()
                        }}>
                            <Typography color={"black"}>마이페이지</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleSignOut}>
                            <Typography color={"red"}>로그아웃</Typography>
                        </MenuItem>
                    </Menu>
                </>
            ) : (
                <Typography variant="body1">
                    <Link
                        component={RouterLink}
                        to="/login"
                        color="primary"
                        underline="hover"
                        margin="1px"
                    >
                        로그인
                    </Link>
                </Typography>
            )}
        </Box>
    );
}

function getButtonStyle(currentPath: string, targetPath: string) {
    const isActive = currentPath === targetPath || currentPath.startsWith(targetPath + '/');
    return {
        fontWeight: isActive ? '800' : 'normal',
    };
}

function NavigationButtons() {
    const {unreviewedCount} = UserAuth();
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
            <Button
                component={RouterLink}
                to="/favorite"
                color="error"
                size="large"
                sx={getButtonStyle(location.pathname, "/favorite")}
            >
                이용가이드
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
                    borderBottom: '2px solid #bdbdbd',
                    top: 'auto',
                    paddingTop: 0,
                    paddingBottom: 1,
                    margin: 0,
                }}
                position="static"
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters
                             sx={{
                                 height: '40px',
                                 padding: '0 0px',
                                 margin: 0
                             }}>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <Logo/>
                            <NavigationButtons/>
                        </Box>
                        <Box sx={{flexGrow: 1}}/>
                        <UserStatus/>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}

export default MyAppBar;