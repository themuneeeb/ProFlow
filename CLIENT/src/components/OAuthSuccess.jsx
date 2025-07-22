import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function OAuthSuccess() {
  const [params] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const token = params.get('token')
    if (token) {
      localStorage.setItem('token', token)
      navigate('/dashboard', { replace: true })
    } else {
      navigate('/auth', { replace: true })
    }
  }, [])

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg">Signing you in…</p>
    </div>
  )
}
