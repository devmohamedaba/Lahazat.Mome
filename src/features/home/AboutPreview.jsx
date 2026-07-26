import {motion} from 'framer-motion'
import {CheckCircle2, Camera, Award, Heart} from 'lucide-react'
import {Link} from 'react-router-dom'

import Container from '../ui/Container'
import Button from '../ui/Button'
import SectionTitle from '../ui/SectionTitle'

import aboutImage from '../../assets/images/about.jpg'

const features = [
  'Professional photographers & filmmakers',
  'Luxury editing and color grading',
  'Premium photography equipment',
  'Fast delivery with exceptional quality',
]

const stats = [
  {
    icon: Camera,
    value: '1500+',
    label: 'Projects Completed',
  },
  {
    icon: Award,
    value: '10+',
    label: 'Years Experience',
  },
  {
    icon: Heart,
    value: '1200+',
    label: 'Happy Clients',
  },
]

export default function AboutPreview() {
  return (
    <section className="bg-[#FCFAF8] py-28">
      <Container>
        <div className="grid items-center gap-20 lg:grid-cols-2">
          {/* Image */}
          <motion.div
            initial={{opacity: 0, x: -40}}
            whileInView={{opacity: 1, x: 0}}
            viewport={{once: true}}
            transition={{duration: 0.7}}
            className="relative"
          >
            <img
              src={aboutImage}
              alt="Lahazat Moments Team"
              className="h-[650px] w-full rounded-[32px] object-cover shadow-2xl"
              loading="lazy"
            />

            {/* Floating Card */}
            <div className="absolute -bottom-8 -right-8 rounded-3xl bg-white p-8 shadow-2xl">
              <p className="text-5xl font-bold text-[#B08D57]">10+</p>

              <p className="mt-2 text-gray-600">Years of Excellence</p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{opacity: 0, x: 40}}
            whileInView={{opacity: 1, x: 0}}
            viewport={{once: true}}
            transition={{duration: 0.7}}
          >
            <SectionTitle
              badge="About Us"
              title="Creating Stories Through Every Frame"
              subtitle="Every photograph tells a story. Every film captures an emotion. At Lahazat Moments, we preserve memories that stay with you forever."
            />

            <p className="mt-8 text-lg leading-8 text-gray-600">
              We specialize in luxury wedding photography, cinematic
              videography, family portraits, graduation sessions, and corporate
              events. Our creative team combines artistic vision with technical
              excellence to deliver timeless memories.
            </p>

            <div className="mt-10 space-y-5">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-4">
                  <CheckCircle2 size={22} className="text-[#B08D57]" />

                  <p className="text-gray-700">{feature}</p>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <Link to="/about">
                <Button size="lg">Learn More</Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Statistics */}
        <div className="mt-28 grid gap-8 md:grid-cols-3">
          {stats.map((item) => {
            const Icon = item.icon

            return (
              <motion.div
                key={item.label}
                initial={{opacity: 0, y: 30}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{duration: 0.5}}
                className="rounded-3xl bg-white p-10 text-center shadow-lg"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#B08D57]/10">
                  <Icon size={30} className="text-[#B08D57]" />
                </div>

                <h3 className="text-4xl font-bold text-[#18181B]">
                  {item.value}
                </h3>

                <p className="mt-3 text-gray-600">{item.label}</p>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
