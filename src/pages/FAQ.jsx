// src/pages/FAQ.jsx
import {Link} from 'react-router-dom'

import Button from '../components/ui/Button'

import ROUTES from '../constants/routes'
import {useState} from 'react'
import {Helmet} from 'react-helmet-async'
import {useTranslation} from 'react-i18next'
import {ChevronDown} from 'lucide-react'

import Container from '../components/ui/Container'
import Section from '../components/ui/Section'
import SectionTitle from '../components/ui/SectionTitle'

export default function FAQ() {
  const {t} = useTranslation('faq')

  const [openItem, setOpenItem] = useState(0)

  const questions = [
    'privacy',
    'booking',
    'online',
    'duration',
    'payment',
    'cancel',
  ]

  const toggleItem = (index) => {
    setOpenItem(openItem === index ? null : index)
  }

  return (
    <>
      <Helmet>
        <title>{t('seo.title')}</title>
        <meta name="description" content={t('seo.description')} />
      </Helmet>

      <Section className="bg-gradient-to-b from-primary/5 to-surface pb-20 pt-32">
        <Container>
          <div className="flex justify-center">
            <img
              src="/images/heroes/faq-hero.svg"
              alt={t('hero.title')}
              className="w-48 md:w-56"
              loading="eager"
            />
          </div>
          <SectionTitle
            title={t('hero.title')}
            subtitle={t('hero.description')}
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="mx-auto max-w-4xl space-y-4">
            {questions.map((question, index) => {
              const isOpen = openItem === index

              return (
                <article
                  key={question}
                  className={`
                    overflow-hidden
                    rounded-2xl
                    border
                    bg-surface
                    shadow-sm
                    transition-colors
                    ${isOpen ? 'border-primary/80' : 'border-border'}
                  `}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    id={`faq-button-${index}`}
                    className="
                      flex
                      w-full
                      items-center
                      justify-between
                      gap-4
                      p-6
                      text-start
                      transition-colors
                      hover:bg-surface-alt
                    "
                  >
                    <span className="text-lg font-semibold text-content">
                      {t(`questions.${question}.question`)}
                    </span>

                    <ChevronDown
                      size={22}
                      className={`
                        shrink-0
                        transition-transform
                        duration-300
                        ${
                          isOpen
                            ? 'rotate-180 text-primary'
                            : 'text-content-muted'
                        }
                      `}
                    />
                  </button>

                  <div
                    id={`faq-panel-${index}`}
                    role="region"
                    aria-labelledby={`faq-button-${index}`}
                    className={`
                      overflow-hidden
                      transition-all
                      duration-300
                      ${isOpen ? 'max-h-96' : 'max-h-0'}
                    `}
                  >
                    <div className="border-t border-border px-6 py-5">
                      <p className="leading-8 text-content-muted">
                        {t(`questions.${question}.answer`)}
                      </p>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* Contact CTA */}
      <Section>
        <Container>
          <div className="rounded-3xl bg-primary px-8 py-14 text-center text-white">
            <h2 className="text-3xl font-bold md:text-4xl">{t('cta.title')}</h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/90">
              {t('cta.description')}
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to={ROUTES.BOOK}>
                <Button>{t('cta.bookButton')}</Button>
              </Link>

              <Link to={ROUTES.CONTACT}>
                <Button variant="secondary">{t('cta.contactButton')}</Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
