// src/components/WorkspaceDashboard.jsx
import { useEffect, useState } from 'react'
import api from '../api/axiosConfig'

export default function WorkspaceDashboard() {
  const [workspaces, setWorkspaces] = useState([])

  useEffect(() => {
    async function load() {
      const { data } = await api.get('/users/me/workspaces')
      setWorkspaces(data)
    }
    load()
  }, [])

  return (
    <div className="p-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {workspaces.map((ws) => (
        <div key={ws._id} className="border rounded-lg p-4 shadow">
          <h3 className="font-semibold">{ws.name}</h3>
          <p className="text-sm text-gray-500">{ws.description}</p>
        </div>
      ))}
    </div>
  )
}
