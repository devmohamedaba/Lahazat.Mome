// src/app/AppRoutes.jsx

import {lazy} from 'react'
import {Routes, Route} from 'react-router-dom'

import MainLayout from '../layouts/MainLayout'
import PageTransition from '../components/common/PageTransition'

import ROUTES from '../constants/routes'

const Home = lazy(() => import('../pages/Home'))
const About = lazy(() => import('../pages/About'))
const Services = lazy(() => import('../pages/Services'))
const Specialists = lazy(() => import('../pages/Specialists'))
const Resources = lazy(() => import('../pages/Resources'))
const ArticleDetail = lazy(() => import('../pages/ArticleDetail'))
const FAQ = lazy(() => import('../pages/FAQ'))
const Contact = lazy(() => import('../pages/Contact'))
const BookConsultation = lazy(() => import('../pages/BookConsultation'))
const NotFound = lazy(() => import('../pages/NotFound'))

const page = (Component) => (
  <PageTransition>
    <Component />
  </PageTransition>
)

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={page(Home)} />
        <Route path={ROUTES.ABOUT} element={page(About)} />
        <Route path={ROUTES.SERVICES} element={page(Services)} />
        <Route path={ROUTES.SPECIALISTS} element={page(Specialists)} />
        <Route path={ROUTES.RESOURCES} element={page(Resources)} />
        <Route path="/resources/:slug" element={page(ArticleDetail)} />
        <Route path={ROUTES.FAQ} element={page(FAQ)} />
        <Route path={ROUTES.BOOK} element={page(BookConsultation)} />
        <Route path={ROUTES.CONTACT} element={page(Contact)} />
        <Route path="*" element={page(NotFound)} />
      </Route>
    </Routes>
  )
}
