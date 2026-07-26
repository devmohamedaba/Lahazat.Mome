// src/app/App.jsx

import {Suspense} from 'react'
import AppRoutes from './AppRoutes'
import LoadingScreen from '../components/common/LoadingScreen'

export default function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <AppRoutes />
    </Suspense>
  )
}
