import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'

import FAQItem from './FAQItem'
import faqs from '../../data/faqs'

export default function FAQSection() {
  return (
    <section className="bg-white py-28">
      <Container>
        <SectionTitle
          center
          badge="FAQ"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know before booking your next photography session."
        />

        <div className="mx-auto mt-16 max-w-4xl space-y-6">
          {faqs.map((faq) => (
            <FAQItem key={faq.id} faq={faq} />
          ))}
        </div>
      </Container>
    </section>
  )
}
