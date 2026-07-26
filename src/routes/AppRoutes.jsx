import {Routes, Route} from 'react-router-dom'

import MainLayout from '../layouts/MainLayout'

import Home from '../pages/Home'
import About from '../pages/About'
import Services from '../pages/Services'
import Specialists from '../pages/Specialists'
import Resources from '../pages/Resources'
import FAQ from '../pages/FAQ'
import BookConsultation from '../pages/BookConsultation'
import Contact from '../pages/Contact'
import NotFound from '../pages/NotFound'

import ROUTES from '../constants/routes'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<Home />} />

        <Route path={ROUTES.ABOUT} element={<About />} />

        <Route path={ROUTES.SERVICES} element={<Services />} />

        <Route path={ROUTES.SPECIALISTS} element={<Specialists />} />

        <Route path={ROUTES.RESOURCES} element={<Resources />} />

        <Route path={ROUTES.FAQ} element={<FAQ />} />

        <Route path={ROUTES.BOOK} element={<BookConsultation />} />

        <Route path={ROUTES.CONTACT} element={<Contact />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
