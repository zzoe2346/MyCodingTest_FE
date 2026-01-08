import './App.css'
import MyAppBar from './components/AppBar'
import { Route, Routes } from 'react-router-dom'
import ReviewPage from './pages/ReviewPage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import { AuthProvider } from "./context/AuthContext.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import SolveProblemListPage from "./pages/AllSolvedProblemPage.tsx";
import { createTheme, ThemeProvider } from "@mui/material";
import FavoirteSolvedProblem from "./pages/FavoriteSolvedProblemPage.tsx";
import ReviewClearSolvedProblemPage from "./pages/ReviewClearSolvedProblemPage.tsx";
import ReviewUnClearSolvedProblemPage from "./pages/ReviewUnClearSolvedProblemPage.tsx";
import TagPage from "./pages/TagPage.tsx";
import { SnackbarProvider } from "notistack";
import HomePage from "./pages/HomePage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import DemoSolvedProblemPage from "./pages/DemoSolvedProblemPage.tsx";
import DemoReviewPage from "./pages/DemoReviewPage.tsx";
import { NavigateSetter } from "./api/apiClient.ts";

function App() {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#6366f1',
                light: '#818cf8',
                dark: '#4f46e5',
            },
            secondary: {
                main: '#8b5cf6',
                light: '#a78bfa',
                dark: '#7c3aed',
            },
            success: {
                main: '#10b981',
                light: '#d1fae5',
            },
            error: {
                main: '#ef4444',
                light: '#fee2e2',
            },
            warning: {
                main: '#f59e0b',
                light: '#fef3c7',
            },
            background: {
                default: '#f8fafc',
                paper: '#ffffff',
            },
            text: {
                primary: '#0f172a',
                secondary: '#475569',
            },
            divider: '#e2e8f0',
        },
        typography: {
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            h1: { fontWeight: 700 },
            h2: { fontWeight: 700 },
            h3: { fontWeight: 600 },
            h4: { fontWeight: 600 },
            h5: { fontWeight: 600 },
            h6: { fontWeight: 600 },
            button: { fontWeight: 500, textTransform: 'none' as const },
        },
        shape: {
            borderRadius: 12,
        },
        components: {
            MuiTableCell: {
                styleOverrides: {
                    root: {
                        textAlign: 'center',
                        borderColor: '#e2e8f0',
                        padding: '14px 16px',
                    },
                    head: {
                        fontWeight: 600,
                        backgroundColor: '#f8fafc',
                        color: '#475569',
                    }
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 10,
                        fontWeight: 500,
                        textTransform: 'none',
                    },
                },
            },
            MuiContainer: {
                defaultProps: {
                    maxWidth: 'xl',
                },
                styleOverrides: {
                    root: {
                        paddingTop: '16px',
                        paddingBottom: '24px',
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        padding: 16,
                        borderRadius: 16,
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                        border: '1px solid #e2e8f0',
                    }
                }
            },
            MuiTableContainer: {
                styleOverrides: {
                    root: {
                        borderRadius: 16,
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                        border: '1px solid #e2e8f0',
                    }
                }
            },
            MuiRating: {
                styleOverrides: {
                    iconFilled: {
                        color: '#f59e0b',
                    }
                }
            },
            MuiChip: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                        fontWeight: 500,
                    }
                }
            },
            MuiAlert: {
                styleOverrides: {
                    root: {
                        borderRadius: 12,
                    },
                    standardInfo: {
                        backgroundColor: '#eff6ff',
                        border: '1px solid #bfdbfe',
                    }
                }
            }
        }
    });


    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <SnackbarProvider anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                >
                    <MyAppBar />
                    <NavigateSetter />
                    <Routes>
                        <Route path="/review/:reviewId" element={<ReviewPage />} />
                        <Route path="/error" element={<ErrorPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/" element={<HomePage />} />
                        <Route
                            path="/solved-problems"
                            element={
                                <PrivateRoute>
                                    <SolveProblemListPage />
                                </PrivateRoute>
                            } />
                        <Route
                            path="/review/:solvedProblemId"
                            element={
                                <PrivateRoute>
                                    <ReviewPage />
                                </PrivateRoute>
                            }
                        />
                        {/*<Route path="/review/:solvedProblemId" element={<ReviewPage />} />*/}
                        <Route
                            path="/favorite"
                            element={
                                <PrivateRoute>
                                    <FavoirteSolvedProblem />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/review-clear"
                            element={
                                <PrivateRoute>
                                    <ReviewClearSolvedProblemPage />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/review-unclear"
                            element={
                                <PrivateRoute>
                                    <ReviewUnClearSolvedProblemPage />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/tag"
                            element={
                                <PrivateRoute>
                                    <TagPage />
                                </PrivateRoute>
                            }
                        />
                        {/* Demo Routes */}
                        <Route path="/demo/solved-problems" element={<DemoSolvedProblemPage />} />
                        <Route path="/demo/review/:reviewId" element={<DemoReviewPage />} />
                    </Routes>
                </SnackbarProvider>
            </AuthProvider>
        </ThemeProvider>
    )
}

export default App
