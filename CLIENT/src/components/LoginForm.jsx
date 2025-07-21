// src/components/LoginForm.jsx
import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate } from 'react-router-dom'
import OAuthButton from './OAuthButton'
import { loginValidationSchema } from '../validation/validationSchema'
import { login } from '../api/auth'

export default function LoginForm({ onSwitch, onNeedOtp }) {
  const [serverError, setServerError] = useState('')
  const [toast, setToast] = useState('')
  const [redirectingToOtp, setRedirectingToOtp] = useState(false)
  const navigate = useNavigate()

  // auto-hide toast after 3s
  React.useEffect(() => {
    if (toast) {
      const id = setTimeout(() => setToast(''), 3000)
      return () => clearTimeout(id)
    }
  }, [toast])

  // While awaiting redirect to OTP, show full-screen loader
  if (redirectingToOtp) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <svg
          className="animate-spin h-12 w-12 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      </div>
    )
  }

  return (
    <>
      {toast && (
        <div
          className="fixed top-40 right-4 bg-green-500 text-white px-4 py-2 rounded shadow transition-transform duration-300 ease-out"
          style={{ transform: toast ? 'translateX(0)' : 'translateX(120%)' }}
        >
          {toast}
        </div>
      )}
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginValidationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setServerError('')
          try {
            const { data } = await login(values)
            setToast('Login successful!')
            localStorage.setItem('token', data.token)
            setTimeout(() => navigate('/dashboard'), 500)
          } catch (error) {
            const msg = error.response?.data?.message || 'Login failed'
            if (msg.toLowerCase().includes('verify your email')) {
              // show loader overlay while switching
              setRedirectingToOtp(true)
              onNeedOtp(values.email)
            } else {
              setServerError(msg)
            }
          } finally {
            setSubmitting(false)
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6 max-w-md mx-auto">
            {serverError && (
              <div className="text-sm text-red-500 text-center">{serverError}</div>
            )}

            {/* Email */}
            <div className="relative">
              <Field
                name="email"
                type="email"
                placeholder=" "
                className="peer h-12 w-full border border-gray-300 rounded-lg px-3 placeholder-transparent focus:outline-none focus:border-blue-500"
              />
              <label className="
                absolute left-3 text-gray-500 transition-all
                peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm
                peer-focus:top-0 peer-focus:text-xs
                peer-valid:top-0 peer-valid:text-xs
              ">
                Email
              </label>
              <ErrorMessage name="email" component="div" className="text-sm text-red-500 mt-1" />
            </div>

            {/* Password */}
            <div className="relative">
              <Field
                name="password"
                type="password"
                placeholder=" "
                className="peer h-12 w-full border border-gray-300 rounded-lg px-3 placeholder-transparent focus:outline-none focus:border-blue-500"
              />
              <label className="
                absolute left-3 text-gray-500 transition-all
                peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm
                peer-focus:top-0 peer-focus:text-xs
                peer-valid:top-0 peer-valid:text-xs
              ">
                Password
              </label>
              <ErrorMessage name="password" component="div" className="text-sm text-red-500 mt-1" />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-[#1DAEEA] text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
            >
              {isSubmitting ? (
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
              ) : (
                'Log In'
              )}
            </button>

            {/* Log in with Google */}
            <OAuthButton label="Log in with Google" />

            {/* Switch to Register */}
            <p className="text-center text-gray-500">
              Don’t have an account?{' '}
              <button
                type="button"
                onClick={() => onSwitch('register')}
                className="text-blue-600 hover:underline"
              >
                Sign up
              </button>
            </p>
          </Form>
        )}
      </Formik>
    </>
  )
}
