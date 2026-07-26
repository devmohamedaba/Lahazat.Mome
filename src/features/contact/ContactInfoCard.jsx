import PropTypes from 'prop-types'
import {motion} from 'framer-motion'

export default function ContactInfoCard({item}) {
  const Icon = item.icon

  return (
    <motion.article
      whileHover={{y: -8}}
      transition={{duration: 0.3}}
      className="rounded-3xl border border-gray-100 bg-white p-8 shadow-lg"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#B08D57]/10">
        <Icon size={30} className="text-[#B08D57]" />
      </div>

      <h3 className="mt-8 text-2xl font-bold text-[#18181B]">{item.title}</h3>

      <a
        href={item.link}
        className="mt-4 block leading-8 text-gray-600 transition hover:text-[#B08D57]"
      >
        {item.value}
      </a>
    </motion.article>
  )
}

ContactInfoCard.propTypes = {
  item: PropTypes.shape({
    icon: PropTypes.elementType.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
}
