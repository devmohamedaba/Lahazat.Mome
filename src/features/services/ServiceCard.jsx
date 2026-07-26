import PropTypes from 'prop-types'
import {motion} from 'framer-motion'
import {ArrowRight} from 'lucide-react'
import {Link} from 'react-router-dom'

export default function ServiceCard({service}) {
  const Icon = service.icon

  return (
    <motion.article
      whileHover={{y: -10}}
      transition={{duration: 0.3}}
      className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lg"
    >
      <div className="relative overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          className="h-72 w-full object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute bottom-5 left-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg">
          <Icon size={30} className="text-[#B08D57]" />
        </div>
      </div>

      <div className="p-8">
        <h3 className="font-serif text-3xl font-bold text-[#18181B]">
          {service.title}
        </h3>

        <p className="mt-5 leading-8 text-gray-600">{service.description}</p>

        <Link
          to={`/services/${service.id}`}
          className="mt-8 inline-flex items-center gap-2 font-semibold text-[#B08D57] transition-all hover:gap-4"
        >
          Learn More
          <ArrowRight size={18} />
        </Link>
      </div>
    </motion.article>
  )
}

ServiceCard.propTypes = {
  service: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
  }).isRequired,
}
