import {useForm} from 'react-hook-form'
import {motion} from 'framer-motion'
import {Send} from 'lucide-react'
import toast from 'react-hot-toast'

import Container from '../ui/Container'
import Button from '../ui/Button'

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isSubmitting},
  } = useForm()

  const onSubmit = async (data) => {
    try {
      console.log(data)

      // هنا سيتم ربط API أو Email Service لاحقاً

      await new Promise((resolve) => setTimeout(resolve, 1200))

      toast.success('Your message has been sent successfully!')

      reset()
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <section className="bg-white py-28">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Form Intro */}

          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
          >
            <span
              className="
              text-sm 
              font-semibold 
              uppercase 
              tracking-[4px]
              text-[#B08D57]
            "
            >
              Contact Form
            </span>

            <h2
              className="
              mt-6
              font-serif
              text-5xl
              font-bold
              text-[#18181B]
            "
            >
              Tell Us About Your Special Moment
            </h2>

            <p
              className="
              mt-6
              leading-8
              text-gray-600
            "
            >
              Share your event details with us and our team will contact you
              shortly to discuss the perfect photography package.
            </p>
          </motion.div>

          {/* Form */}

          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{
              opacity: 0,
              x: 40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            className="
              rounded-3xl
              bg-[#FCFAF8]
              p-8
              shadow-xl
            "
          >
            {/* Name */}

            <InputField
              label="Full Name"
              name="name"
              register={register}
              errors={errors}
              rules={{
                required: 'Name is required',
              }}
            />

            {/* Email */}

            <InputField
              label="Email Address"
              name="email"
              type="email"
              register={register}
              errors={errors}
              rules={{
                required: 'Email is required',

                pattern: {
                  value: /^\S+@\S+$/i,

                  message: 'Invalid email',
                },
              }}
            />

            {/* Phone */}

            <InputField
              label="Phone Number"
              name="phone"
              register={register}
              errors={errors}
              rules={{
                required: 'Phone number is required',
              }}
            />

            {/* Event */}

            <div className="mb-5">
              <label
                className="
                mb-2
                block
                font-medium
              "
              >
                Event Type
              </label>

              <select
                {...register('event', {
                  required: 'Please select event type',
                })}
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  px-5
                  py-4
                  outline-none
                  focus:border-[#B08D57]
                "
              >
                <option value="">Select Event</option>

                <option>Wedding</option>

                <option>Engagement</option>

                <option>Family Session</option>

                <option>Corporate Event</option>

                <option>Other</option>
              </select>

              {errors.event && (
                <p
                  className="
                  mt-2
                  text-sm
                  text-red-500
                "
                >
                  {errors.event.message}
                </p>
              )}
            </div>

            {/* Message */}

            <div className="mb-6">
              <label
                className="
                mb-2
                block
                font-medium
              "
              >
                Message
              </label>

              <textarea
                rows="5"
                {...register('message', {
                  required: 'Message is required',
                })}
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-gray-200
                  px-5
                  py-4
                  outline-none
                  focus:border-[#B08D57]
                "
              />

              {errors.message && (
                <p
                  className="
                  mt-2
                  text-sm
                  text-red-500
                "
                >
                  {errors.message.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="
                w-full
              "
            >
              {isSubmitting ? (
                'Sending...'
              ) : (
                <>
                  Send Message
                  <Send size={18} className="ml-2" />
                </>
              )}
            </Button>
          </motion.form>
        </div>
      </Container>
    </section>
  )
}

function InputField({label, name, type = 'text', register, errors, rules}) {
  return (
    <div className="mb-5">
      <label
        className="
 mb-2
 block
 font-medium
"
      >
        {label}
      </label>

      <input
        type={type}
        {...register(name, rules)}
        className="
w-full
rounded-xl
border
border-gray-200
px-5
py-4
outline-none
focus:border-[#B08D57]
"
      />

      {errors[name] && (
        <p
          className="
mt-2
text-sm
text-red-500
"
        >
          {errors[name].message}
        </p>
      )}
    </div>
  )
}
