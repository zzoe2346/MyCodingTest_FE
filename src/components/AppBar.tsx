import {
    AppBar,
    Avatar,
    Badge,
    Box,
    Button,
    Container,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    alpha,
} from "@mui/material";
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { UserAuth } from "../context/AuthContext.tsx";
import React, { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import PendingActionsRoundedIcon from '@mui/icons-material/PendingActionsRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

const Logo = () => {
    return (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Box
                component="img"
                src="/images/logo.svg"
                alt="My Coding Test Logo"
                sx={{
                    height: 'auto',
                    width: 'auto',
                    maxHeight: '40px',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                }}
            />
        </Box>
    );
};

const UserStatus = () => {
    const { isLoggedIn, user, signOut } = UserAuth();
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
        <Box display="flex" justifyContent='flex-end' alignItems="center">
            {isLoggedIn ? (
                <>
                    <Avatar
                        src={user?.picture}
                        onClick={handleMenuOpen}
                        sx={{
                            cursor: 'pointer',
                            width: 38,
                            height: 38,
                            border: '2px solid',
                            borderColor: 'primary.light',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                            }
                        }}
                    />
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        PaperProps={{
                            sx: {
                                mt: 1.5,
                                borderRadius: '12px',
                                boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
                                border: '1px solid',
                                borderColor: 'divider',
                                minWidth: 180,
                            }
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem
                            onClick={handleSignOut}
                            sx={{
                                py: 1.5,
                                color: 'error.main',
                                '&:hover': {
                                    backgroundColor: 'error.lighter',
                                }
                            }}
                        >
                            <ListItemIcon>
                                <LogoutRoundedIcon fontSize="small" color="error" />
                            </ListItemIcon>
                            <Typography fontWeight={500}>로그아웃</Typography>
                        </MenuItem>
                    </Menu>
                </>
            ) : (
                <Button
                    component={RouterLink}
                    to="/login"
                    variant="contained"
                    startIcon={<LoginRoundedIcon />}
                    sx={{
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        borderRadius: '10px',
                        px: 2.5,
                        py: 1,
                        fontWeight: 600,
                        textTransform: 'none',
                        boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                            boxShadow: '0 6px 20px rgba(99, 102, 241, 0.45)',
                            transform: 'translateY(-1px)',
                        }
                    }}
                >
                    로그인
                </Button>
            )}
        </Box>
    );
};

interface NavItem {
    text: string;
    path: string;
    icon: React.ReactNode;
    isDemo?: boolean;
    badge?: number;
}

const NavigationButtons = () => {
    const { unreviewedCount } = UserAuth();
    const location = useLocation();

    const navItems: NavItem[] = [
        { text: '홈', path: '/', icon: <HomeRoundedIcon /> },
        { text: '데모', path: '/demo/solved-problems', icon: <PlayCircleFilledRoundedIcon />, isDemo: true },
        { text: '푼 문제들', path: '/solved-problems', icon: <ListAltRoundedIcon /> },
        { text: '복습 대기 문제들', path: '/review-unclear', icon: <PendingActionsRoundedIcon />, badge: unreviewedCount },
        { text: '복습 완료 문제들', path: '/review-clear', icon: <CheckCircleRoundedIcon /> },
        { text: '태그별 문제들', path: '/tag', icon: <LocalOfferRoundedIcon /> },
        { text: '북마크 문제들', path: '/favorite', icon: <BookmarkRoundedIcon /> },
    ];

    const isActive = (path: string) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    return (
        <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', ml: 4, gap: 0.5 }}>
            {navItems.map((item) => {
                const active = isActive(item.path);

                if (item.isDemo) {
                    return (
                        <Button
                            key={item.path}
                            component={RouterLink}
                            to={item.path}
                            startIcon={item.icon}
                            sx={{
                                px: 2,
                                py: 1,
                                borderRadius: '10px',
                                fontWeight: 600,
                                textTransform: 'none',
                                background: active
                                    ? 'linear-gradient(135deg, #f59f0bb1 0%, #f97416a9 100%)'
                                    : 'transparent',
                                color: active ? 'white' : '#f59e0b',
                                // border: active ? 'none' : '1.5px solid #f59e0b',
                                // boxShadow: active ? '0 4px 14px rgba(245, 158, 11, 0.35)' : 'none',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #f59f0bb1 0%, #f97416a9 100%)',
                                    color: 'white',
                                    // boxShadow: '0 4px 14px rgba(245, 158, 11, 0.35)',
                                }
                            }}
                        >
                            {item.text}
                        </Button>
                    );
                }

                const button = (
                    <Button
                        key={item.path}
                        component={RouterLink}
                        to={item.path}
                        startIcon={item.icon}
                        sx={{
                            px: 2,
                            py: 1,
                            borderRadius: '10px',
                            fontWeight: active ? 600 : 500,
                            textTransform: 'none',
                            color: active ? 'primary.main' : 'text.secondary',
                            backgroundColor: active ? alpha('#6366f1', 0.1) : 'transparent',
                            '&:hover': {
                                backgroundColor: active ? alpha('#6366f1', 0.15) : alpha('#6366f1', 0.05),
                            }
                        }}
                    >
                        {item.text}
                    </Button>
                );

                if (item.badge && item.badge > 0) {
                    return (
                        <Badge
                            key={item.path}
                            badgeContent={item.badge}
                            color="error"
                            sx={{
                                '& .MuiBadge-badge': {
                                    fontWeight: 600,
                                    fontSize: '0.7rem',
                                }
                            }}
                        >
                            {button}
                        </Badge>
                    );
                }

                return button;
            })}
        </Box>
    );
};

const MobileNavigationDrawer = () => {
    const { unreviewedCount } = UserAuth();
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

    const navItems: NavItem[] = [
        { text: '홈', path: '/', icon: <HomeRoundedIcon /> },
        { text: '🎮 데모써보기', path: '/demo/solved-problems', icon: <PlayCircleFilledRoundedIcon />, isDemo: true },
        { text: '푼 문제들', path: '/solved-problems', icon: <ListAltRoundedIcon /> },
        { text: '복습 대기 문제들', path: '/review-unclear', icon: <PendingActionsRoundedIcon />, badge: unreviewedCount },
        { text: '복습 완료 문제들', path: '/review-clear', icon: <CheckCircleRoundedIcon /> },
        { text: '태그별 문제들', path: '/tag', icon: <LocalOfferRoundedIcon /> },
        { text: '북마크 문제들', path: '/favorite', icon: <BookmarkRoundedIcon /> },
    ];

    const isActive = (path: string) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    const ListComponent = () => (
        <Box
            sx={{
                width: 280,
                height: '100%',
                background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
            }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Logo />
            </Box>
            <List sx={{ px: 2, py: 2 }}>
                {navItems.map((item) => {
                    const active = isActive(item.path);

                    return (
                        <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemButton
                                component={RouterLink}
                                to={item.path}
                                sx={{
                                    borderRadius: '12px',
                                    py: 1.5,
                                    backgroundColor: active ? alpha('#6366f1', 0.1) : 'transparent',
                                    '&:hover': {
                                        backgroundColor: alpha('#6366f1', 0.08),
                                    }
                                }}
                            >
                                <ListItemIcon sx={{
                                    minWidth: 40,
                                    color: item.isDemo ? '#f59e0b' : active ? 'primary.main' : 'text.secondary'
                                }}>
                                    {item.icon}
                                </ListItemIcon>
                                {item.badge ? (
                                    <Badge badgeContent={item.badge} color="error" sx={{ flexGrow: 1 }}>
                                        <ListItemText
                                            primary={item.text}
                                            primaryTypographyProps={{
                                                fontWeight: active ? 600 : 500,
                                                color: active ? 'primary.main' : 'text.primary',
                                            }}
                                        />
                                    </Badge>
                                ) : (
                                    <ListItemText
                                        primary={item.text}
                                        primaryTypographyProps={{
                                            fontWeight: active ? 600 : 500,
                                            color: item.isDemo ? '#f59e0b' : active ? 'primary.main' : 'text.primary',
                                        }}
                                    />
                                )}
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );

    return (
        <>
            <IconButton
                size="large"
                edge="start"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{
                    mr: 1,
                    display: { lg: 'none' },
                    color: 'text.primary',
                    '&:hover': {
                        backgroundColor: alpha('#6366f1', 0.1),
                    }
                }}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor="left"
                open={open}
                onClose={toggleDrawer(false)}
                PaperProps={{
                    sx: {
                        borderRadius: '0 24px 24px 0',
                        boxShadow: '10px 0 40px rgba(0,0,0,0.1)',
                    }
                }}
            >
                <ListComponent />
            </Drawer>
        </>
    );
};

const MyAppBar = () => {
    return (
        <Container sx={{ minHeight: 80, pt: 2 }} maxWidth='xl'>
            <AppBar
                position="static"
                sx={{
                    height: 'auto',
                    background: 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.06)',
                    border: '1px solid',
                    borderColor: 'rgba(0, 0, 0, 0.05)',
                    borderRadius: '16px',
                    px: { xs: 1, md: 3 },
                    py: 1,
                }}
            >
                <Toolbar sx={{ minHeight: '56px !important' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: { xs: 1, lg: 0 } }}>
                        <MobileNavigationDrawer />
                        <Logo />
                        <NavigationButtons />
                    </Box>
                    <Box sx={{ flexGrow: { xs: 0, lg: 1 } }} />
                    <UserStatus />
                </Toolbar>
            </AppBar>
        </Container>
    );
};

export default MyAppBar;