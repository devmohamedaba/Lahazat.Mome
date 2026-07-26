// src/layouts/MainLayout.jsx

import {Outlet} from 'react-router-dom'
import useDirection from '../hooks/useDirection'

import Header from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ScrollToTop from './ScrollToTop'

export default function MainLayout() {
  useDirection()

  return (
    <>
      <ScrollToTop />

      <a
        href="#main-content"
        className="
          sr-only
          focus:not-sr-only
          focus:fixed
          focus:top-4
          focus:left-4
          focus:z-[9999]
          rounded-lg
          bg-primary
          px-4
          py-2
          text-white
          shadow-lg
        "
      >
        Skip to main content
      </a>

      <Header />

      <main id="main-content">
        <Outlet />
      </main>

      <Footer />
    </>
  )
}
