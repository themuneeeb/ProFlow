// src/components/RightPane.jsx
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'

export default function RightPane({ mode, onSwitchMode }) {
  return (
    <div className="w-full lg:w-1/2 flex flex-col justify-center p-8">
      {/* Logo & Titles */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#1DAEEA]">ProFlow</h1>
        <h2 className="mt-2 text-2xl font-semibold">Welcome to the Family</h2>
        <p className="mt-1 text-gray-500">
          Streamline your workflow with powerful tools and seamless integrations, boosting efficiency and collaboration.
        </p>
      </div>

      {/* Form */}
      {mode === 'register' ? (
        <RegisterForm onSwitch={() => onSwitchMode('login')} />
      ) : (
        <LoginForm onSwitch={() => onSwitchMode('register')} />
      )}
    </div>
  )
}
