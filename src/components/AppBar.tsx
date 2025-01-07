import {AppBar, Box, Button, Link, Toolbar, Typography} from "@mui/material";
import {Link as RouterLink, useLocation} from 'react-router-dom';
import {useAuth} from "../context/AuthContext.tsx";

// 1. 로그인 상태에 따른 상단 메뉴 컴포넌트
function UserMenu() {
    const {isLoggedIn, user, signOut} = useAuth();

    return (
        <Box display="flex" justifyContent='flex-end'>
            {isLoggedIn ? (
                <>
                    <Typography variant="caption" marginRight="1rem">
                        <Link
                            component={RouterLink}
                            to="/mypage"
                            color="primary"
                            underline="hover"
                        >
                            {user?.username}
                        </Link>
                    </Typography>
                    <Typography variant="caption" marginRight="1rem">
                        <Link
                            onClick={signOut}
                            color="primary"
                            underline="hover"
                            style={{cursor: 'pointer'}}
                        >
                            로그아웃
                        </Link>
                    </Typography>
                </>
            ) : (
                <Typography variant="caption" marginRight="1rem">
                    <Link
                        component={RouterLink}
                        to="/login"
                        color="primary"
                        underline="hover"
                        margin="3px"
                    >
                        Login
                    </Link>
                </Typography>
            )}
        </Box>
    );
}

// 2. 로고 및 타이틀 컴포넌트
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
                    src="public/logo.png"
                    alt="My Coding Test Logo"
                    style={{height: '60px'}}
                />
            </Box>
            {/*<Typography*/}
            {/*    color="primary"*/}
            {/*    variant="h4"*/}
            {/*    padding="5px"*/}
            {/*    sx={{*/}
            {/*        flexGrow: 1,*/}
            {/*        fontFamily: 'Lilita One, monospace',*/}
            {/*        fontWeight: '500',*/}
            {/*        whiteSpace: 'nowrap'*/}
            {/*    }}*/}
            {/*>*/}
            {/*    My Coding Test*/}
            {/*</Typography>*/}
        </>
    );
}

// 현재 경로에 따른 버튼 스타일을 반환하는 함수
function getButtonStyle(currentPath: string, targetPath: string) {
    const isActive = currentPath === targetPath || currentPath.startsWith(targetPath + '/');
    return {
        fontWeight: isActive ? 'bold' : 'normal',
        // textDecoration: isActive ? 'underline' : 'none',
    };
}

// 3. 하단 메뉴 버튼 컴포넌트 (수정됨)
function NavigationButtons() {
    const location = useLocation();

    return (
        <Box sx={{display: 'flex', alignItems: 'center', ml: 3}}>
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
            <Button
                component={RouterLink}
                to="/review"
                color="primary"
                size="large"
                sx={getButtonStyle(location.pathname, "/review")}
            >
                복습 대기 문제들
            </Button>


            <Button
                component={RouterLink}
                to="/review-complete"
                color="primary"
                size="large"
                sx={getButtonStyle(location.pathname, "/review-complete")}
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
                to="/about"
                color="primary"
                size="large"
                sx={getButtonStyle(location.pathname, "/about")}
            >
                북마크 문제들
            </Button>
        </Box>
    );
}


// MyAppBar 컴포넌트
function MyAppBar() {
    return (
        <>
            <UserMenu/>
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
                <Toolbar>
                    <Box sx={{display: 'flex', alignItems: 'center'}}> {/* Flex 컨테이너 추가 */}
                        <LogoAndTitle/>
                        <NavigationButtons/>
                    </Box>
                    <Box sx={{flexGrow: 1}}/> {/* 남은 공간을 채워 UserMenu를 오른쪽 정렬 */}
                </Toolbar>
            </AppBar>
        </>
    );
}

export default MyAppBar;