import {Link} from 'react-router-dom'
import {CalendarDays} from 'lucide-react'

import Container from '../../components/ui/Container'
import Button from '../../components/ui/Button'

export default function ServicesCTA() {
  return (
    <section className="bg-[#18181B] py-24">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-serif text-5xl font-bold text-white">
            Ready to Capture Your Story?
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-300">
            Let Lahazat Moments preserve your most precious memories with
            premium photography and cinematic videography.
          </p>

          <div className="mt-10">
            <Link to="/contact">
              <Button size="lg">
                <CalendarDays className="mr-2" size={18} />
                Book Your Session
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
