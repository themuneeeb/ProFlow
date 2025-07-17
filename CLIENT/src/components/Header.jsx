// src/components/Header.jsx
import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const navItems = ['Home', 'About', 'Features', "FAQ's"]

  const handleNavClick = (item) => {
    if (item === 'Home') {
      navigate('/')
    } else {
      // placeholder: future sections
      navigate(`/#${item.toLowerCase()}`)
    }
    setOpen(false)
  }

  return (
    <>
      <header className="bg-[#1DAEEA] text-white h-[130px] flex items-center justify-between px-8 md:px-16 lg:px-24">
        {/* Mobile: Hamburger + Logo + placeholder */}
        <div className="flex items-center w-full md:hidden justify-between">
          <button onClick={() => setOpen(true)} className="p-2 focus:outline-none">
            <Menu size={28} />
          </button>
          <div
            className="text-2xl font-bold cursor-pointer"
            onClick={() => navigate('/')}
          >
            ProFlow
          </div>
          <div className="w-8" />
        </div>

        {/* Desktop: Logo + menu */}
        <div className="hidden md:flex items-center justify-between w-full">
          <div
            className="text-3xl font-bold cursor-pointer"
            onClick={() => navigate('/')}
          >
            ProFlow
          </div>
          <nav className="flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className="px-4 py-2 focus:outline-none transition-all duration-200 hover:underline hover:-translate-y-1 cursor-pointer"
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Side panel for mobile nav */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#1DAEEA] text-white transform transition-transform duration-300 z-50 
          ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between h-20 px-6">
          <div
            className="text-xl font-bold cursor-pointer"
            onClick={() => { navigate('/'); setOpen(false) }}
          >
            ProFlow
          </div>
          <button onClick={() => setOpen(false)} className="p-2 focus:outline-none">
            <X size={24} />
          </button>
        </div>
        <nav className="flex flex-col px-6 space-y-4">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => handleNavClick(item)}
              className="text-left text-lg py-2 focus:outline-none transition-all duration-150 hover:underline"
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      {/* Overlay when open */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  )
}
