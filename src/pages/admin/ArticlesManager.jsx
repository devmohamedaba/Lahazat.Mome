// src/pages/admin/ArticlesManager.jsx
import {useCallback, useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'

import {cmsApi} from '../../lib/cmsApi'
import {rebuildMessage} from './rebuildMessage'

const formatDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString('ar-EG', {year: 'numeric', month: 'short', day: 'numeric'}) : '—'

export default function ArticlesManager() {
  const navigate = useNavigate()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await cmsApi.listArticles()
      setArticles(
        [...data.articles].sort(
          (a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0),
        ),
      )
    } catch (err) {
      if (err.status === 401) navigate('/admin', {replace: true})
      else setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [navigate])

  useEffect(() => {
    load()
  }, [load])

  async function remove(article) {
    if (!window.confirm(`حذف المقال «${article.title_ar}» نهائيًا؟ لا يمكن التراجع.`)) return
    try {
      const data = await cmsApi.deleteArticle(article.id)
      toast.success(rebuildMessage(data.rebuild, article.status === 'published'))
      load()
    } catch (err) {
      toast.error(err.message)
    }
  }

  const published = articles.filter((a) => a.status === 'published').length

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">إدارة المقالات</h1>
        <Link to="/admin/articles/new" className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark">
          + مقال جديد
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          ['الإجمالي', articles.length],
          ['منشورة', published],
          ['مسودات', articles.length - published],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-border bg-surface p-4">
            <p className="text-sm text-content-muted">{label}</p>
            <p className="mt-1 text-3xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      {error && <p role="alert" className="text-error">{error}</p>}

      {loading ? (
        <p className="text-content-muted">جارٍ تحميل المقالات...</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
          <table className="w-full text-start text-sm">
            <thead className="bg-surface-alt text-content-muted">
              <tr>
                <th className="p-4 text-start">العنوان</th>
                <th className="p-4 text-start">الرابط</th>
                <th className="p-4 text-start">الحالة</th>
                <th className="p-4 text-start">آخر تعديل</th>
                <th className="p-4 text-start">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id} className="border-t border-border">
                  <td className="p-4 font-medium">{article.title_ar}</td>
                  <td className="p-4 text-content-muted" dir="ltr">{article.slug}</td>
                  <td className="p-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${article.status === 'published' ? 'bg-success/15 text-success' : 'bg-warning/15 text-warning'}`}>
                      {article.status === 'published' ? 'منشور' : 'مسودة'}
                    </span>
                  </td>
                  <td className="p-4 text-content-muted">{formatDate(article.updated_at)}</td>
                  <td className="flex flex-wrap gap-3 p-4">
                    <Link to={`/admin/articles/edit/${article.id}`} className="text-primary hover:underline">تعديل</Link>
                    {article.status === 'published' && (
                      <a href={`/resources/${article.slug}`} target="_blank" rel="noopener noreferrer" className="text-content-muted hover:underline">عرض</a>
                    )}
                    <button type="button" onClick={() => remove(article)} className="text-error hover:underline">حذف</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {articles.length === 0 && <p className="p-8 text-center text-content-muted">لا توجد مقالات بعد. ابدأ بإضافة أول مقال.</p>}
        </div>
      )}
    </div>
  )
}
