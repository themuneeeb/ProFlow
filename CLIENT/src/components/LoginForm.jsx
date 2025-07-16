// src/components/LoginForm.jsx
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import OAuthButton from './OAuthButton';
import { loginValidationSchema } from '../validation/validationSchema';
import { login } from '../api/auth';

export default function LoginForm({ onSwitch }) {
  const [serverError, setServerError] = useState('');

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginValidationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setServerError('');
        try {
          const response = await login(values);
          console.log('Logged in:', response.data);
          // TODO: store token / redirect
        } catch (error) {
          setServerError(error.response?.data?.message || 'Login failed');
        } finally {
          setSubmitting(false);
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
            <label className="absolute left-3 text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-valid:top-0 peer-valid:text-xs">
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
            <label className="absolute left-3 text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-valid:top-0 peer-valid:text-xs">
              Password
            </label>
            <ErrorMessage name="password" component="div" className="text-sm text-red-500 mt-1" />
          </div>

          {/* Submit */}
          <button type="submit" disabled={isSubmitting} className="w-full h-12 bg-[#1DAEEA] text-white rounded-lg hover:bg-blue-700 transition">
            Log In
          </button>

          {/* Log in with Google */}
          <OAuthButton label="Log in with Google" />

          {/* Switch to Register */}
          <p className="text-center text-gray-500">
            Don’t have an account?{' '}
            <button type="button" onClick={onSwitch} className="text-blue-600 hover:underline">
              Sign up
            </button>
          </p>
        </Form>
      )}
    </Formik>
  );
}
