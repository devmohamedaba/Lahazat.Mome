import PropTypes from 'prop-types'
import {motion} from 'framer-motion'
import {Image, ArrowUpRight} from 'lucide-react'

export default function PortfolioCard({item}) {
  return (
    <motion.div
      whileHover={{y: -8}}
      transition={{duration: 0.3}}
      className="group relative overflow-hidden rounded-3xl"
    >
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80" />

      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 backdrop-blur-md">
          <Image size={16} />

          <span className="text-sm">{item.category}</span>
        </div>

        <h3 className="font-serif text-3xl font-bold">{item.title}</h3>

        <button className="mt-5 flex items-center gap-2 text-[#D6B87A] transition hover:gap-4">
          View Project
          <ArrowUpRight size={18} />
        </button>
      </div>
    </motion.div>
  )
}

PortfolioCard.propTypes = {
  item: PropTypes.object.isRequired,
}
