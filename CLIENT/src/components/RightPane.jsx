// src/components/RightPane.jsx
import { useState } from 'react';
import RegisterForm from './RegisterForm';
import LoginForm    from './LoginForm';
import OTPForm      from './OTPForm';

export default function RightPane({ mode, onSwitchMode }) {
  const [phase, setPhase] = useState(mode);  // 'register' | 'login' | 'otp'
  const [email, setEmail] = useState('');

  // Called by RegisterForm when OTP is needed
  const handleNeedOtp = (userEmail) => {
    setEmail(userEmail);
    setPhase('otp');
  };

  // After OTP success
  const handleVerified = (token) => {
    // e.g. save token + redirect to login
    console.log('Verified!', token);
    onSwitchMode('login');
  };

  // Back from OTP to registration
  const handleBack = () => {
    setPhase('register');
  };

  // Render the proper form
  if (phase === 'otp') {
    return (
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8">
        <OTPForm
          email={email}
          onVerifySuccess={handleVerified}
          onBack={handleBack}
        />
      </div>
    );
  }

  return (
    <div className="w-full lg:w-1/2 flex flex-col justify-center p-8">
      {/* same header... */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#1DAEEA]">ProFlow</h1>
        <h2 className="mt-2 text-2xl font-semibold">Welcome to the Family</h2>
        <p className="mt-1 text-gray-500">
          Streamline your workflow with powerful tools and seamless integrations, boosting efficiency and collaboration.
        </p>
      </div>

      {phase === 'register' ? (
        <RegisterForm
          onSwitch={() => {
            setPhase('login');
            onSwitchMode('login');
          }}
          onNeedOtp={handleNeedOtp}
        />
      ) : (
        <LoginForm
          onSwitch={() => {
            setPhase('register');
            onSwitchMode('register');
          }}
          onNeedOtp={handleNeedOtp}
        />
      )}
    </div>
  );
}
