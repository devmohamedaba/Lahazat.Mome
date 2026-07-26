import {motion} from 'framer-motion'

import Container from '../ui/Container'

const statistics = [
  {
    value: '10+',
    title: 'Years Experience',
  },
  {
    value: '1500+',
    title: 'Projects Completed',
  },
  {
    value: '1200+',
    title: 'Happy Clients',
  },
  {
    value: '25+',
    title: 'Awards Won',
  },
]

export default function StatsSection() {
  return (
    <section className="bg-[#18181B] py-24">
      <Container>
        <div className="grid gap-8 text-center sm:grid-cols-2 xl:grid-cols-4">
          {statistics.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{opacity: 0, y: 30}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
            >
              <h2 className="font-serif text-5xl font-bold text-[#B08D57]">
                {item.value}
              </h2>

              <p className="mt-4 text-lg text-gray-300">{item.title}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
