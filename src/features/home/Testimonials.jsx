import {motion} from 'framer-motion'

import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'
import TestimonialCard from './TestimonialCard'

import testimonials from '../../data/testimonials'

export default function Testimonials() {
  return (
    <section className="bg-[#FCFAF8] py-28">
      <Container>
        <SectionTitle
          center
          badge="Testimonials"
          title="What Our Clients Say"
          subtitle="The trust of our clients is our greatest achievement. Here are a few of their experiences with Lahazat Moments."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{opacity: 0, y: 40}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
