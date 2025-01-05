import './App.css'
import MyAppBar from './components/AppBar'
import { Route, Routes } from 'react-router-dom'
import SolvedInfo from './pages/solvedInfo'
import Review from './pages/Review'
import AuthPage from './pages/AuthPage'

function App() {
  return (
    <>
      <MyAppBar />

      <Routes>
        <Route path="/" element={<SolvedInfo />} />
        <Route path="/review" element={<Review />} />
        <Route path="/login" element={<AuthPage />} />
      </Routes>
    </>
  )
}

export default App
