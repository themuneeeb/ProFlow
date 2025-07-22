// src/components/Sidebar.jsx
import { Home, MessageCircle, Settings, LogOut } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

const items = [
  { label: 'Home',       icon: Home,        to: '/dashboard' },
  { label: 'DMs',        icon: MessageCircle, to: '/dms' },
  { label: 'Profile',    icon: Settings,    to: '/settings' },
  { label: 'Logout',     icon: LogOut,      to: '/logout' },
]

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate()
  return (
    <aside
      className={`
        fixed top-0 left-0 h-full bg-white shadow-lg transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        transition-transform duration-300 z-50 w-64
      `}
    >
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">ProFlow</h2>
        <button onClick={onClose} className="text-gray-500">✕</button>
      </div>
      <nav className="mt-4 space-y-2">
        {items.map((it) => (
          <Link
            key={it.label}
            to={it.to}
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <it.icon className="h-5 w-5 mr-3" />
            {it.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
