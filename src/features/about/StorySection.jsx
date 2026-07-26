import {motion} from 'framer-motion'
import {CheckCircle2} from 'lucide-react'

import Container from '../ui/Container'
import Button from '../ui/Button'

import storyImage from '../../assets/images/story.jpg'

const highlights = [
  'Luxury wedding photography',
  'Professional cinematic videography',
  'Creative editing & color grading',
  'Friendly and experienced team',
]

export default function StorySection() {
  return (
    <section className="py-28 bg-white">
      <Container>
        <div className="grid items-center gap-20 lg:grid-cols-2">
          <motion.div
            initial={{opacity: 0, x: -35}}
            whileInView={{opacity: 1, x: 0}}
            viewport={{once: true}}
          >
            <img
              src={storyImage}
              alt="Our Story"
              loading="lazy"
              className="rounded-[32px] shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial={{opacity: 0, x: 35}}
            whileInView={{opacity: 1, x: 0}}
            viewport={{once: true}}
          >
            <span className="text-sm font-semibold uppercase tracking-[4px] text-[#B08D57]">
              Our Story
            </span>

            <h2 className="mt-5 font-serif text-5xl font-bold text-[#18181B]">
              Passion Behind Every Shot
            </h2>

            <p className="mt-8 leading-8 text-gray-600">
              Lahazat Moments was founded with one mission: to preserve life's
              most precious memories through elegant photography and cinematic
              films.
            </p>

            <p className="mt-6 leading-8 text-gray-600">
              We believe every event has its own unique story, and our role is
              to capture it with creativity, emotion, and attention to every
              detail.
            </p>

            <div className="mt-10 space-y-4">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 size={22} className="text-[#B08D57]" />

                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Button>View Our Portfolio</Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
