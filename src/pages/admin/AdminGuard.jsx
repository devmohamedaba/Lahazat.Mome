// src/pages/admin/AdminGuard.jsx
// UX guard only. The REAL protection is the server: every /api/admin/* call verifies the signed cookie.
import {useEffect, useState} from 'react'
import {Navigate, Outlet} from 'react-router-dom'

import {cmsApi} from '../../lib/cmsApi'
import AdminLayout from './AdminLayout'

export default function AdminGuard() {
  const [state, setState] = useState('checking') // checking | ok | denied | error
  const [message, setMessage] = useState('')

  useEffect(() => {
    let active = true
    cmsApi
      .session()
      .then(() => active && setState('ok'))
      .catch((error) => {
        if (!active) return
        if (error.status === 401) setState('denied')
        else {
          setMessage(error.message)
          setState('error')
        }
      })
    return () => {
      active = false
    }
  }, [])

  if (state === 'denied') return <Navigate to="/admin" replace />

  if (state === 'checking') {
    return (
      <div dir="rtl" className="flex min-h-screen items-center justify-center bg-surface-alt text-content-muted">
        جارٍ التحقق من الجلسة...
      </div>
    )
  }

  if (state === 'error') {
    return (
      <div dir="rtl" className="flex min-h-screen items-center justify-center bg-surface-alt p-6 text-center text-error">
        {message}
      </div>
    )
  }

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  )
}
