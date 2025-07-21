// src/components/RegisterForm.jsx
import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import OAuthButton from './OAuthButton'
import { registerValidationSchema } from '../validation/validationSchema'
import { signup } from '../api/auth'

export default function RegisterForm({ onSwitch, onNeedOtp }) {
  const [serverError, setServerError] = useState('')
  const [redirectingToOtp, setRedirectingToOtp] = useState(false)

  // show full-screen loader if moving to OTP
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
    <Formik
      initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
      validationSchema={registerValidationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setServerError('')
        try {
          const { data } = await signup({
            name: values.name,
            email: values.email,
            password: values.password,
          })
          console.log('Registered:', data)
          // show overlay while switching
          setRedirectingToOtp(true)
          onNeedOtp(values.email)
        } catch (error) {
          setServerError(
            error.response?.data?.message || 'Registration failed'
          )
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

          {/* Name */}
          <div className="relative">
            <Field
              name="name"
              type="text"
              placeholder=" "
              className="peer h-12 w-full border border-gray-300 rounded-lg px-3 placeholder-transparent focus:outline-none focus:border-blue-500"
            />
            <label className="absolute left-3 text-gray-500 transition-all
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm
              peer-focus:top-0 peer-focus:text-xs
              peer-valid:top-0 peer-valid:text-xs">
              Name
            </label>
            <ErrorMessage name="name" component="div" className="text-sm text-red-500 mt-1" />
          </div>

          {/* Email */}
          <div className="relative">
            <Field
              name="email"
              type="email"
              placeholder=" "
              className="peer h-12 w-full border border-gray-300 rounded-lg px-3 placeholder-transparent focus:outline-none focus:border-blue-500"
            />
            <label className="absolute left-3 text-gray-500 transition-all
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm
              peer-focus:top-0 peer-focus:text-xs
              peer-valid:top-0 peer-valid:text-xs">
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
            <label className="absolute left-3 text-gray-500 transition-all
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm
              peer-focus:top-0 peer-focus:text-xs
              peer-valid:top-0 peer-valid:text-xs">
              Password
            </label>
            <ErrorMessage name="password" component="div" className="text-sm text-red-500 mt-1" />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Field
              name="confirmPassword"
              type="password"
              placeholder=" "
              className="peer h-12 w-full border border-gray-300 rounded-lg px-3 placeholder-transparent focus:outline-none focus:border-blue-500"
            />
            <label className="absolute left-3 text-gray-500 transition-all
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm
              peer-focus:top-0 peer-focus:text-xs
              peer-valid:top-0 peer-valid:text-xs">
              Confirm Password
            </label>
            <ErrorMessage name="confirmPassword" component="div" className="text-sm text-red-500 mt-1" />
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
              'Sign Up'
            )}
          </button>

          {/* Sign up with Google */}
          <OAuthButton label="Sign up with Google" />

          {/* Switch to Login */}
          <p className="text-center text-gray-500">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => onSwitch('login')}
              className="text-blue-600 hover:underline"
            >
              Sign in
            </button>
          </p>
        </Form>
      )}
    </Formik>
  )
}
