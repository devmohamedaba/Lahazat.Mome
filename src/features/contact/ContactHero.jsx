import {motion} from 'framer-motion'
import Container from '../ui/Container'

import heroImage from '../../assets/images/contact-hero.jpg'

export default function ContactHero() {
  return (
    <section className="relative flex h-[60vh] items-center overflow-hidden">
      <img
        src={heroImage}
        alt="Contact Lahazat Moments"
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />

      <div className="absolute inset-0 bg-black/65" />

      <Container className="relative z-10">
        <motion.div
          initial={{opacity: 0, y: 35}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.6}}
          className="max-w-3xl"
        >
          <span className="rounded-full bg-[#B08D57]/20 px-5 py-2 text-sm text-[#E5CFA3]">
            Contact Us
          </span>

          <h1 className="mt-8 font-serif text-5xl font-bold text-white md:text-7xl">
            Let's Create Something
            <br />
            Beautiful Together
          </h1>

          <p className="mt-8 text-lg leading-8 text-gray-200">
            We'd love to hear about your event and help you preserve your most
            memorable moments.
          </p>
        </motion.div>
      </Container>
    </section>
  )
}
