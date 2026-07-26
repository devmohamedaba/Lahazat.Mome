import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'

import ServiceCard from './ServiceCard'
import services from '../../data/services'

export default function ServicesGrid() {
  return (
    <section className="py-28 bg-[#FCFAF8]">
      <Container>
        <SectionTitle
          center
          badge="Services"
          title="What We Offer"
          subtitle="Professional photography and videography services tailored for every special occasion."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Container>
    </section>
  )
}
