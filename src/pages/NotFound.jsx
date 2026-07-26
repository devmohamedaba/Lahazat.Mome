import {Helmet} from 'react-helmet-async'
import {useTranslation} from 'react-i18next'
import {Link} from 'react-router-dom'

import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import Section from '../components/ui/Section'

import ROUTES from '../constants/routes'

export default function NotFound() {
  const {t} = useTranslation('notFound')

  return (
    <>
      <Helmet>
        <title>{t('seo.title')}</title>

        <meta name="description" content={t('seo.description')} />
      </Helmet>

      <Section className="min-h-[80vh] flex items-center">
        <Container>
          <div className="text-center">
            <h1 className="text-8xl font-bold text-primary">404</h1>

            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              {t('title')}
            </h2>

            <p className="mx-auto mt-6 max-w-2xl leading-8 text-gray-600">
              {t('description')}
            </p>

            <div className="mt-10">
              <Link to={ROUTES.HOME}>
                <Button>{t('button')}</Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
