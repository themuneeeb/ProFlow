// src/pages/DashboardPage.jsx
import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import ProfileLanding from '../components/ProfileLanding'
import WorkspaceDashboard from '../components/WorkspaceDashboard'
import api from '../api/axiosConfig'

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    api.get('/users/me').then(({ data }) => setUser(data))
  }, [])

  const handleAdd = () => {
    window.location.href = '/create-workspace'
  }

  return (
    <>
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-4 left-4 p-2 bg-white rounded shadow"
      >
        ☰
      </button>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="mt-20">
        {user ? (
          user.workspaces.length > 0 ? (
            <WorkspaceDashboard />
          ) : (
            <ProfileLanding onAdd={handleAdd} />
          )
        ) : (
          <div className="p-8">Loading…</div>
        )}
      </main>
    </>
  )
}
