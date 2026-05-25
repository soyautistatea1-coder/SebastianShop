import { Link, useNavigate } from 'react-router-dom'
import AnimatedSection from '../../components/AnimatedSection'
import AuthForm from '../../components/AuthForm'

function RegisterPage({ onRegister }) {
  const navigate = useNavigate()

  const handleRegister = (formData) => {
    onRegister(formData)
    navigate('/catalogo')
  }

  return (
    <AnimatedSection className="auth-page">
      <AuthForm
        title="Crear cuenta"
        subtitle="Registrate para explorar el catalogo y recibir novedades"
        submitLabel="Registrarme"
        onSubmit={handleRegister}
        fields={[
          { name: 'name', label: 'Nombre completo', type: 'text' },
          { name: 'email', label: 'Correo electronico', type: 'email' },
          { name: 'password', label: 'Contrasena', type: 'password' },
        ]}
        footer={
          <p>
            Ya tienes cuenta? <Link to="/login">Inicia sesion</Link>
          </p>
        }
      />
    </AnimatedSection>
  )
}

export default RegisterPage
