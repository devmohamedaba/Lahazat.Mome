// src/pages/About.jsx

import {Helmet} from 'react-helmet-async'
import {useTranslation} from 'react-i18next'

import {HeartHandshake, ShieldCheck, Target, Eye} from 'lucide-react'

import Container from '../components/ui/Container'
import Section from '../components/ui/Section'
import SectionTitle from '../components/ui/SectionTitle'
import Card from '../components/ui/Card'

export default function About() {
  const {t} = useTranslation(['about'])

  const values = [
    {
      icon: HeartHandshake,
      title: t('services.items.couples.title'),
      description: t('services.items.couples.description'),
    },
    {
      icon: ShieldCheck,
      title: t('values.items.privacy.title'),
      description: t('values.items.privacy.description'),
    },
    {
      icon: Target,
      title: t('values.items.professionalism.title'),
      description: t('values.items.professionalism.description'),
    },
  ]

  return (
    <>
      <Helmet>
        <title>{t('seo.title')}</title>
        <meta name="description" content={t('seo.description')} />
      </Helmet>

      {/* About Hero */}
      <Section className="pt-32 md:pt-40">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-bold text-content md:text-5xl">
                {t('hero.title')}
              </h1>

              <p className="mt-6 leading-8 text-content-muted">
                {t('hero.description')}
              </p>
            </div>

            <div className="flex justify-center">
              <img
                src="/images/heroes/about-hero.svg"
                alt={t('hero.title')}
                className="w-64 md:w-80"
                loading="eager"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Vision & Mission */}
      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Eye size={25} />
              </div>

              <h2 className="mt-5 text-2xl font-bold text-content">
                {t('vision.title')}
              </h2>

              <p className="mt-4 leading-7 text-content-muted">
                {t('vision.description')}
              </p>
            </Card>

            <Card className="p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Target size={25} />
              </div>

              <h2 className="mt-5 text-2xl font-bold text-content">
                {t('mission.title')}
              </h2>

              <p className="mt-4 leading-7 text-content-muted">
                {t('mission.description')}
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section className="bg-secondary-50 dark:bg-secondary-500/10">
        <Container>
          <SectionTitle
            title={t('values.title')}
            subtitle={t('values.subtitle')}
          />

          <div className="grid gap-6 md:grid-cols-3">
            {values.map(({icon: Icon, title, description}, index) => {
              const isCompassion = index === 0

              return (
                <Card key={title} className="p-6">
                  <div
                    className={`
                      flex h-14 w-14 items-center justify-center rounded-xl
                      ${
                        isCompassion
                          ? 'bg-accent/10 text-accent'
                          : 'bg-secondary/10 text-secondary'
                      }
                    `}
                  >
                    <Icon size={28} />
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-content">
                    {title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-content-muted">
                    {description}
                  </p>
                </Card>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* Why Choose Us */}
      <Section>
        <Container>
          <div className="rounded-3xl bg-primary px-6 py-12 text-center text-white md:px-12">
            <h2 className="text-3xl font-bold md:text-4xl">
              {t('whyChoose.title')}
            </h2>

            <p className="mx-auto mt-5 max-w-3xl leading-8 text-white/80">
              {t('whyChoose.description')}
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {['experience', 'confidentiality', 'continuousSupport'].map(
                (item) => (
                  <div key={item} className="rounded-2xl bg-white/10 p-6">
                    <h3 className="text-lg font-semibold">
                      {t(`whyChoose.items.${item}.title`)}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-white/70">
                      {t(`whyChoose.items.${item}.description`)}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
