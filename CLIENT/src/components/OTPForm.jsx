// src/components/OTPForm.jsx
import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { verifyOtp, resendOtp } from '../api/auth'

const otpSchema = Yup.object({
  code: Yup.string()
    .length(6, 'Code must be 6 digits')
    .required('Required'),
})

export default function OTPForm({ email, onVerifySuccess, onBack }) {
  const [serverError, setServerError] = useState('')
  const [infoMsg, setInfoMsg] = useState('')
  const [toast, setToast] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [redirecting, setRedirecting] = useState(false)

  // toast slide in/out
  useEffect(() => {
    if (!toast) return
    setShowToast(true)
    const hide = setTimeout(() => setShowToast(false), 3000)
    const clear = setTimeout(() => setToast(''), 3500)
    return () => {
      clearTimeout(hide)
      clearTimeout(clear)
    }
  }, [toast])

  // overlay during verify
  if (redirecting) {
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
          style={{ transform: showToast ? 'translateX(0)' : 'translateX(120%)' }}
        >
          {toast}
        </div>
      )}

      <div className="space-y-6 max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-900">Enter Verification Code</h2>
        <p className="text-gray-500">
          A 6‑digit code has been sent to <strong>{email}</strong>. It will expire in 15
          minutes.
        </p>

        <Formik
          initialValues={{ code: '' }}
          validationSchema={otpSchema}
          onSubmit={async ({ code }, { setSubmitting }) => {
            setServerError('')
            try {
              setRedirecting(true)
              const { data } = await verifyOtp({ email, code })
              setToast('Verified successfully!')
              // store token
              localStorage.setItem('token', data.token)
              // after toast, finish
              setTimeout(() => {
                setRedirecting(false)
                onVerifySuccess(data.token)
              }, 500)
            } catch (err) {
              setServerError(err.response?.data?.message || err.message)
              setRedirecting(false)
            } finally {
              setSubmitting(false)
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div className="relative">
                <Field
                  name="code"
                  type="text"
                  placeholder=" "
                  className="peer h-12 w-full border border-gray-300 rounded-lg px-3 placeholder-transparent focus:outline-none focus:border-blue-500"
                />
                <label
                  className="absolute left-3 text-gray-500 transition-all
                    peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm
                    peer-focus:top-0 peer-focus:text-xs
                    peer-valid:top-0 peer-valid:text-xs"
                >
                  OTP Code
                </label>
                <ErrorMessage
                  name="code"
                  component="div"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              {serverError && (
                <div className="text-sm text-red-500 text-center">{serverError}</div>
              )}
              {infoMsg && (
                <div className="text-sm text-green-600 text-center">{infoMsg}</div>
              )}

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
                  'Verify'
                )}
              </button>
            </Form>
          )}
        </Formik>

        <div className="flex justify-between text-sm">
          <button
            onClick={async () => {
              setServerError('')
              setInfoMsg('')
              try {
                const { data } = await resendOtp({ email })
                setInfoMsg('Code resent')
              } catch (err) {
                setServerError(err.response?.data?.message || err.message)
              }
            }}
            className="text-blue-600 hover:underline"
          >
            Resend code
          </button>
          <button onClick={onBack} className="text-gray-600 hover:underline">
            Back
          </button>
        </div>
      </div>
    </>
  )
}
