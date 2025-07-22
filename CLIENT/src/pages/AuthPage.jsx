// src/pages/AuthPage.jsx
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import LeftPane from '../components/LeftPane'
import RightPane from '../components/RightPane'

export default function AuthPage() {
  const { state } = useLocation()
  // default to register, or use passed-in initialMode
  const initial = state?.initialMode === 'login' ? 'login' : 'register'
  const [mode, setMode] = useState(initial)

  return (
    <div className="min-h-screen flex">
      <LeftPane />
      <RightPane mode={mode} onSwitchMode={setMode} />
    </div>
  )
}
