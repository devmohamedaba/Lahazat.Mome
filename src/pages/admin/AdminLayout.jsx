// src/pages/admin/AdminLayout.jsx
import PropTypes from 'prop-types'
import {Helmet} from 'react-helmet-async'
import {Link, useNavigate} from 'react-router-dom'

import {cmsApi} from '../../lib/cmsApi'

export default function AdminLayout({children}) {
  const navigate = useNavigate()

  async function logout() {
    try {
      await cmsApi.logout()
    } finally {
      navigate('/admin', {replace: true})
    }
  }

  return (
    <div dir="rtl" className="min-h-screen bg-surface-alt text-content">
      <Helmet>
        <title>لوحة التحكم</title>
        <meta name="robots" content="noindex, nofollow, noarchive" />
      </Helmet>

      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link to="/admin/articles" className="text-lg font-bold text-primary">
            لوحة تحكم لحظات
          </Link>

          <nav className="flex items-center gap-2 text-sm">
            <Link to="/resources" target="_blank" rel="noopener" className="rounded-lg px-3 py-2 text-content-muted hover:bg-primary/10">
              عرض الموقع
            </Link>
            <button
              type="button"
              onClick={logout}
              className="rounded-lg border border-border px-3 py-2 text-content hover:bg-primary/10"
            >
              تسجيل الخروج
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  )
}

AdminLayout.propTypes = {children: PropTypes.node.isRequired}
