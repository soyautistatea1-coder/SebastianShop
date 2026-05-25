import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import AnimatedSection from '../../components/AnimatedSection'
import { runFloatAnimation } from '../../lib/animations'

function LandingPage() {
  const heroBadgeRef = useRef(null)

  useEffect(() => {
    if (!heroBadgeRef.current) {
      return undefined
    }

    return runFloatAnimation(heroBadgeRef.current)
  }, [])

  return (
    <AnimatedSection className="landing-grid">
      <article className="hero-block reveal-item">
        <p className="hero-eyebrow">Tu tienda de confianza</p>
        <h2>Compra productos generales con estilo y rapidez</h2>
        <p>
          Encuentra articulos para hogar, tecnologia, cuidado personal y estudio en un
          solo lugar.
        </p>

        <div className="hero-cta">
          <Link className="btn btn-primary" to="/catalogo">
            Ver catalogo
          </Link>
          <Link className="btn btn-ghost" to="/registro">
            Crear cuenta
          </Link>
        </div>
      </article>

      <article className="hero-visual reveal-item">
        <div className="hero-orb" ref={heroBadgeRef}>
          <span>Ofertas de temporada</span>
        </div>
        <ul className="hero-notes">
          <li>Despachos rapidos</li>
          <li>Precios competitivos</li>
          <li>Catalogo en crecimiento</li>
        </ul>
      </article>
    </AnimatedSection>
  )
}

export default LandingPage
