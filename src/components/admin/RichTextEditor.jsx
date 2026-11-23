// src/components/admin/RichTextEditor.jsx
// Visual article editor (Tiptap). Stores clean HTML — the same HTML the website and Google
// Search read — instead of editor JSON. The server sanitizes it again before saving.

import {useState} from 'react'
import PropTypes from 'prop-types'
import {useEditor, EditorContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'

import '../../styles/article-content.css'

const SAFE_LINK = /^(https?:\/\/|mailto:|tel:|\/(?!\/))/i

function ToolButton({label, title, active = false, disabled = false, onClick}) {
  return (
    <button
      type="button"
      title={title || label}
      aria-label={title || label}
      aria-pressed={active}
      disabled={disabled}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className={`rounded-lg border px-3 py-1.5 text-sm transition-colors disabled:opacity-40 ${
        active
          ? 'border-primary bg-primary text-white'
          : 'border-border bg-surface text-content hover:bg-primary/10'
      }`}
    >
      {label}
    </button>
  )
}

ToolButton.propTypes = {
  label: PropTypes.string.isRequired,
  title: PropTypes.string,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
}

export default function RichTextEditor({value, onChange, dir = 'rtl', placeholder}) {
  const [urlBar, setUrlBar] = useState(null) // {mode: 'link' | 'image', value, error}

  const editor = useEditor({
    extensions: [
      StarterKit.configure({heading: {levels: [2, 3]}}),
      Link.configure({
        openOnClick: false,
        autolink: false,
        validate: (href) => SAFE_LINK.test(href),
      }),
      Image,
      Placeholder.configure({placeholder}),
      Table,
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value || '',
    editorProps: {
      attributes: {
        dir,
        class: 'article-content min-h-[340px] max-w-none p-4 outline-none',
      },
    },
    onUpdate: ({editor: current}) => {
      onChange(current.isEmpty ? '' : current.getHTML())
    },
  })

  if (!editor) return null

  const chain = () => editor.chain().focus()

  function openUrlBar(mode) {
    const current = mode === 'link' ? editor.getAttributes('link').href || '' : ''
    setUrlBar({mode, value: current, error: ''})
  }

  function applyUrl() {
    const raw = urlBar.value.trim()

    if (urlBar.mode === 'link') {
      if (!raw) chain().extendMarkRange('link').unsetLink().run()
      else {
        const href = SAFE_LINK.test(raw) ? raw : `https://${raw}`
        chain().extendMarkRange('link').setLink({href}).run()
      }
      setUrlBar(null)
      return
    }

    if (!/^https:\/\//i.test(raw) && !/^\/(?!\/)/.test(raw)) {
      setUrlBar({...urlBar, error: 'رابط الصورة يجب أن يبدأ بـ https:// أو /'})
      return
    }
    chain().setImage({src: raw}).run()
    setUrlBar(null)
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="flex flex-wrap gap-1.5 border-b border-border bg-surface-alt p-2">
        <ToolButton label="عريض" active={editor.isActive('bold')} onClick={() => chain().toggleBold().run()} />
        <ToolButton label="مائل" active={editor.isActive('italic')} onClick={() => chain().toggleItalic().run()} />
        <ToolButton label="عنوان رئيسي H2" active={editor.isActive('heading', {level: 2})} onClick={() => chain().toggleHeading({level: 2}).run()} />
        <ToolButton label="عنوان فرعي H3" active={editor.isActive('heading', {level: 3})} onClick={() => chain().toggleHeading({level: 3}).run()} />
        <ToolButton label="قائمة نقطية" active={editor.isActive('bulletList')} onClick={() => chain().toggleBulletList().run()} />
        <ToolButton label="قائمة مرقمة" active={editor.isActive('orderedList')} onClick={() => chain().toggleOrderedList().run()} />
        <ToolButton label="اقتباس" active={editor.isActive('blockquote')} onClick={() => chain().toggleBlockquote().run()} />
        <ToolButton label="رابط" active={editor.isActive('link')} onClick={() => openUrlBar('link')} />
        <ToolButton label="صورة" onClick={() => openUrlBar('image')} />
        <ToolButton label="جدول" onClick={() => chain().insertTable({rows: 3, cols: 3, withHeaderRow: true}).run()} />
        {editor.isActive('table') && (
          <>
            <ToolButton label="+ صف" onClick={() => chain().addRowAfter().run()} />
            <ToolButton label="+ عمود" onClick={() => chain().addColumnAfter().run()} />
            <ToolButton label="حذف الجدول" onClick={() => chain().deleteTable().run()} />
          </>
        )}
        <ToolButton label="تراجع" disabled={!editor.can().undo()} onClick={() => chain().undo().run()} />
        <ToolButton label="إعادة" disabled={!editor.can().redo()} onClick={() => chain().redo().run()} />
      </div>

      {urlBar && (
        <div className="flex flex-wrap items-center gap-2 border-b border-border bg-primary/5 p-2">
          <label className="text-sm text-content-muted" htmlFor="editor-url">
            {urlBar.mode === 'link' ? 'رابط (اتركه فارغًا لإزالة الرابط):' : 'رابط الصورة (https://...):'}
          </label>
          <input
            id="editor-url"
            dir="ltr"
            autoFocus
            value={urlBar.value}
            onChange={(event) => setUrlBar({...urlBar, value: event.target.value, error: ''})}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault()
                applyUrl()
              }
              if (event.key === 'Escape') setUrlBar(null)
            }}
            className="min-w-[220px] flex-1 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-content"
          />
          <ToolButton label="تطبيق" onClick={applyUrl} />
          <ToolButton label="إلغاء" onClick={() => setUrlBar(null)} />
          {urlBar.error && <span className="w-full text-xs text-error">{urlBar.error}</span>}
        </div>
      )}

      <EditorContent editor={editor} />
    </div>
  )
}

RichTextEditor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  dir: PropTypes.oneOf(['rtl', 'ltr']),
  placeholder: PropTypes.string,
}
