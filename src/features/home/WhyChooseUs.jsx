import {motion} from 'framer-motion'

import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'

import whyChooseUs from '../../data/whyChooseUs'

export default function WhyChooseUs() {
  return (
    <section className="py-28 bg-white">
      <Container>
        <SectionTitle
          center
          badge="Why Choose Us"
          title="Why Clients Trust Lahazat Moments"
          subtitle="Our passion, creativity, and attention to detail make every session a unique experience."
        />

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {whyChooseUs.map((item, index) => {
            const Icon = item.icon

            return (
              <motion.div
                key={item.id}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -8,
                }}
                className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:border-[#B08D57]/30 hover:shadow-2xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#B08D57]/10 transition group-hover:bg-[#B08D57]">
                  <Icon
                    size={30}
                    className="text-[#B08D57] transition group-hover:text-white"
                  />
                </div>

                <h3 className="mt-8 font-serif text-2xl font-bold text-[#18181B]">
                  {item.title}
                </h3>

                <p className="mt-4 leading-8 text-gray-600">
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
