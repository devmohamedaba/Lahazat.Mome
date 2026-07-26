import {motion} from 'framer-motion'
import {Link} from 'react-router-dom'
import {ArrowRight} from 'lucide-react'

import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'
import Button from '../ui/Button'
import PortfolioCard from './PortfolioCard'

import gallery from '../../data/gallery'

export default function PortfolioPreview() {
  const featuredProjects = gallery.slice(0, 6)

  return (
    <section className="bg-[#FCFAF8] py-28">
      <Container>
        <SectionTitle
          badge="Portfolio"
          title="A Collection of Our Finest Moments"
          subtitle="Every image tells a story. Explore a selection of our favorite photography and videography projects."
          center
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{opacity: 0, y: 40}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
            >
              <PortfolioCard item={item} />
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/portfolio">
            <Button size="lg">
              View Full Portfolio
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  )
}
