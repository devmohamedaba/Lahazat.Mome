import {motion} from 'framer-motion'
import {ArrowRight} from 'lucide-react'
import {Link} from 'react-router-dom'

import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'
import Button from '../ui/Button'

import services from '../../data/services'

export default function ServicesPreview() {
  return (
    <section className="py-28 bg-white">
      <Container>
        <SectionTitle
          center
          badge="Our Services"
          title="Professional Photography Services"
          subtitle="We provide premium photography and videography services tailored to capture your most valuable moments."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon

            return (
              <motion.div
                key={service.id}
                initial={{opacity: 0, y: 30}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -10,
                }}
                className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                  <div className="absolute bottom-5 left-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white">
                    <Icon size={28} className="text-[#B08D57]" />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-serif text-2xl font-bold text-[#18181B]">
                    {service.title}
                  </h3>

                  <p className="mt-4 text-gray-600 leading-7">
                    {service.description}
                  </p>

                  <button className="mt-6 flex items-center gap-2 font-medium text-[#B08D57] transition hover:gap-3">
                    Learn More
                    <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <Link to="/services">
            <Button size="lg">View All Services</Button>
          </Link>
        </div>
      </Container>
    </section>
  )
}
