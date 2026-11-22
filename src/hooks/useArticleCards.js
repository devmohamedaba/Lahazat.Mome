// src/hooks/useArticleCards.js
// One list for the whole site: legacy i18n articles + CMS articles (CMS wins on the same slug).

import {useEffect, useMemo, useState} from 'react'
import {useTranslation} from 'react-i18next'

import articlesRegistry from '../data/articlesRegistry'
import {loadCmsArticles} from '../lib/publicArticles'

function readTime(minutes, isAr) {
  if (!isAr) return `${minutes} min read`
  if (minutes === 1) return 'دقيقة قراءة'
  return `${minutes} ${minutes <= 10 ? 'دقائق' : 'دقيقة'} قراءة`
}

export default function useArticleCards() {
  const {t, i18n} = useTranslation('resources')
  const isAr = String(i18n.language).startsWith('ar')

  const [cms, setCms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    loadCmsArticles().then((list) => {
      if (!active) return
      setCms(list)
      setLoading(false)
    })
    return () => {
      active = false
    }
  }, [])

  const cards = useMemo(() => {
    const pick = (article, field) =>
      isAr
        ? article[`${field}_ar`] || article[`${field}_en`] || ''
        : article[`${field}_en`] || article[`${field}_ar`] || ''

    const cmsCards = cms.map((article) => {
      const title = pick(article, 'title')
      return {
        slug: article.slug,
        source: 'cms',
        image: article.image,
        imageAlt: pick(article, 'image_alt') || title,
        title,
        excerpt: pick(article, 'excerpt'),
        author: article.author,
        category: pick(article, 'category'),
        readTime: readTime(article.read_minutes || 1, isAr),
        publishedAt: article.published_at,
      }
    })

    const cmsSlugs = new Set(cmsCards.map((card) => card.slug))

    const legacyCards = articlesRegistry
      .filter((entry) => !cmsSlugs.has(entry.slug))
      .map((entry) => ({
        slug: entry.slug,
        source: 'legacy',
        translationKey: entry.translationKey,
        image: entry.image,
        imageAlt: t(`articles.${entry.translationKey}.title`),
        title: t(`articles.${entry.translationKey}.title`),
        excerpt: t(`articles.${entry.translationKey}.excerpt`),
        author: t(`articles.${entry.translationKey}.author`),
        category: t(`articles.${entry.translationKey}.category`),
        readTime: t(`articles.${entry.translationKey}.readTime`),
        publishedAt: entry.publishedAt,
      }))

    return [...cmsCards, ...legacyCards].sort(
      (a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0),
    )
  }, [cms, isAr, t])

  return {cards, cms, loading, isAr}
}
