// src/pages/Resources.jsx
import ROUTES from '../constants/routes'
import {Helmet} from 'react-helmet-async'
import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'
import {Clock3, UserRound, ArrowRight, BookOpen} from 'lucide-react'

import Container from '../components/ui/Container'
import Section from '../components/ui/Section'
import SectionTitle from '../components/ui/SectionTitle'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

import articlesRegistry from '../data/articlesRegistry'

export default function Resources() {
  const {t} = useTranslation('resources')

  const articles = articlesRegistry.map(({slug, translationKey, image}) => ({
    id: slug,
    slug,
    image,
    title: t(`articles.${translationKey}.title`),
    excerpt: t(`articles.${translationKey}.excerpt`),
    author: t(`articles.${translationKey}.author`),
    readTime: t(`articles.${translationKey}.readTime`),
    category: t(`articles.${translationKey}.category`),
  }))

  return (
    <>
      <Helmet>
        <title>{t('seo.title')}</title>
        <meta name="description" content={t('seo.description')} />
      </Helmet>

      <Section className="bg-gradient-to-b from-primary/5 to-surface pb-20 pt-32">
        <Container>
          <SectionTitle
            title={t('hero.title')}
            subtitle={t('hero.description')}
          />
        </Container>
      </Section>

      {/* Articles */}
      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
            {articles.map((article) => (
              <Card
                key={article.id}
                className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex h-48 items-center justify-center bg-primary/5">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    {article.category}
                  </span>

                  <h2 className="mt-5 text-2xl font-bold text-content">
                    {article.title}
                  </h2>

                  <p className="mt-4 flex-1 leading-7 text-content-muted">
                    {article.excerpt}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-4 text-sm text-content-muted">
                    <div className="flex items-center gap-2">
                      <UserRound size={16} className="text-primary" />
                      <span>{article.author}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock3 size={16} className="text-primary" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <Link to={`/resources/${article.slug}`}>
                      <Button variant="outline" className="w-full">
                        {t('readMore')}
                        <ArrowRight size={18} className="ms-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Categories */}
      <Section className="bg-secondary-50 dark:bg-secondary-500/10">
        <Container>
          <SectionTitle
            title={t('categories.title')}
            subtitle={t('categories.subtitle')}
          />

          <div className="flex flex-wrap justify-center gap-4">
            {[
              'anxiety',
              'depression',
              'relationships',
              'children',
              'selfCare',
              'mindfulness',
            ].map((category) => (
              <button
                key={category}
                type="button"
                className="rounded-full border border-secondary/20 bg-surface px-5 py-3 text-sm font-medium text-secondary transition-colors duration-300 hover:bg-secondary hover:text-white"
              >
                {t(`categories.items.${category}`)}
              </button>
            ))}
          </div>
        </Container>
      </Section>

      {/* Why Our Resources */}
      <Section>
        <Container>
          <SectionTitle
            title={t('whyResources.title')}
            subtitle={t('whyResources.subtitle')}
          />

          <div className="grid gap-6 md:grid-cols-3">
            {['trusted', 'updated', 'practical'].map((item) => (
              <Card key={item} className="p-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <BookOpen size={28} />
                </div>

                <h3 className="mt-5 text-xl font-semibold text-content">
                  {t(`whyResources.items.${item}.title`)}
                </h3>

                <p className="mt-3 leading-7 text-content-muted">
                  {t(`whyResources.items.${item}.description`)}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Library Statistics */}
      <Section className="bg-primary text-white">
        <Container>
          <div className="grid gap-8 text-center md:grid-cols-4">
            <div>
              <h2 className="text-4xl font-bold">100+</h2>
              <p className="mt-3 text-white/80">{t('statistics.articles')}</p>
            </div>

            <div>
              <h2 className="text-4xl font-bold">25+</h2>
              <p className="mt-3 text-white/80">{t('statistics.guides')}</p>
            </div>

            <div>
              <h2 className="text-4xl font-bold">15K+</h2>
              <p className="mt-3 text-white/80">{t('statistics.readers')}</p>
            </div>

            <div>
              <h2 className="text-4xl font-bold">Weekly</h2>
              <p className="mt-3 text-white/80">{t('statistics.updated')}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Call To Action */}
      <Section>
        <Container>
          <div className="rounded-3xl bg-gradient-to-r from-primary to-primary/90 px-8 py-14 text-center text-white">
            <h2 className="text-3xl font-bold md:text-4xl">{t('cta.title')}</h2>

            <p className="mx-auto mt-5 max-w-3xl leading-8 text-white/90">
              {t('cta.description')}
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to={ROUTES.BOOK}>
                <Button>{t('cta.bookButton')}</Button>
              </Link>

              <Link to={ROUTES.CONTACT}>
                <Button variant="outline">{t('cta.contactButton')}</Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
