import { Link, useNavigate } from 'react-router-dom'
import AnimatedSection from '../../components/AnimatedSection'
import AuthForm from '../../components/AuthForm'

function LoginPage({ onLogin }) {
  const navigate = useNavigate()

  const handleLogin = (formData, onError) => {
    const isValid = onLogin(formData)

    if (!isValid) {
      onError()
      return
    }

    navigate('/catalogo')
  }

  return (
    <AnimatedSection className="auth-page">
      <AuthForm
        title="Iniciar sesion"
        subtitle="Ingresa con tu cuenta para gestionar compras y pedidos"
        submitLabel="Entrar"
        onSubmit={handleLogin}
        fields={[
          { name: 'email', label: 'Correo electronico', type: 'email' },
          { name: 'password', label: 'Contrasena', type: 'password' },
        ]}
        footer={
          <p>
            Acceso admin demo: admin@tiendasebastian.com / Admin123* <br />
            Aun no tienes cuenta? <Link to="/registro">Registrate</Link>
          </p>
        }
      />
    </AnimatedSection>
  )
}

export default LoginPage
