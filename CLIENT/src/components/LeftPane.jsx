// src/components/LeftPane.jsx
import leftbg from '../assets/authpage_bg.jpg'
export default function LeftPane() {
  return (
    <div
      className="w-1/2 hidden lg:block bg-cover bg-center"
      style={{ backgroundImage: `url(${leftbg})` }}
    />
  )
}
