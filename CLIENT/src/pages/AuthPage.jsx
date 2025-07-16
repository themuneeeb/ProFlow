// src/pages/AuthPage.jsx
import { useState } from 'react'
import LeftPane from '../components/LeftPane'
import RightPane from '../components/RightPane'

export default function AuthPage() {
  const [mode, setMode] = useState('register') // or 'login'

  return (
    <div className="min-h-screen flex">
      <LeftPane />
      <RightPane mode={mode} onSwitchMode={setMode} />
    </div>
  )
}
