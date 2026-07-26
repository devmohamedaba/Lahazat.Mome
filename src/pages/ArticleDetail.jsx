// src/pages/ArticleDetail.jsx
import {useParams, Link} from 'react-router-dom'
import {Helmet} from 'react-helmet-async'
import {useTranslation} from 'react-i18next'
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

import ROUTES from '../constants/routes'
import articlesRegistry from '../data/articlesRegistry'
import siteConfig from '../config/siteConfig'

export default function ArticleDetail() {
  const {slug} = useParams()
  const {t, i18n} = useTranslation('resources')

  const entry = articlesRegistry.find((item) => item.slug === slug)

  if (!entry) {
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

  const {translationKey, image, publishedAt} = entry

  const title = t(`articles.${translationKey}.title`)
  const excerpt = t(`articles.${translationKey}.excerpt`)
  const author = t(`articles.${translationKey}.author`)
  const date = t(`articles.${translationKey}.date`)
  const readTime = t(`articles.${translationKey}.readTime`)
  const category = t(`articles.${translationKey}.category`)
  const content = t(`articles.${translationKey}.content`, {
    returnObjects: true,
  })

  const canonicalUrl = `${siteConfig.company.website}/resources/${slug}`
  const imageUrl = `${siteConfig.company.website}${image}`
  const locale = i18n.language === 'ar' ? 'ar_EG' : 'en_US'

  const relatedArticles = articlesRegistry
    .filter((item) => item.slug !== slug)
    .slice(0, 2)
    .map((item) => ({
      ...item,
      title: t(`articles.${item.translationKey}.title`),
      excerpt: t(`articles.${item.translationKey}.excerpt`),
    }))

  return (
    <>
      <Helmet>
        <title>{`${title} | ${siteConfig.company.name}`}</title>
        <meta name="description" content={excerpt} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={excerpt} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:locale" content={locale} />
        <meta property="og:site_name" content={siteConfig.company.name} />
        <meta property="article:published_time" content={publishedAt} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={excerpt} />
        <meta name="twitter:image" content={imageUrl} />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: title,
            description: excerpt,
            image: imageUrl,
            author: {
              '@type': 'Person',
              name: author,
            },
            datePublished: publishedAt,
            mainEntityOfPage: canonicalUrl,
            publisher: {
              '@type': 'Organization',
              name: siteConfig.company.name,
            },
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

            <span className="mt-6 inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              {category}
            </span>

            <h1 className="mt-5 text-3xl font-bold leading-tight text-content md:text-4xl">
              {title}
            </h1>

            <div className="mt-6 flex flex-wrap gap-5 text-sm text-content-muted">
              <div className="flex items-center gap-2">
                <UserRound size={16} className="text-primary" />
                <span>{author}</span>
              </div>

              <div className="flex items-center gap-2">
                <CalendarDays size={16} className="text-primary" />
                <span>{date}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock3 size={16} className="text-primary" />
                <span>{readTime}</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="overflow-hidden rounded-3xl bg-primary/10">
              <img
                src={image}
                alt={title}
                loading="lazy"
                className="h-72 w-full object-cover md:h-96"
              />
            </div>

            <article className="mt-8">
              {Array.isArray(content) &&
                content.map((block, index) => {
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
