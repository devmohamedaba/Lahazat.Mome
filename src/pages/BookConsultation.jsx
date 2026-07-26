// src/pages/BookConsultation.jsx

import {Helmet} from 'react-helmet-async'
import {useTranslation} from 'react-i18next'
import {useState} from 'react'
import {
  User,
  Mail,
  Phone,
  Stethoscope,
  ClipboardList,
  Calendar,
  Clock,
  FileText,
} from 'lucide-react'

import Container from '../components/ui/Container'
import Section from '../components/ui/Section'
import SectionTitle from '../components/ui/SectionTitle'
import Input from '../components/ui/Input'
import Textarea from '../components/ui/Textarea'
import Button from '../components/ui/Button'

export default function BookConsultation() {
  const {t} = useTranslation('booking')

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    specialist: '',
    consultationType: '',
    date: '',
    time: '',
    notes: '',
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
              src="/images/heroes/booking-hero.svg"
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
          <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-4xl rounded-3xl border border-border bg-surface p-8 shadow-sm"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <Input
                label={t('form.fullName')}
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder={t('form.placeholders.fullName')}
                icon={User}
              />

              <Input
                label={t('form.email')}
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('form.placeholders.email')}
                icon={Mail}
              />

              <Input
                label={t('form.phone')}
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t('form.placeholders.phone')}
                icon={Phone}
              />

              {/* Specialist */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="specialist"
                  className="text-sm font-medium text-content-muted"
                >
                  {t('form.specialist')}
                </label>

                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4 text-primary">
                    <Stethoscope size={18} />
                  </span>

                  <select
                    id="specialist"
                    name="specialist"
                    value={formData.specialist}
                    onChange={handleChange}
                    className="
                      w-full
                      rounded-xl
                      border
                      border-border
                      bg-surface
                      py-3
                      ps-11
                      pe-4
                      text-sm
                      text-content
                      outline-none
                      transition
                      focus:border-primary
                      focus:ring-2
                      focus:ring-primary/20
                    "
                  >
                    <option value="">{t('form.selectSpecialist')}</option>
                    <option value="individual">{t('specialists.one')}</option>
                    <option value="family">{t('specialists.two')}</option>
                    <option value="children">{t('specialists.three')}</option>
                  </select>
                </div>
              </div>

              {/* Consultation Type */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="consultationType"
                  className="text-sm font-medium text-content-muted"
                >
                  {t('form.consultationType')}
                </label>

                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4 text-primary">
                    <ClipboardList size={18} />
                  </span>

                  <select
                    id="consultationType"
                    name="consultationType"
                    value={formData.consultationType}
                    onChange={handleChange}
                    className="
                      w-full
                      rounded-xl
                      border
                      border-border
                      bg-surface
                      py-3
                      ps-11
                      pe-4
                      text-sm
                      text-content
                      outline-none
                      transition
                      focus:border-primary
                      focus:ring-2
                      focus:ring-primary/20
                    "
                  >
                    <option value="">{t('form.selectType')}</option>
                    <option value="individual">{t('types.individual')}</option>
                    <option value="couples">{t('types.couples')}</option>
                    <option value="family">{t('types.family')}</option>
                    <option value="children">{t('types.children')}</option>
                  </select>
                </div>
              </div>

              <Input
                label={t('form.date')}
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                icon={Calendar}
              />

              <Input
                label={t('form.time')}
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
                icon={Clock}
              />
            </div>

            {/* Notes */}
            <div className="mt-6">
              <Textarea
                label={t('form.notes')}
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={6}
                placeholder={t('form.placeholders.notes')}
                icon={FileText}
              />
            </div>

            {/* Privacy Agreement */}
            <div className="mt-6 flex items-start gap-3">
              <input
                id="privacy"
                type="checkbox"
                required
                className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />

              <label
                htmlFor="privacy"
                className="text-sm leading-6 text-content-muted"
              >
                {t('form.privacyAgreement')}
              </label>
            </div>

            {/* Submit */}
            <div className="mt-8 flex justify-end">
              <Button type="submit" size="lg">
                {t('form.submit')}
              </Button>
            </div>
          </form>
        </Container>
      </Section>
    </>
  )
}
