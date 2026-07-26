// src/pages/Services.jsx
import {Link} from 'react-router-dom'
import Button from '../components/ui/Button'
import ROUTES from '../constants/routes'
import {Helmet} from 'react-helmet-async'
import {useTranslation} from 'react-i18next'

import {
  Brain,
  HeartHandshake,
  Users,
  Baby,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

import Container from '../components/ui/Container'
import Section from '../components/ui/Section'
import SectionTitle from '../components/ui/SectionTitle'
import Card from '../components/ui/Card'

export default function Services() {
  const {t} = useTranslation('services')

  const services = [
    {
      icon: Brain,
      title: t('items.individual.title'),
      description: t('items.individual.description'),
    },
    {
      icon: HeartHandshake,
      title: t('items.couples.title'),
      description: t('items.couples.description'),
    },
    {
      icon: Users,
      title: t('items.family.title'),
      description: t('items.family.description'),
    },
    {
      icon: Baby,
      title: t('items.children.title'),
      description: t('items.children.description'),
    },
    {
      icon: ShieldCheck,
      title: t('items.anxiety.title'),
      description: t('items.anxiety.description'),
    },
    {
      icon: Sparkles,
      title: t('items.selfDevelopment.title'),
      description: t('items.selfDevelopment.description'),
    },
  ]

  return (
    <>
      <Helmet>
        <title>{t('seo.title')}</title>
        <meta name="description" content={t('seo.description')} />
      </Helmet>

      {/* Hero */}
      <Section className="bg-gradient-to-b from-primary/5 to-surface pb-20 pt-32">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <SectionTitle
              align="start"
              title={t('hero.title')}
              subtitle={t('hero.description')}
            />
            <div className="flex justify-center">
              <img
                src="/images/heroes/services-hero.svg"
                alt={t('hero.title')}
                className="w-64 md:w-80"
                loading="eager"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Services */}
      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {services.map(({icon: Icon, title, description}) => (
              <Card
                key={title}
                className="h-full p-8 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon size={30} />
                </div>

                <h2 className="mt-6 text-2xl font-bold text-content">
                  {title}
                </h2>

                <p className="mt-4 leading-7 text-content-muted">
                  {description}
                </p>

                <div className="mt-6 h-1 w-16 rounded-full bg-primary" />
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Our Approach */}
      <Section className="bg-secondary-50 dark:bg-secondary-500/10">
        <Container>
          <SectionTitle
            title={t('approach.title')}
            subtitle={t('approach.subtitle')}
          />

          <div className="grid gap-8 lg:grid-cols-3">
            <Card className="p-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                1
              </div>

              <h3 className="mt-5 text-xl font-semibold text-content">
                {t('approach.steps.one.title')}
              </h3>

              <p className="mt-3 leading-7 text-content-muted">
                {t('approach.steps.one.description')}
              </p>
            </Card>

            <Card className="p-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                2
              </div>

              <h3 className="mt-5 text-xl font-semibold text-content">
                {t('approach.steps.two.title')}
              </h3>

              <p className="mt-3 leading-7 text-content-muted">
                {t('approach.steps.two.description')}
              </p>
            </Card>

            <Card className="p-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                3
              </div>

              <h3 className="mt-5 text-xl font-semibold text-content">
                {t('approach.steps.three.title')}
              </h3>

              <p className="mt-3 leading-7 text-content-muted">
                {t('approach.steps.three.description')}
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Why Our Services */}
      <Section>
        <Container>
          <SectionTitle
            title={t('benefits.title')}
            subtitle={t('benefits.subtitle')}
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {['licensed', 'confidential', 'personalized', 'flexible'].map(
              (item) => (
                <Card key={item} className="p-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <ShieldCheck size={28} />
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-content">
                    {t(`benefits.items.${item}.title`)}
                  </h3>

                  <p className="mt-3 leading-7 text-content-muted">
                    {t(`benefits.items.${item}.description`)}
                  </p>
                </Card>
              ),
            )}
          </div>
        </Container>
      </Section>

      {/* Statistics */}
      <Section className="bg-primary text-white">
        <Container>
          <div className="grid gap-8 text-center md:grid-cols-4">
            <div>
              <h2 className="text-4xl font-bold">500+</h2>
              <p className="mt-3 text-white/80">{t('statistics.clients')}</p>
            </div>

            <div>
              <h2 className="text-4xl font-bold">20+</h2>
              <p className="mt-3 text-white/80">
                {t('statistics.specialists')}
              </p>
            </div>

            <div>
              <h2 className="text-4xl font-bold">98%</h2>
              <p className="mt-3 text-white/80">
                {t('statistics.satisfaction')}
              </p>
            </div>

            <div>
              <h2 className="text-4xl font-bold">24/7</h2>
              <p className="mt-3 text-white/80">{t('statistics.support')}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Booking CTA */}
      <Section>
        <Container>
          <div className="rounded-3xl bg-surface-alt p-10 text-center">
            <h2 className="text-3xl font-bold text-content">
              {t('cta.title')}
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-7 text-content-muted">
              {t('cta.description')}
            </p>

            <div className="mt-8">
              <Link to={ROUTES.BOOK}>
                <Button>{t('cta.button')}</Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
