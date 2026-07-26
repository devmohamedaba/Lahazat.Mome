import {motion} from 'framer-motion'
import Container from '../ui/Container'

import aboutHero from '../../assets/images/about-hero.jpg'

export default function AboutHero() {
  return (
    <section className="relative flex h-[70vh] items-center overflow-hidden">
      {/* Background */}
      <img
        src={aboutHero}
        alt="About Lahazat Moments"
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/65" />

      <Container className="relative z-10">
        <motion.div
          initial={{opacity: 0, y: 35}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.7}}
          className="max-w-3xl"
        >
          <span className="inline-flex rounded-full bg-[#B08D57]/20 px-5 py-2 text-sm font-medium text-[#E5CFA3]">
            About Lahazat Moments
          </span>

          <h1 className="mt-8 font-serif text-5xl font-bold leading-tight text-white md:text-7xl">
            We Capture Stories,
            <br />
            Not Just Photos.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-200">
            Every smile, every tear, every celebration deserves to be
            remembered. Our passion is transforming your special moments into
            timeless memories through photography and cinematic storytelling.
          </p>
        </motion.div>
      </Container>
    </section>
  )
}
