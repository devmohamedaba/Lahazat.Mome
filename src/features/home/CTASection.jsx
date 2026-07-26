import {motion} from 'framer-motion'
import {ArrowRight, CalendarDays} from 'lucide-react'
import {Link} from 'react-router-dom'

import Container from '../ui/Container'
import Button from '../ui/Button'

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-[#18181B]" />

      {/* Decorative Blurs */}
      <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#B08D57]/20 blur-[120px]" />
      <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#B08D57]/20 blur-[120px]" />

      <Container className="relative z-10">
        <motion.div
          initial={{opacity: 0, y: 35}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.6}}
          className="mx-auto max-w-4xl text-center"
        >
          <span className="inline-flex items-center rounded-full border border-[#B08D57]/30 bg-[#B08D57]/10 px-5 py-2 text-sm font-medium tracking-wide text-[#D9BE8C]">
            Book Your Next Session
          </span>

          <h2 className="mt-8 font-serif text-4xl font-bold leading-tight text-white md:text-6xl">
            Let's Turn Your Special Moments
            <br />
            Into Timeless Memories
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-gray-300">
            Whether it's your wedding, engagement, graduation, family gathering,
            or corporate event, our team is ready to capture every emotion with
            creativity, elegance, and attention to every detail.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
            <Link to="/contact">
              <Button size="lg">
                <CalendarDays className="mr-2" size={18} />
                Book Session
              </Button>
            </Link>

            <Link to="/services">
              <Button
                variant="secondary"
                size="lg"
                className="border-white text-white hover:border-[#B08D57]"
              >
                Explore Services
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
          </div>

          <div className="mt-16 grid gap-8 border-t border-white/10 pt-10 sm:grid-cols-3">
            <div>
              <h3 className="text-4xl font-bold text-[#B08D57]">1500+</h3>
              <p className="mt-2 text-gray-400">Successful Projects</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-[#B08D57]">1200+</h3>
              <p className="mt-2 text-gray-400">Happy Clients</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-[#B08D57]">10+</h3>
              <p className="mt-2 text-gray-400">Years of Experience</p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
