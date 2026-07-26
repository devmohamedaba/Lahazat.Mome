// src/pages/Specialists.jsx
import {Helmet} from 'react-helmet-async'
import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'
import {
  Award,
  CalendarCheck,
  Globe,
  Briefcase,
  ShieldCheck,
  Lock,
  BookOpen,
} from 'lucide-react'

import Container from '../components/ui/Container'
import Section from '../components/ui/Section'
import SectionTitle from '../components/ui/SectionTitle'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

import ROUTES from '../constants/routes'

export default function Specialists() {
  const {t} = useTranslation('specialists')

  const specialists = [
    {
      id: 1,
      name: t('items.one.name'),
      title: t('items.one.title'),
      experience: t('items.one.experience'),
      languages: t('items.one.languages'),
      qualification: t('items.one.qualification'),
      bio: t('items.one.bio'),
      image: '/images/specialists/specialist-one.svg',
    },
    {
      id: 2,
      name: t('items.two.name'),
      title: t('items.two.title'),
      experience: t('items.two.experience'),
      languages: t('items.two.languages'),
      qualification: t('items.two.qualification'),
      bio: t('items.two.bio'),
      image: '/images/specialists/specialist-two.svg',
    },
    {
      id: 3,
      name: t('items.three.name'),
      title: t('items.three.title'),
      experience: t('items.three.experience'),
      languages: t('items.three.languages'),
      qualification: t('items.three.qualification'),
      bio: t('items.three.bio'),
      image: '/images/specialists/specialist-three.svg',
    },
  ]

  const whyTeamItems = [
    {key: 'licensed', icon: ShieldCheck},
    {key: 'experience', icon: Briefcase},
    {key: 'confidentiality', icon: Lock},
    {key: 'continuousLearning', icon: BookOpen},
  ]

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

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
            {specialists.map((specialist) => (
              <Card key={specialist.id} className="overflow-hidden">
                {/* Avatar */}
                <div className="flex h-56 items-center justify-center bg-primary-50/40 dark:bg-primary-500/10">
                  <img
                    src={specialist.image}
                    alt={specialist.name}
                    loading="lazy"
                    className="h-36 w-36 rounded-full shadow-md"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-content">
                    {specialist.name}
                  </h2>

                  <p className="mt-2 font-medium text-primary">
                    {specialist.title}
                  </p>

                  <p className="mt-5 leading-7 text-content-muted">
                    {specialist.bio}
                  </p>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <Briefcase size={18} className="text-primary" />
                      <span className="text-sm text-content-muted">
                        {specialist.experience}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Award size={18} className="text-primary" />
                      <span className="text-sm text-content-muted">
                        {specialist.qualification}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Globe size={18} className="text-primary" />
                      <span className="text-sm text-content-muted">
                        {specialist.languages}
                      </span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <Link to={ROUTES.BOOK}>
                      <Button className="w-full">
                        <CalendarCheck size={18} className="me-2" />
                        {t('bookNow')}
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Why Our Specialists */}
      <Section className="bg-secondary-50 dark:bg-secondary-500/10">
        <Container>
          <SectionTitle
            title={t('whyTeam.title')}
            subtitle={t('whyTeam.subtitle')}
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {whyTeamItems.map(({key, icon: Icon}) => (
              <Card key={key} className="p-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                  <Icon size={30} />
                </div>

                <h3 className="mt-5 text-xl font-semibold text-content">
                  {t(`whyTeam.items.${key}.title`)}
                </h3>

                <p className="mt-3 leading-7 text-content-muted">
                  {t(`whyTeam.items.${key}.description`)}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Team Statistics */}
      <Section>
        <Container>
          <SectionTitle
            title={t('statistics.title')}
            subtitle={t('statistics.subtitle')}
          />

          <div className="grid gap-8 text-center md:grid-cols-4">
            <Card className="p-8">
              <h2 className="text-4xl font-bold text-primary">20+</h2>
              <p className="mt-3 text-content-muted">
                {t('statistics.specialists')}
              </p>
            </Card>

            <Card className="p-8">
              <h2 className="text-4xl font-bold text-primary">500+</h2>
              <p className="mt-3 text-content-muted">
                {t('statistics.sessions')}
              </p>
            </Card>

            <Card className="p-8">
              <h2 className="text-4xl font-bold text-primary">98%</h2>
              <p className="mt-3 text-content-muted">
                {t('statistics.satisfaction')}
              </p>
            </Card>

            <Card className="p-8">
              <h2 className="text-4xl font-bold text-primary">24/7</h2>
              <p className="mt-3 text-content-muted">
                {t('statistics.support')}
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Call To Action */}
      <Section className="bg-primary">
        <Container>
          <div className="mx-auto max-w-4xl text-center text-white">
            <h2 className="text-3xl font-bold md:text-4xl">{t('cta.title')}</h2>

            <p className="mt-6 text-lg leading-8 text-white/90">
              {t('cta.description')}
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to={ROUTES.BOOK}>
                <Button variant="secondary">
                  <CalendarCheck size={18} className="me-2" />
                  {t('cta.bookButton')}
                </Button>
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
