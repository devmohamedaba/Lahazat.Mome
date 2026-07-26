import {motion} from 'framer-motion'
import {ArrowRight, Camera} from 'lucide-react'
import {Link} from 'react-router-dom'

import gallery from '../../data/gallery'

import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'
import Button from '../ui/Button'

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },

  visible: (index = 0) => ({
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.6,
      delay: index * 0.1,
    },
  }),
}

export default function GalleryPreview() {
  const previewImages = gallery.slice(0, 6)

  return (
    <section
      className="
        bg-[#FCFAF8]
        py-24
      "
    >
      <Container>
        <SectionTitle
          badge="Portfolio"
          title="Our Latest Moments"
          subtitle="A selection of our favorite stories, captured with passion and attention to every beautiful detail."
          center
        />

        <div
          className="
            mt-16
            grid
            gap-6
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {previewImages.map((item, index) => (
            <motion.article
              key={item.id}
              custom={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{once: true}}
              whileHover={{
                y: -8,
              }}
              className="
                group
                overflow-hidden
                rounded-3xl
                bg-white
                shadow-lg
              "
            >
              <div
                className="
                  relative
                  overflow-hidden
                "
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="
                    h-80
                    w-full
                    object-cover
                    transition
                    duration-700
                    group-hover:scale-110
                  "
                />

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/70
                    via-black/10
                    to-transparent
                    opacity-0
                    transition
                    duration-500
                    group-hover:opacity-100
                  "
                />

                <span
                  className="
                    absolute
                    left-5
                    top-5
                    rounded-full
                    bg-[#B08D57]
                    px-4
                    py-2
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-white
                  "
                >
                  {item.category}
                </span>

                <div
                  className="
                    absolute
                    bottom-6
                    left-6
                    right-6
                    translate-y-6
                    opacity-0
                    transition-all
                    duration-500
                    group-hover:translate-y-0
                    group-hover:opacity-100
                  "
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-full
                        bg-white
                      "
                    >
                      <Camera size={22} className="text-[#B08D57]" />
                    </div>

                    <div>
                      <h3 className="font-serif text-xl font-semibold text-white">
                        {item.title}
                      </h3>

                      <p className="text-sm text-gray-200">
                        Premium Photography
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
            delay: 0.2,
          }}
          className="
            mt-16
            flex
            justify-center
          "
        >
          <Link to="/portfolio">
            <Button
              className="
                group
                inline-flex
                items-center
                gap-3
              "
            >
              View Full Portfolio
              <ArrowRight
                size={18}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  )
}
