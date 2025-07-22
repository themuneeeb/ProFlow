// src/App.jsx
import './App.css'
import Header from './components/Header'
import ProfileHeader from './components/ProfileHeader'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import DashboardPage from './pages/DashboardPage'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import OAuthSuccess from './components/OAuthSuccess'

function App() {
  const token = localStorage.getItem('token')

  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Landing – always show main Header */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <LandingPage />
            </>
          }
        />

        {/* 2. Auth – ALWAYS show auth flow, even if logged in */}
        <Route
          path="/auth"
          element={
            <>
              <Header />
              <AuthPage />
            </>
          }
        />

        <Route path="/oauth-success" element={<OAuthSuccess />} />


        {/* 3. Dashboard – protected */}
        <Route
          path="/dashboard"
          element={
            token
              ? (
                <>
                  <ProfileHeader />
                  <DashboardPage />
                </>
              )
              : <Navigate to="/auth" replace />
          }
        />

        {/* 4. Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
