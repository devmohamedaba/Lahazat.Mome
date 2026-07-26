import PropTypes from 'prop-types'
import {Star} from 'lucide-react'
import {motion} from 'framer-motion'

export default function TestimonialCard({testimonial}) {
  return (
    <motion.article
      whileHover={{y: -8}}
      transition={{duration: 0.3}}
      className="rounded-3xl border border-gray-100 bg-white p-8 shadow-lg"
    >
      <div className="mb-6 flex">
        {Array.from({length: testimonial.rating}).map((_, index) => (
          <Star
            key={index}
            size={18}
            className="fill-[#B08D57] text-[#B08D57]"
          />
        ))}
      </div>

      <p className="leading-8 text-gray-600">"{testimonial.review}"</p>

      <div className="mt-8 flex items-center gap-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          loading="lazy"
          className="h-16 w-16 rounded-full object-cover"
        />

        <div>
          <h4 className="font-semibold text-[#18181B]">{testimonial.name}</h4>

          <p className="text-sm text-gray-500">{testimonial.role}</p>
        </div>
      </div>
    </motion.article>
  )
}

TestimonialCard.propTypes = {
  testimonial: PropTypes.shape({
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    review: PropTypes.string.isRequired,
  }).isRequired,
}
