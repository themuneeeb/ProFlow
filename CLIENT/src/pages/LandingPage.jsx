// src/components/LandingPage.jsx
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import bgImage from '../assets/web_bg1.png'

export default function LandingPage() {
  const navigate = useNavigate()
  const headingText =
    'ProFlow – A Smart Enterprise Project & Performance Management Platform'
  const descriptionText =
    'A smart platform that streamlines project and performance management. With real-time tracking, collaboration tools, and data-driven insights, ProFlow helps optimize workflows and boost productivity.'

  const [isVisible, setIsVisible] = useState(false)
  const [isButtonsVisible, setIsButtonsVisible] = useState(false)

  useEffect(() => {
    const textTimer = setTimeout(() => setIsVisible(true), 500)
    const buttonsTimer = setTimeout(() => setIsButtonsVisible(true), 1500)
    return () => {
      clearTimeout(textTimer)
      clearTimeout(buttonsTimer)
    }
  }, [])

  const handleJoin = () => {
    navigate('/auth', { state: { initialMode: 'login' } })
  }

  const handleCreate = () => {
    navigate('/auth', { state: { initialMode: 'register' } })
  }

  return (
    <div
      className="h-screen bg-cover bg-center px-6 md:px-0"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="h-full flex items-center">
        <div className="pl-6 md:pl-24 mb-10 md:mb-40 max-w-lg w-full">
          <h1
            className={`text-2xl md:text-[24px] font-bold text-white leading-tight whitespace-pre-wrap ${
              isVisible
                ? 'opacity-100 transition-opacity duration-1000'
                : 'opacity-0'
            }`}
          >
            {headingText}
          </h1>

          <p
            className={`mt-4 text-base md:text-[18px] text-white whitespace-pre-wrap ${
              isVisible
                ? 'opacity-100 transition-opacity duration-1000 delay-500'
                : 'opacity-0'
            }`}
          >
            {descriptionText}
          </p>

          <div
            className={`mt-8 mr-15 flex justify-center space-x-4 ${
              isButtonsVisible
                ? 'opacity-100 transition-opacity duration-1000 delay-500'
                : 'opacity-0'
            }`}
          >
            <button className="bubbles">
              <span className="text">Join Workspace</span>
            </button>
            <button onClick={handleCreate} className="bubbles">
              <span className="text">Create Workspace</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
