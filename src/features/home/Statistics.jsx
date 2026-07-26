import {motion} from 'framer-motion'
import {Camera, Heart, Users, Award} from 'lucide-react'

import Container from '../../components/ui/Container'

const statistics = [
  {
    id: 1,
    icon: Camera,
    value: 850,
    suffix: '+',
    title: 'Projects Completed',
  },
  {
    id: 2,
    icon: Heart,
    value: 620,
    suffix: '+',
    title: 'Happy Couples',
  },
  {
    id: 3,
    icon: Users,
    value: 1200,
    suffix: '+',
    title: 'Satisfied Clients',
  },
  {
    id: 4,
    icon: Award,
    value: 15,
    suffix: '+',
    title: 'Industry Awards',
  },
]

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },

  visible: (index) => ({
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.5,
      delay: index * 0.15,
    },
  }),
}

export default function Statistics() {
  return (
    <section className="bg-white py-24">
      <Container>
        <div className="mb-16 text-center">
          <span
            className="
              rounded-full
              bg-[#B08D57]/10
              px-5
              py-2
              text-sm
              font-semibold
              uppercase
              tracking-[3px]
              text-[#B08D57]
            "
          >
            Our Numbers
          </span>

          <h2
            className="
              mt-6
              font-serif
              text-4xl
              font-bold
              text-[#18181B]
              md:text-5xl
            "
          >
            Every Number
            <br />
            Tells A Story
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-lg
              leading-8
              text-gray-600
            "
          >
            We are proud of every memory we have captured and every client who
            trusted Lahazat Moments to preserve life's most valuable moments.
          </p>
        </div>

        <div
          className="
            grid
            gap-8
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {statistics.map((item, index) => {
            const Icon = item.icon

            return (
              <motion.div
                key={item.id}
                custom={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                }}
                whileHover={{
                  y: -8,
                }}
                className="
                  rounded-3xl
                  border
                  border-gray-100
                  bg-[#FCFAF8]
                  p-10
                  text-center
                  shadow-sm
                  transition
                  hover:shadow-xl
                "
              >
                <div
                  className="
                    mx-auto
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    bg-[#B08D57]
                    text-white
                  "
                >
                  <Icon size={30} />
                </div>

                <h3
                  className="
                    mt-8
                    font-serif
                    text-5xl
                    font-bold
                    text-[#18181B]
                  "
                >
                  {item.value}
                  {item.suffix}
                </h3>

                <p
                  className="
                    mt-4
                    text-gray-600
                    font-medium
                  "
                >
                  {item.title}
                </p>
                <div
                  className="
                    mx-auto
                    mt-6
                    h-1
                    w-16
                    rounded-full
                    bg-[#B08D57]
                  "
                />
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
