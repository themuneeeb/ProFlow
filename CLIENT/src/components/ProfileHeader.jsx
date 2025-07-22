// src/components/ProfileHeader.jsx
import { useEffect, useState } from 'react'
import { User as UserIcon } from 'lucide-react'
import api from '../api/axiosConfig'

export default function ProfileHeader() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function fetchMe() {
      const { data } = await api.get('/users/me')
      setUser(data)
    }
    fetchMe()
  }, [])

  return (
    <header className="w-full bg-[#0D0659] text-white flex justify-end items-center p-4 space-x-4">
      {user ? (
        <>
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt="Profile"
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <UserIcon className="h-10 w-10" />
          )}
          <span className="font-medium">{user.name}</span>
        </>
      ) : (
        <div className="animate-pulse h-10 w-40 bg-gray-700 rounded" />
      )}
    </header>
  )
}
