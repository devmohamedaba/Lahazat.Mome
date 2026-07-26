import {motion} from 'framer-motion'

import Container from '../../components/ui/Container'
import SectionTitle from '../../components/ui/SectionTitle'

const timeline = [
  {
    year: '2015',
    title: 'The Beginning',
    description:
      "Lahazat Moments was founded with a passion for preserving life's most meaningful memories.",
  },
  {
    year: '2017',
    title: 'Studio Expansion',
    description:
      'Expanded our team and introduced cinematic videography services.',
  },
  {
    year: '2020',
    title: '1000+ Happy Clients',
    description:
      'Reached a major milestone by serving more than one thousand satisfied clients.',
  },
  {
    year: '2023',
    title: 'Luxury Brand Identity',
    description:
      'Rebranded with a premium identity and upgraded equipment for world-class results.',
  },
  {
    year: 'Today',
    title: 'Creating Timeless Memories',
    description:
      'Continuing to deliver exceptional photography and videography experiences across Egypt and beyond.',
  },
]

export default function TimelineSection() {
  return (
    <section className="bg-[#FCFAF8] py-28">
      <Container>
        <SectionTitle
          center
          badge="Our Journey"
          title="The Story Behind Lahazat Moments"
          subtitle="Every milestone reflects our commitment to excellence and passion for visual storytelling."
        />

        <div className="relative mx-auto mt-20 max-w-4xl">
          <div className="absolute left-6 top-0 h-full w-1 bg-[#B08D57]/20 md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-16">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{opacity: 0, y: 40}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className={`relative flex flex-col gap-6 md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="flex-1">
                  <div className="rounded-3xl bg-white p-8 shadow-lg">
                    <span className="text-sm font-semibold uppercase tracking-wider text-[#B08D57]">
                      {item.year}
                    </span>

                    <h3 className="mt-3 font-serif text-2xl font-bold text-[#18181B]">
                      {item.title}
                    </h3>

                    <p className="mt-4 leading-8 text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="absolute left-6 top-10 z-10 h-5 w-5 rounded-full border-4 border-white bg-[#B08D57] md:left-1/2 md:-translate-x-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
