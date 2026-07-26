import PropTypes from 'prop-types'
import {motion} from 'framer-motion'
import {FaFacebook, FaInstagram, FaYoutube} from 'react-icons/fa'

export default function TeamCard({member}) {
  return (
    <motion.article
      whileHover={{y: -8}}
      transition={{duration: 0.3}}
      className="overflow-hidden rounded-3xl bg-white shadow-xl"
    >
      <div className="relative overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          className="h-96 w-full object-cover transition duration-500 hover:scale-110"
        />
      </div>

      <div className="p-8">
        <h3 className="font-serif text-2xl font-bold text-[#18181B]">
          {member.name}
        </h3>

        <p className="mt-2 font-medium text-[#B08D57]">{member.role}</p>

        <p className="mt-4 leading-7 text-gray-600">{member.bio}</p>

        <p className="mt-5 text-sm text-gray-500">{member.experience}</p>

        <div className="mt-6 flex gap-4">
          <a href={member.social.instagram}>
            <FaInstagram size={20} />
          </a>

          <a href={member.social.facebook}>
            <FaFacebook size={20} />
          </a>

          <a href={member.social.linkedin}>
            <FaYoutube size={20} />
          </a>
        </div>
      </div>
    </motion.article>
  )
}

TeamCard.propTypes = {
  member: PropTypes.object.isRequired,
}
