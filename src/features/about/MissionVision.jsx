import {motion} from 'framer-motion'
import {Target, Eye} from 'lucide-react'

import Container from '../ui/Container'

const cards = [
  {
    id: 1,
    icon: Target,
    title: 'Our Mission',
    description:
      'To capture authentic emotions and unforgettable moments through premium photography and cinematic videography, creating timeless memories that families will cherish for generations.',
  },
  {
    id: 2,
    icon: Eye,
    title: 'Our Vision',
    description:
      'To become one of the leading luxury photography studios in the region by delivering exceptional quality, creativity, and an unforgettable client experience.',
  },
]

export default function MissionVision() {
  return (
    <section className="bg-[#FCFAF8] py-28">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2">
          {cards.map((card, index) => {
            const Icon = card.icon

            return (
              <motion.article
                key={card.id}
                initial={{opacity: 0, y: 40}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                whileHover={{y: -8}}
                className="rounded-3xl bg-white p-10 shadow-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#B08D57]/10">
                  <Icon size={32} className="text-[#B08D57]" />
                </div>

                <h2 className="mt-8 font-serif text-3xl font-bold text-[#18181B]">
                  {card.title}
                </h2>

                <p className="mt-6 leading-8 text-gray-600">
                  {card.description}
                </p>
              </motion.article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
