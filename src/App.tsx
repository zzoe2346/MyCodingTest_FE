import './App.css'
import MyAppBar from './components/AppBar'
import {Route, Routes} from 'react-router-dom'
import Review from './pages/Review'
import AuthPage from './pages/AuthPage'
import {AuthProvider} from "./context/AuthContext.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import SolveProblemListPage from "./pages/AllSolvedProblemPage.tsx";
import {createTheme, ThemeProvider} from "@mui/material";
import FavoirteSolvedProblem from "./pages/FavoriteSolvedProblemPage.tsx";
import ReviewClearSolvedProblemPage from "./pages/ReviewClearSolvedProblemPage.tsx";
import ReviewUnClearSolvedProblemPage from "./pages/ReviewUnClearSolvedProblemPage.tsx";

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
    },


});


function App() {
    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <MyAppBar/>
                <Routes>
                    <Route path="/login" element={<AuthPage/>}/>
                    <Route path="/solvedProblems" element={<SolveProblemListPage/>}/>
                    <Route
                        path="/review"
                        element={
                            <PrivateRoute>
                                <Review/>
                            </PrivateRoute>
                        }
                    />
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
                </Routes>
            </AuthProvider>
        </ThemeProvider>
    )
}

export default App
