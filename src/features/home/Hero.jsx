import {motion} from 'framer-motion'
import {ArrowRight, Play, Camera} from 'lucide-react'
import {Link} from 'react-router-dom'

import Container from '../ui/Container'
import Button from '../ui/Button'

import heroImage from '../../assets/images/hero.jpg'

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background */}
      <img
        src={heroImage}
        alt="Luxury Wedding Photography"
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

      <Container className="relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.6}}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-md"
          >
            <Camera size={18} className="text-[#B08D57]" />

            <span className="text-sm tracking-wide text-white">
              Luxury Photography & Videography Studio
            </span>
          </motion.div>

          <motion.h1
            initial={{opacity: 0, y: 35}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8}}
            className="mt-8 font-serif text-5xl font-bold leading-tight text-white md:text-7xl"
          >
            Capture Every Moment,
            <br />
            Create Timeless Memories.
          </motion.h1>

          <motion.p
            initial={{opacity: 0, y: 35}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.2, duration: 0.8}}
            className="mt-8 max-w-2xl text-lg leading-8 text-gray-200"
          >
            From unforgettable weddings to intimate family sessions, we create
            elegant photography and cinematic films that preserve your most
            meaningful moments forever.
          </motion.p>

          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay: 0.4}}
            className="mt-10 flex flex-wrap gap-5"
          >
            <Link to="/services">
              <Button size="lg">
                Explore Services
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>

            <Button
              variant="secondary"
              size="lg"
              className="border-white text-white hover:border-[#B08D57]"
            >
              <Play className="mr-2" size={18} />
              Watch Showreel
            </Button>
          </motion.div>

          {/* Statistics */}
          <motion.div
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.7}}
            className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4"
          >
            <div>
              <h2 className="text-4xl font-bold text-[#B08D57]">10+</h2>

              <p className="mt-2 text-gray-300">Years Experience</p>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-[#B08D57]">500+</h2>

              <p className="mt-2 text-gray-300">Weddings</p>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-[#B08D57]">1200+</h2>

              <p className="mt-2 text-gray-300">Happy Clients</p>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-[#B08D57]">25+</h2>

              <p className="mt-2 text-gray-300">Awards</p>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        animate={{
          y: [0, 12, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-14 w-8 justify-center rounded-full border-2 border-white">
          <div className="mt-2 h-3 w-1 rounded-full bg-white"></div>
        </div>
      </motion.div>
    </section>
  )
}
