// src/pages/admin/AdminLogin.jsx
import {useEffect, useState} from 'react'
import {Helmet} from 'react-helmet-async'
import {useNavigate} from 'react-router-dom'

import Button from '../../components/ui/Button'
import {cmsApi} from '../../lib/cmsApi'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Already signed in? Go straight to the dashboard.
  useEffect(() => {
    cmsApi
      .session()
      .then(() => navigate('/admin/articles', {replace: true}))
      .catch(() => {})
  }, [navigate])

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      await cmsApi.login(password)
      setPassword('')
      navigate('/admin/articles', {replace: true})
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main dir="rtl" className="flex min-h-screen items-center justify-center bg-surface-alt p-5">
      <Helmet>
        <title>تسجيل الدخول</title>
        <meta name="robots" content="noindex, nofollow, noarchive" />
      </Helmet>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-5 rounded-3xl border border-border bg-surface p-8 shadow-xl"
      >
        <div>
          <h1 className="text-2xl font-bold text-content">لوحة التحكم</h1>
          <p className="mt-2 text-sm text-content-muted">هذه الصفحة مخصصة لمدير الموقع فقط.</p>
        </div>

        <div className="space-y-2">
          <label htmlFor="admin-password" className="text-sm font-medium text-content-muted">
            كلمة المرور
          </label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
            maxLength={200}
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-content outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-error">
            {error}
          </p>
        )}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'جارٍ تسجيل الدخول...' : 'تسجيل الدخول'}
        </Button>
      </form>
    </main>
  )
}
