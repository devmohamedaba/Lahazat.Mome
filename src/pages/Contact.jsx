// src/pages/Contact.jsx
import {Link} from 'react-router-dom'
import ROUTES from '../constants/routes'
import {Helmet} from 'react-helmet-async'
import {useTranslation} from 'react-i18next'
import {useState} from 'react'

import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Lock,
  User,
  MessageSquareText,
  FileText,
} from 'lucide-react'

import Container from '../components/ui/Container'
import Section from '../components/ui/Section'
import SectionTitle from '../components/ui/SectionTitle'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Textarea from '../components/ui/Textarea'
import Button from '../components/ui/Button'

export default function Contact() {
  const {t} = useTranslation('contact')

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleChange = ({target}) => {
    setFormData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(formData)
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
              src="/images/heroes/contact-hero.svg"
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
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <Mail className="text-primary" />
                  <div>
                    <h3 className="font-semibold text-content">
                      {t('info.email.title')}
                    </h3>
                    <p className="text-content-muted">
                      info@lahazatmoments.com
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <Phone className="text-primary" />
                  <div>
                    <h3 className="font-semibold text-content">
                      {t('info.phone.title')}
                    </h3>
                    <p className="text-content-muted">+201040242725</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <MapPin className="text-primary" />
                  <div>
                    <h3 className="font-semibold text-content">
                      {t('info.address.title')}
                    </h3>
                    <p className="text-content-muted">
                      {t('info.address.value')}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <Clock className="text-primary" />
                  <div>
                    <h3 className="font-semibold text-content">
                      {t('info.hours.title')}
                    </h3>
                    <p className="text-content-muted">
                      {t('info.hours.value')}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label={t('form.fullName')}
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder={t('form.placeholders.fullName')}
                  icon={User}
                  required
                />

                <Input
                  label={t('form.email')}
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('form.placeholders.email')}
                  icon={Mail}
                  required
                />

                <Input
                  label={t('form.subject')}
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t('form.placeholders.subject')}
                  icon={MessageSquareText}
                  required
                />

                <Textarea
                  label={t('form.message')}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={7}
                  placeholder={t('form.placeholders.message')}
                  icon={FileText}
                  required
                />

                <div className="flex justify-end">
                  <Button type="submit" size="lg">
                    {t('form.submit')}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Why Contact Us */}
      <Section className="bg-secondary-50 dark:bg-secondary-500/10">
        <Container>
          <SectionTitle
            title={t('whyContact.title')}
            subtitle={t('whyContact.subtitle')}
          />

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {key: 'response', icon: Mail},
              {key: 'confidentiality', icon: Lock},
              {key: 'support', icon: Clock},
            ].map(({key, icon: Icon}) => (
              <Card key={key} className="p-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                  <Icon size={30} />
                </div>

                <h3 className="mt-5 text-xl font-semibold text-content">
                  {t(`whyContact.items.${key}.title`)}
                </h3>

                <p className="mt-3 leading-7 text-content-muted">
                  {t(`whyContact.items.${key}.description`)}
                </p>
              </Card>
            ))}
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

            <div className="mt-8">
              <Link to={ROUTES.BOOK}>
                <Button variant="secondary">{t('cta.button')}</Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
