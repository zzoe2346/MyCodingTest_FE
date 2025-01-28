import {
    AppBar,
    Avatar,
    Badge,
    Box,
    Button,
    Container,
    Drawer,
    IconButton,
    Link,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Menu,
    MenuItem,
    Stack,
    Toolbar,
    Typography,
} from "@mui/material";
import {Link as RouterLink, useLocation, useNavigate} from 'react-router-dom';
import {UserAuth} from "../context/AuthContext.tsx";
import React, {useState} from "react";
import MenuIcon from '@mui/icons-material/Menu';

function Logo() {
    return (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                paddingTop: '0px'
            }}
        >
            <img
                src="/images/logo.svg"
                alt="My Coding Test Logo"
                style={{
                    height: '80%', // 부모 컴포넌트 높이의 80% (조절 가능)
                    width: 'auto', // 가로 세로 비율 유지를 위해 반드시 추가
                    maxHeight: '60px', // 최대 높이 제한 (필요에 따라 조절)
                }}
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
                        {/*<Typography color={"black"} variant="caption">{user?.name}</Typography>*/}
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
                            <Typography color={"black"}>마이페이지(공사중)</Typography>
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
        <Box sx={{display: {xs: 'none', lg: 'flex'}, alignItems: 'center', ml: 3, gap: 2}}>
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
                to="/solved-problems"
                color="primary"
                size="large"
                sx={getButtonStyle(location.pathname, "/solved-problems")}
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

//mobile bar
function MobileNavigationDrawer() {
    const {unreviewedCount} = UserAuth();
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setOpen(open);
    };

    const list = () => (
        <Box
            sx={{width: 250}}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {[
                    {text: '홈', path: '/'},
                    {text: '푼 문제들', path: '/solved-problems'},
                    {text: '복습 대기 문제들', path: '/review-unclear', badge: unreviewedCount},
                    {text: '복습 완료 문제들', path: '/review-clear'},
                    {text: '태그별 문제들', path: '/tag'},
                    {text: '북마크 문제들', path: '/favorite'}
                ].map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton component={RouterLink} to={item.path}
                                        sx={getButtonStyle(location.pathname, item.path)}>
                            {item.badge ? (
                                <Badge badgeContent={item.badge} color="warning" sx={{marginRight: 2}}>
                                    <ListItemText primary={item.text}/>
                                </Badge>
                            ) : (
                                <ListItemText primary={item.text}/>
                            )}
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            <IconButton
                size="large"
                edge="start"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{mr: 2, display: {lg: 'none'}}}
            >
                <MenuIcon/>
            </IconButton>
            <Drawer
                anchor="left"
                open={open}
                onClose={toggleDrawer(false)}
            >
                {list()}
            </Drawer>
        </>
    );
}

const MyAppBar = () => {
    return (
        <Container sx={{minHeight: 70}} maxWidth='xl'>
            <AppBar
                sx={{
                    maxWidth: 'xl',
                    height: 'auto',
                    backgroundColor: 'white',
                    boxShadow: '1',
                    // borderBottom: '2px solid #bdbdbd',
                    top: '0',
                    paddingLeft: '10px',
                    paddingRight: '10px',
                    paddingTop: '5px',
                    paddingBottom: '5px',
                    marginBottom: 0,
                }}
            >
                <Toolbar>
                    <Box sx={{display: 'flex', alignItems: 'center', flexGrow: {xs: 1, lg: 0}}}>
                        <MobileNavigationDrawer/>
                        <Logo/>
                        <NavigationButtons/>
                    </Box>
                    <Box sx={{flexGrow: {xs: 0, lg: 1}}}/>
                    <UserStatus/>
                </Toolbar>
            </AppBar>
        </Container>
    );
};

export default MyAppBar;