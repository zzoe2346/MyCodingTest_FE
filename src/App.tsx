import './App.css'
import MyAppBar from './components/AppBar'
import {Route, Routes} from 'react-router-dom'
import Review from './pages/Review'
import AuthPage from './pages/AuthPage'
import {AuthProvider} from "./context/AuthContext.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import SolveProblemListPage from "./pages/SolvedProblemListPage.tsx";

function App() {
    return (
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
            </Routes>
        </AuthProvider>
    )
}

export default App
