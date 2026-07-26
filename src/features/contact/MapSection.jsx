import {MapPin} from 'lucide-react'

import Container from '../../components/ui/Container'

export default function MapSection() {
  return (
    <section className="bg-[#FCFAF8] py-24">
      <Container>
        <div className="overflow-hidden rounded-3xl shadow-xl">
          <div
            className="
              relative
              flex
              h-[450px]
              items-center
              justify-center
              bg-gray-200
            "
          >
            {/* Map Placeholder */}

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-br
                from-gray-200
                to-gray-300
              "
            />

            <div
              className="
                relative
                z-10
                flex
                flex-col
                items-center
                rounded-3xl
                bg-white
                p-8
                text-center
                shadow-xl
              "
            >
              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  bg-[#B08D57]/10
                "
              >
                <MapPin size={32} className="text-[#B08D57]" />
              </div>

              <h3
                className="
                  mt-5
                  font-serif
                  text-2xl
                  font-bold
                  text-[#18181B]
                "
              >
                Lahazat Moments Studio
              </h3>

              <p
                className="
                  mt-3
                  text-gray-600
                "
              >
                Cairo, Egypt
              </p>

              <button
                className="
                  mt-6
                  rounded-full
                  bg-[#B08D57]
                  px-6
                  py-3
                  text-white
                  transition
                  hover:bg-[#967542]
                "
              >
                Open Google Maps
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
