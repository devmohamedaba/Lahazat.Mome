import {motion} from 'framer-motion'
import {Link} from 'react-router-dom'

import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'
import Button from '../ui/Button'

import TeamCard from './TeamCard'
import team from '../../data/team'

export default function TeamSection() {
  return (
    <section className="bg-white py-28">
      <Container>
        <SectionTitle
          center
          badge="Our Team"
          title="Meet the Creative Team"
          subtitle="Behind every unforgettable moment is a passionate team dedicated to capturing your story with creativity and precision."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {team.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{opacity: 0, y: 40}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
            >
              <TeamCard member={member} />
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/contact">
            <Button size="lg">Book a Session</Button>
          </Link>
        </div>
      </Container>
    </section>
  )
}
