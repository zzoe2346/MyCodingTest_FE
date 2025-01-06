import {AppBar, Box, Button, Link, Toolbar, Typography} from "@mui/material";
import {Link as RouterLink} from 'react-router-dom';
import {useAuth} from "../context/AuthContext.tsx";


function MyAppBar() {
    const {isLoggedIn, user, signOut} = useAuth();

    return (
        <>
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
                        <Typography variant="caption" marginRight="1rm">
                            <Link
                                marginRight="1rem"
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
            <AppBar
                sx={{
                    height: 'auto', // Toolbar의 최소 높이와 일치하도록 조정
                    backgroundColor: 'white',
                    boxShadow: 'none',
                    borderBottom: '1px solid #bdbdbd', // 하단 테두리 추가
                    top: 'auto', // 첫 번째 AppBar의 높이에 맞게 자동 조정 (필요한 경우)
                }}
                position="static" // 상대 위치 설정
            >
                <Toolbar>
                    <Typography
                        color="primary"
                        variant="h4"
                        padding="5px"
                        sx={{
                            flexGrow: 1,
                            fontFamily: 'Lilita One, monospace',
                            fontWeight: '500',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        My Coding Test
                    </Typography>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Button component={RouterLink} to="/" color="primary" size="large">
                            리뷰대기
                        </Button>
                        <Button component={RouterLink} to="/review" color="primary" size="large">
                            MyProblem
                        </Button>
                        <Button component={RouterLink} to="/about" color="primary" size="large">
                            리뷰
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default MyAppBar;