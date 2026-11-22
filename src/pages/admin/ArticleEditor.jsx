// src/pages/admin/ArticleEditor.jsx
// Create (/admin/articles/new) and edit (/admin/articles/edit/:id) share this page.
import {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {useNavigate, useParams} from 'react-router-dom'
import toast from 'react-hot-toast'

import RichTextEditor from '../../components/admin/RichTextEditor'
import {cmsApi} from '../../lib/cmsApi'
import {rebuildMessage} from './rebuildMessage'

const EMPTY = {
  id: '',
  slug: '',
  title_ar: '',
  title_en: '',
  excerpt_ar: '',
  excerpt_en: '',
  content_ar: '',
  content_en: '',
  image: '',
  image_alt_ar: '',
  image_alt_en: '',
  category_ar: '',
  category_en: '',
  author: 'فريق لحظات',
  seo_title_ar: '',
  seo_title_en: '',
  seo_description_ar: '',
  seo_description_en: '',
  status: 'draft',
  published_at: '',
}

const MAX_CONTENT = 45000
const inputClass =
  'w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-content outline-none focus:border-primary focus:ring-2 focus:ring-primary/20'

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90)

// <input type="datetime-local"> wants local time "YYYY-MM-DDTHH:mm", the API stores ISO (UTC).
function toLocalInput(iso) {
  if (!iso) return ''
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  return local.toISOString().slice(0, 16)
}

const fromLocalInput = (value) => (value ? new Date(value).toISOString() : '')

function Field({label, hint, counter, children}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <label className="text-sm font-medium text-content-muted">{label}</label>
        {counter && (
          <span className={`text-xs ${counter.over ? 'text-error' : 'text-content-muted'}`}>
            {counter.value}/{counter.max}
          </span>
        )}
      </div>
      {children}
      {hint && <p className="text-xs text-content-muted">{hint}</p>}
    </div>
  )
}

Field.propTypes = {
  label: PropTypes.string.isRequired,
  hint: PropTypes.string,
  counter: PropTypes.shape({value: PropTypes.number, max: PropTypes.number, over: PropTypes.bool}),
  children: PropTypes.node.isRequired,
}

function Panel({title, children}) {
  return (
    <section className="space-y-4 rounded-2xl border border-border bg-surface p-5">
      <h2 className="text-lg font-bold">{title}</h2>
      {children}
    </section>
  )
}

Panel.propTypes = {title: PropTypes.string.isRequired, children: PropTypes.node.isRequired}

export default function ArticleEditor() {
  const {id} = useParams()
  const navigate = useNavigate()

  const [article, setArticle] = useState(EMPTY)
  const [loading, setLoading] = useState(Boolean(id))
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState([])
  const [slugTouched, setSlugTouched] = useState(Boolean(id))
  const [lang, setLang] = useState('ar')
  const [dirty, setDirty] = useState(false)

  useEffect(() => {
    if (!id) return
    let active = true
    cmsApi
      .getArticle(id)
      .then((data) => active && setArticle({...EMPTY, ...data.article}))
      .catch((err) => {
        if (err.status === 401) navigate('/admin', {replace: true})
        else {
          toast.error(err.message)
          navigate('/admin/articles', {replace: true})
        }
      })
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [id, navigate])

  // Warn before closing the tab with unsaved changes.
  useEffect(() => {
    if (!dirty) return
    const handler = (event) => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [dirty])

  function update(field, value) {
    setDirty(true)
    setArticle((previous) => {
      const next = {...previous, [field]: value}
      if (field === 'title_en' && !slugTouched) next.slug = slugify(value)
      return next
    })
  }

  async function save(status) {
    setSaving(true)
    setErrors([])

    try {
      const data = await cmsApi.saveArticle({...article, status})
      setDirty(false)
      toast.success(rebuildMessage(data.rebuild, status === 'published' || article.status === 'published'), {duration: 6000})

      if (status === 'published') navigate('/admin/articles')
      else setArticle((previous) => ({...previous, ...data.article}))
    } catch (err) {
      if (err.status === 401) return navigate('/admin', {replace: true})
      setErrors(err.details && err.details.length ? err.details : [err.message])
      window.scrollTo({top: 0, behavior: 'smooth'})
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="text-content-muted">جارٍ تحميل المقال...</p>

  const isPublished = article.status === 'published'
  const seoTitle = article.seo_title_ar || article.title_ar
  const seoDescription = article.seo_description_ar || article.excerpt_ar
  const contentKey = `content_${lang}`

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">{id || article.id ? 'تعديل المقال' : 'مقال جديد'}</h1>
        <button type="button" onClick={() => navigate('/admin/articles')} className="rounded-full border border-border px-4 py-2 text-sm hover:bg-primary/10">
          رجوع للمقالات
        </button>
      </div>

      {errors.length > 0 && (
        <div role="alert" className="rounded-2xl border border-error/40 bg-error/10 p-4 text-sm text-error">
          <ul className="list-disc ps-5">
            {errors.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        </div>
      )}

      <Panel title="البيانات الأساسية">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="العنوان بالعربية *" counter={{value: article.title_ar.length, max: 120, over: article.title_ar.length > 120}}>
            <input className={inputClass} value={article.title_ar} maxLength={120} onChange={(e) => update('title_ar', e.target.value)} />
          </Field>
          <Field label="Title in English" counter={{value: article.title_en.length, max: 120, over: article.title_en.length > 120}}>
            <input dir="ltr" className={inputClass} value={article.title_en} maxLength={120} onChange={(e) => update('title_en', e.target.value)} />
          </Field>
          <Field label="الرابط (Slug) *" hint="إنجليزي صغير وشرطات فقط، ويُفضّل كلمات مفتاحية. مثال: understanding-anxiety. لا تغيّره بعد النشر حتى لا تفقد ترتيب جوجل.">
            <input
              dir="ltr"
              className={inputClass}
              value={article.slug}
              maxLength={90}
              onChange={(e) => {
                setSlugTouched(true)
                update('slug', e.target.value.toLowerCase())
              }}
            />
          </Field>
          <Field label="الكاتب">
            <input className={inputClass} value={article.author} maxLength={80} onChange={(e) => update('author', e.target.value)} />
          </Field>
          <Field label="التصنيف بالعربية">
            <input className={inputClass} value={article.category_ar} maxLength={60} onChange={(e) => update('category_ar', e.target.value)} />
          </Field>
          <Field label="Category in English">
            <input dir="ltr" className={inputClass} value={article.category_en} maxLength={60} onChange={(e) => update('category_en', e.target.value)} />
          </Field>
          <Field label="الوصف المختصر بالعربية * (يظهر في بطاقة المقال)" counter={{value: article.excerpt_ar.length, max: 320, over: article.excerpt_ar.length > 320}}>
            <textarea className={`${inputClass} min-h-24`} value={article.excerpt_ar} maxLength={320} onChange={(e) => update('excerpt_ar', e.target.value)} />
          </Field>
          <Field label="Excerpt in English" counter={{value: article.excerpt_en.length, max: 320, over: article.excerpt_en.length > 320}}>
            <textarea dir="ltr" className={`${inputClass} min-h-24`} value={article.excerpt_en} maxLength={320} onChange={(e) => update('excerpt_en', e.target.value)} />
          </Field>
        </div>
      </Panel>

      <Panel title="الصورة الرئيسية">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="رابط الصورة" hint="https://... أو مسار داخل الموقع مثل /images/resources/name.webp. المقاس المفضل 1200×630 وبصيغة WebP وأقل من 200KB.">
            <input dir="ltr" className={inputClass} value={article.image} maxLength={500} onChange={(e) => update('image', e.target.value)} />
          </Field>
          <div className="grid gap-4">
            <Field label="النص البديل بالعربية (Alt) — مهم للسيو وإمكانية الوصول">
              <input className={inputClass} value={article.image_alt_ar} maxLength={160} onChange={(e) => update('image_alt_ar', e.target.value)} />
            </Field>
            <Field label="Image alt in English">
              <input dir="ltr" className={inputClass} value={article.image_alt_en} maxLength={160} onChange={(e) => update('image_alt_en', e.target.value)} />
            </Field>
          </div>
        </div>
        {article.image && <img src={article.image} alt="" className="max-h-56 rounded-2xl border border-border object-cover" />}
      </Panel>

      <Panel title="محتوى المقال">
        <div className="flex gap-2" role="tablist">
          {[
            ['ar', 'العربية'],
            ['en', 'English'],
          ].map(([code, label]) => (
            <button
              key={code}
              type="button"
              role="tab"
              aria-selected={lang === code}
              onClick={() => setLang(code)}
              className={`rounded-full px-5 py-2 text-sm font-medium ${lang === code ? 'bg-primary text-white' : 'border border-border hover:bg-primary/10'}`}
            >
              {label}
            </button>
          ))}
        </div>

        <RichTextEditor
          key={`${article.id || 'new'}-${lang}`}
          value={article[contentKey]}
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
          placeholder={lang === 'ar' ? 'اكتب المقال بالعربية...' : 'Write the article in English...'}
          onChange={(html) => update(contentKey, html)}
        />
        <p className={`text-xs ${article[contentKey].length > MAX_CONTENT ? 'text-error' : 'text-content-muted'}`}>
          {article[contentKey].length}/{MAX_CONTENT} حرفًا (بما فيها وسوم HTML). استخدم H2 للأقسام وH3 للفرعي؛ عنوان المقال هو الـ H1 تلقائيًا. النسخة الإنجليزية اختيارية، وإن تُركت فارغة يظهر المحتوى العربي.
        </p>
      </Panel>

      <Panel title="إعدادات السيو (SEO)">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="عنوان السيو بالعربية" hint="اتركه فارغًا لاستخدام عنوان المقال." counter={{value: article.seo_title_ar.length, max: 60, over: article.seo_title_ar.length > 60}}>
            <input className={inputClass} value={article.seo_title_ar} maxLength={90} onChange={(e) => update('seo_title_ar', e.target.value)} />
          </Field>
          <Field label="SEO title (English)" counter={{value: article.seo_title_en.length, max: 60, over: article.seo_title_en.length > 60}}>
            <input dir="ltr" className={inputClass} value={article.seo_title_en} maxLength={90} onChange={(e) => update('seo_title_en', e.target.value)} />
          </Field>
          <Field label="وصف السيو بالعربية" hint="اتركه فارغًا لاستخدام الوصف المختصر." counter={{value: article.seo_description_ar.length, max: 160, over: article.seo_description_ar.length > 160}}>
            <textarea className={`${inputClass} min-h-24`} value={article.seo_description_ar} maxLength={200} onChange={(e) => update('seo_description_ar', e.target.value)} />
          </Field>
          <Field label="SEO description (English)" counter={{value: article.seo_description_en.length, max: 160, over: article.seo_description_en.length > 160}}>
            <textarea dir="ltr" className={`${inputClass} min-h-24`} value={article.seo_description_en} maxLength={200} onChange={(e) => update('seo_description_en', e.target.value)} />
          </Field>
        </div>

        <div className="rounded-2xl border border-border bg-surface-alt p-4" dir="rtl">
          <p className="mb-2 text-xs text-content-muted">معاينة تقريبية لنتيجة جوجل</p>
          <p className="truncate text-lg text-[#1a0dab] dark:text-[#8ab4f8]">{seoTitle || 'عنوان المقال'}</p>
          <p className="text-xs text-success" dir="ltr">…/resources/{article.slug || 'article-slug'}</p>
          <p className="line-clamp-2 text-sm text-content-muted">{seoDescription || 'وصف المقال سيظهر هنا.'}</p>
        </div>
      </Panel>

      <Panel title="النشر">
        <Field label="تاريخ ووقت النشر" hint="اتركه فارغًا ليُنشر الآن. التاريخ المستقبلي يظهر فقط بعد أول تحديث للموقع يلي ذلك التاريخ.">
          <input
            type="datetime-local"
            className={`${inputClass} md:max-w-xs`}
            value={toLocalInput(article.published_at)}
            onChange={(e) => update('published_at', fromLocalInput(e.target.value))}
          />
        </Field>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            disabled={saving}
            onClick={() => save('draft')}
            className="rounded-full border border-border px-6 py-3 text-sm font-semibold hover:bg-primary/10 disabled:opacity-50"
          >
            {isPublished ? 'تحويل إلى مسودة (إخفاء)' : 'حفظ كمسودة'}
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => save('published')}
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-50"
          >
            {saving ? 'جارٍ الحفظ...' : isPublished ? 'تحديث المقال المنشور' : 'نشر المقال'}
          </button>
        </div>
      </Panel>
    </div>
  )
}
