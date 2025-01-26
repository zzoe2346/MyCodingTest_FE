import './App.css'
import MyAppBar from './components/AppBar'
import {Route, Routes} from 'react-router-dom'
import ReviewPage from './pages/ReviewPage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import {AuthProvider} from "./context/AuthContext.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import SolveProblemListPage from "./pages/AllSolvedProblemPage.tsx";
import {createTheme, ThemeProvider} from "@mui/material";
import FavoirteSolvedProblem from "./pages/FavoriteSolvedProblemPage.tsx";
import ReviewClearSolvedProblemPage from "./pages/ReviewClearSolvedProblemPage.tsx";
import ReviewUnClearSolvedProblemPage from "./pages/ReviewUnClearSolvedProblemPage.tsx";
import TagPage from "./pages/TagPage.tsx";
import {SnackbarProvider} from "notistack";
import HomePage from "./pages/HomePage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import {NavigateSetter} from "./api/apiClient.ts";
import {useEffect, useRef, useState} from "react";


function App() {
    const appBarRef = useRef<HTMLDivElement>(null);
    const [appBarHeight, setAppBarHeight] = useState(0);
    useEffect(() => {
        if (appBarRef.current) {
            setAppBarHeight(appBarRef.current.offsetHeight);
        }
    }, []);
    const theme = createTheme({
        components: {
            MuiTableCell: {
                styleOverrides: {
                    root: {
                        textAlign: 'center',
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        padding: '4px 8px', // 기본 패딩 조정
                        minWidth: 'auto', // 기본 최소 너비 제거
                        fontSize: '1.0rem', // 텍스트 크기
                    },
                },
            },
            MuiContainer: {
                defaultProps: {
                    maxWidth: 'xl',
                },
                styleOverrides: {
                    root: {
                        height: `calc(90vh - ${appBarHeight}px)`, // 동적으로 가져온 AppBar 높이 사용
                        // height: '90vh',
                        width: '100%',
                        marginTop: '0px',
                        paddingBottom: '20px',
                        overflowY: 'auto',
                    },
                },
            }
        },
    });


    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <SnackbarProvider anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                >
                    <MyAppBar ref={appBarRef}/>
                    <NavigateSetter/>
                    <Routes>
                        <Route path="/review/:reviewId" element={<ReviewPage/>}/>
                        <Route path="/error" element={<ErrorPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/" element={<HomePage/>}/>
                        <Route
                            path="/solved-problems"
                            element={
                                <PrivateRoute>
                                    <SolveProblemListPage/>
                                </PrivateRoute>
                            }/>
                        <Route
                            path="/review/:solvedProblemId"
                            element={
                                <PrivateRoute>
                                    <ReviewPage/>
                                </PrivateRoute>
                            }
                        />
                        {/*<Route path="/review/:solvedProblemId" element={<ReviewPage />} />*/}
                        <Route
                            path="/favorite"
                            element={
                                <PrivateRoute>
                                    <FavoirteSolvedProblem/>
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/review-clear"
                            element={
                                <PrivateRoute>
                                    <ReviewClearSolvedProblemPage/>
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/review-unclear"
                            element={
                                <PrivateRoute>
                                    <ReviewUnClearSolvedProblemPage/>
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/tag"
                            element={
                                <PrivateRoute>
                                    <TagPage/>
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </SnackbarProvider>
            </AuthProvider>
        </ThemeProvider>
    )
}

export default App
