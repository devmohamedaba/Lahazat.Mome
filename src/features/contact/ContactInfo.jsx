import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'

import ContactInfoCard from './ContactInfoCard'
import contactInfo from '../../data/contactInfo'

export default function ContactInfo() {
  return (
    <section className="bg-[#FCFAF8] py-24">
      <Container>
        <SectionTitle
          center
          badge="Get In Touch"
          title="We're Here to Help"
          subtitle="Choose the most convenient way to reach us."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {contactInfo.map((item) => (
            <ContactInfoCard key={item.id} item={item} />
          ))}
        </div>
      </Container>
    </section>
  )
}
