import { useEffect, useRef } from 'react'
import { runRevealAnimation } from '../lib/animations'

function AnimatedSection({ children, className = '' }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) {
      return undefined
    }

    return runRevealAnimation(sectionRef.current)
  }, [])

  return (
    <section ref={sectionRef} className={className}>
      {children}
    </section>
  )
}

export default AnimatedSection
