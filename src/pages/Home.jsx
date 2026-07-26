// src/pages/Home.jsx

import {Helmet} from 'react-helmet-async'
import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'

import {
  Brain,
  Users,
  HeartHandshake,
  CalendarCheck,
  ArrowRight,
} from 'lucide-react'

import Container from '../components/ui/Container'
import Section from '../components/ui/Section'
import SectionTitle from '../components/ui/SectionTitle'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

import ROUTES from '../constants/routes'

import siteConfig from '../config/siteConfig'

export default function Home() {
  const {t} = useTranslation(['home', 'common'])

  const services = [
    {
      icon: Brain,
      title: t('services.items.individual.title'),
      description: t('services.items.individual.description'),
    },
    {
      icon: Users,
      title: t('services.items.family.title'),
      description: t('services.items.family.description'),
    },
    {
      icon: HeartHandshake,
      title: t('services.items.couples.title'),
      description: t('services.items.couples.description'),
    },
  ]

  return (
    <>
      <Helmet>
        <title>{siteConfig.seo.title}</title>
        <meta name="description" content={siteConfig.seo.description} />
        <meta name="keywords" content={siteConfig.seo.keywords.join(', ')} />
      </Helmet>

      {/* Hero Section */}
      <Section className="relative overflow-hidden pt-32 md:pt-40">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h1 className="max-w-2xl text-4xl font-bold leading-tight text-content md:text-5xl lg:text-6xl">
                {t('hero.title')}
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-content-muted md:text-lg">
                {t('hero.description')}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link to={ROUTES.BOOK}>
                  <Button>
                    <CalendarCheck size={18} className="me-2" />
                    {t('common:buttons.bookNow')}
                  </Button>
                </Link>

                <Link to={ROUTES.SERVICES}>
                  <Button variant="outline">
                    {t('common:buttons.services')}
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative flex justify-center">
              <img
                src="/images/hero-illustration.svg"
                alt={t('hero.title')}
                className="w-72 md:w-96"
                loading="eager"
                width={400}
                height={400}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Services Preview */}
      <Section className="bg-primary-50/40 dark:bg-primary-500/10">
        <Container>
          <SectionTitle
            title={t('services.title')}
            subtitle={t('services.subtitle')}
          />

          <div className="grid gap-6 md:grid-cols-3">
            {services.map(({icon: Icon, title, description}) => (
              <Card key={title} className="p-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={28} />
                </div>

                <h3 className="mt-5 text-xl font-semibold text-content">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-content-muted">
                  {description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Why Choose Us */}
      <Section>
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <SectionTitle
                align="start"
                title={t('why.title')}
                subtitle={t('why.subtitle')}
              />

              <ul className="mt-8 space-y-5">
                {['professional', 'privacy', 'support', 'flexibility'].map(
                  (item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="mt-1 h-5 w-5 rounded-full bg-primary" />
                      <span className="text-content-muted">
                        {t(`why.items.${item}`)}
                      </span>
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div>
              <Card className="bg-primary p-8 text-white">
                <h3 className="text-3xl font-bold">{t('statistics.title')}</h3>

                <p className="mt-4 leading-7 text-white/80">
                  {t('statistics.description')}
                </p>

                <div className="mt-8 grid grid-cols-2 gap-6">
                  <div>
                    <strong className="text-3xl">+500</strong>
                    <p className="mt-2 text-sm text-white/80">
                      {t('statistics.clients')}
                    </p>
                  </div>

                  <div>
                    <strong className="text-3xl">+20</strong>
                    <p className="mt-2 text-sm text-white/80">
                      {t('statistics.specialists')}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Specialists Preview */}
      <Section className="bg-secondary-50 dark:bg-secondary-500/10">
        <Container>
          <SectionTitle
            title={t('specialists.title')}
            subtitle={t('specialists.subtitle')}
          />

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: t('specialists.items.one.name'),
                role: t('specialists.items.one.role'),
              },
              {
                name: t('specialists.items.two.name'),
                role: t('specialists.items.two.role'),
              },
              {
                name: t('specialists.items.three.name'),
                role: t('specialists.items.three.role'),
              },
            ].map((specialist) => (
              <Card key={specialist.name} className="p-6 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                  <Users size={35} />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-content">
                  {specialist.name}
                </h3>

                <p className="mt-2 text-sm text-content-muted">
                  {specialist.role}
                </p>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link to={ROUTES.SPECIALISTS}>
              <Button variant="outline">
                {t('common:buttons.viewSpecialists')}
                <ArrowRight size={18} className="ms-2" />
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Resources Preview */}
      <Section>
        <Container>
          <SectionTitle
            title={t('resources.title')}
            subtitle={t('resources.subtitle')}
          />

          <div className="grid gap-6 md:grid-cols-3">
            {['mental-health', 'stress-management', 'self-development'].map(
              (article) => (
                <Card key={article} className="p-6">
                  <h3 className="text-lg font-semibold text-content">
                    {t(`resources.items.${article}.title`)}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-content-muted">
                    {t(`resources.items.${article}.description`)}
                  </p>
                </Card>
              ),
            )}
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section>
        <Container>
          <div className="rounded-3xl bg-primary px-6 py-12 text-center text-white md:px-12">
            <h2 className="text-3xl font-bold">{t('cta.title')}</h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/80">
              {t('cta.description')}
            </p>

            <Link to={ROUTES.BOOK} className="mt-8 inline-block">
              <Button variant="secondary">{t('common:buttons.bookNow')}</Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  )
}
