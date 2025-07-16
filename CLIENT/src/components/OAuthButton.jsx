// src/components/OAuthButton.jsx
import logo from '../assets/google-logo.png';
export default function OAuthButton({ label = 'Continue with Google' }) {
  return (
    <a
      href={`${import.meta.env.VITE_API_URL}/auth/google`}
      className="block w-full h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition"
    >
      <img
        src={logo}
        alt="Google logo"
        className="h-6 w-6 mr-2"
      />
      <span className="text-gray-700 font-medium">{label}</span>
    </a>
  )
}
