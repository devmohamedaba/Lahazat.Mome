// src/pages/ArticleDetail.jsx
import {useMemo} from 'react'
import {useParams, Link} from 'react-router-dom'
import {Helmet} from 'react-helmet-async'
import {useTranslation} from 'react-i18next'
import DOMPurify from 'dompurify'
import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  UserRound,
  CalendarDays,
} from 'lucide-react'

import Container from '../components/ui/Container'
import Section from '../components/ui/Section'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import LoadingScreen from '../components/common/LoadingScreen'

import ROUTES from '../constants/routes'
import articlesRegistry from '../data/articlesRegistry'
import siteConfig from '../config/siteConfig'
import useArticleCards from '../hooks/useArticleCards'

import '../styles/article-content.css'

const DEFAULT_IMAGE = '/images/seo-cover.jpg'

const absoluteUrl = (url) =>
  /^https?:\/\//.test(url || '')
    ? url
    : `${siteConfig.company.website}${url || DEFAULT_IMAGE}`

export default function ArticleDetail() {
  const {slug} = useParams()
  const {t, i18n} = useTranslation('resources')
  const {cards, cms, loading, isAr} = useArticleCards()

  const cmsEntry = cms.find((item) => item.slug === slug)
  const legacyEntry = articlesRegistry.find((item) => item.slug === slug)

  const pick = (field) =>
    cmsEntry
      ? isAr
        ? cmsEntry[`${field}_ar`] || cmsEntry[`${field}_en`] || ''
        : cmsEntry[`${field}_en`] || cmsEntry[`${field}_ar`] || ''
      : ''

  // Clean HTML coming from the CMS. The server already sanitizes it; this is a second layer.
  const cmsHtml = useMemo(
    () => (cmsEntry ? DOMPurify.sanitize(pick('content')) : ''),
    [cmsEntry, isAr],
  )

  if (!cmsEntry && !legacyEntry) {
    // Wait for /articles.json before deciding the article does not exist.
    if (loading) return <LoadingScreen />

    return (
      <>
        <Helmet>
          <title>{t('article.notFound')}</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>

        <Section className="pt-32 md:pt-40">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-3xl font-bold text-content">
                {t('article.notFound')}
              </h1>

              <div className="mt-8">
                <Link to={ROUTES.RESOURCES}>
                  <Button>
                    <ArrowLeft size={18} className="me-2" />
                    {t('article.back')}
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </Section>
      </>
    )
  }

  // ----- Normalize both sources into one view model -----
  let view

  if (cmsEntry) {
    const card = cards.find((item) => item.slug === slug)
    const title = pick('title')
    const excerpt = pick('excerpt')

    view = {
      title,
      seoTitle: pick('seo_title') || title,
      excerpt,
      seoDescription: pick('seo_description') || excerpt,
      author: cmsEntry.author,
      category: pick('category'),
      readTime: card ? card.readTime : '',
      date: cmsEntry.published_at
        ? new Date(cmsEntry.published_at).toLocaleDateString(
            isAr ? 'ar-EG' : 'en-US',
            {year: 'numeric', month: 'long', day: 'numeric'},
          )
        : '',
      image: cmsEntry.image,
      imageAlt: pick('image_alt') || title,
      publishedAt: cmsEntry.published_at,
      modifiedAt: cmsEntry.updated_at || cmsEntry.published_at,
      html: cmsHtml,
      blocks: null,
    }
  } else {
    const key = legacyEntry.translationKey
    const title = t(`articles.${key}.title`)
    const excerpt = t(`articles.${key}.excerpt`)

    view = {
      title,
      seoTitle: title,
      excerpt,
      seoDescription: excerpt,
      author: t(`articles.${key}.author`),
      category: t(`articles.${key}.category`),
      readTime: t(`articles.${key}.readTime`),
      date: t(`articles.${key}.date`),
      image: legacyEntry.image,
      imageAlt: title,
      publishedAt: legacyEntry.publishedAt,
      modifiedAt: legacyEntry.publishedAt,
      html: '',
      blocks: t(`articles.${key}.content`, {returnObjects: true}),
    }
  }

  const canonicalUrl = `${siteConfig.company.website}/resources/${slug}`
  const imageUrl = absoluteUrl(view.image)
  const locale = i18n.language === 'ar' ? 'ar_EG' : 'en_US'
  const relatedArticles = cards.filter((item) => item.slug !== slug).slice(0, 2)

  return (
    <>
      <Helmet>
        <title>{`${view.seoTitle} | ${siteConfig.company.name}`}</title>
        <meta name="description" content={view.seoDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta
          name="robots"
          content="index,follow,max-image-preview:large"
        />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={view.seoTitle} />
        <meta property="og:description" content={view.seoDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:locale" content={locale} />
        <meta property="og:site_name" content={siteConfig.company.name} />
        <meta property="article:published_time" content={view.publishedAt} />
        <meta property="article:modified_time" content={view.modifiedAt} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={view.seoTitle} />
        <meta name="twitter:description" content={view.seoDescription} />
        <meta name="twitter:image" content={imageUrl} />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Article',
                headline: view.title,
                description: view.seoDescription,
                image: [imageUrl],
                inLanguage: isAr ? 'ar' : 'en',
                author: {'@type': 'Person', name: view.author},
                datePublished: view.publishedAt,
                dateModified: view.modifiedAt,
                mainEntityOfPage: {'@type': 'WebPage', '@id': canonicalUrl},
                publisher: {
                  '@type': 'Organization',
                  name: siteConfig.company.name,
                  url: siteConfig.company.website,
                },
              },
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    position: 1,
                    name: isAr ? 'الرئيسية' : 'Home',
                    item: `${siteConfig.company.website}/`,
                  },
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name: isAr ? 'المقالات' : 'Articles',
                    item: `${siteConfig.company.website}/resources`,
                  },
                  {
                    '@type': 'ListItem',
                    position: 3,
                    name: view.title,
                    item: canonicalUrl,
                  },
                ],
              },
            ],
          })}
        </script>
      </Helmet>

      <Section className="bg-gradient-to-b from-primary/5 to-surface pb-16 pt-32">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Link
              to={ROUTES.RESOURCES}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <ArrowLeft size={16} />
              {t('article.back')}
            </Link>

            {view.category && (
              <span className="mt-6 inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                {view.category}
              </span>
            )}

            <h1 className="mt-5 text-3xl font-bold leading-tight text-content md:text-4xl">
              {view.title}
            </h1>

            <div className="mt-6 flex flex-wrap gap-5 text-sm text-content-muted">
              <div className="flex items-center gap-2">
                <UserRound size={16} className="text-primary" />
                <span>{view.author}</span>
              </div>

              <div className="flex items-center gap-2">
                <CalendarDays size={16} className="text-primary" />
                <time dateTime={view.publishedAt}>{view.date}</time>
              </div>

              <div className="flex items-center gap-2">
                <Clock3 size={16} className="text-primary" />
                <span>{view.readTime}</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <div className="mx-auto max-w-3xl">
            {view.image && (
              <div className="overflow-hidden rounded-3xl bg-primary/10">
                <img
                  src={view.image}
                  alt={view.imageAlt}
                  width="1200"
                  height="630"
                  fetchpriority="high"
                  className="h-72 w-full object-cover md:h-96"
                />
              </div>
            )}

            {view.html ? (
              <article
                className="article-content mt-8"
                dangerouslySetInnerHTML={{__html: view.html}}
              />
            ) : (
              <article className="mt-8">
                {Array.isArray(view.blocks) &&
                  view.blocks.map((block, index) => {
                    if (block.type === 'heading') {
                      return (
                        <h2
                          key={index}
                          className="mt-8 text-2xl font-bold text-content"
                        >
                          {block.value}
                        </h2>
                      )
                    }

                    if (block.type === 'list') {
                      return (
                        <ul
                          key={index}
                          className="mt-4 list-disc space-y-2 ps-6 text-content-muted"
                        >
                          {block.items.map((listItem, itemIndex) => (
                            <li key={itemIndex}>{listItem}</li>
                          ))}
                        </ul>
                      )
                    }

                    return (
                      <p
                        key={index}
                        className="mt-4 leading-8 text-content-muted"
                      >
                        {block.value}
                      </p>
                    )
                  })}
              </article>
            )}
          </div>
        </Container>
      </Section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <Section className="bg-secondary-50 dark:bg-secondary-500/10">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold text-content">
                {t('related.title')}
              </h2>

              <p className="mt-2 text-content-muted">
                {t('related.description')}
              </p>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {relatedArticles.map((related) => (
                  <Card key={related.slug} className="p-6">
                    <h3 className="text-lg font-semibold text-content">
                      {related.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-content-muted">
                      {related.excerpt}
                    </p>

                    <Link
                      to={`/resources/${related.slug}`}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                      {t('readMore')}
                      <ArrowRight size={16} />
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}
    </>
  )
}
