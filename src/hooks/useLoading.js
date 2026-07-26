import {useEffect, useState} from 'react'

export default function useLoading(delay = 1200) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return loading
}
