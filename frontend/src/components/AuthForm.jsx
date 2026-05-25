import { useMemo, useState } from 'react'

function AuthForm({ title, subtitle, fields, submitLabel, onSubmit, footer }) {
  const initialState = useMemo(
    () =>
      fields.reduce((acc, field) => {
        acc[field.name] = ''
        return acc
      }, {}),
    [fields],
  )

  const [formData, setFormData] = useState(initialState)
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const hasEmpty = Object.values(formData).some((value) => !String(value).trim())

    if (hasEmpty) {
      setError('Completa todos los campos.')
      return
    }

    setError('')
    onSubmit(formData, () => setError('Credenciales no validas.'))
  }

  return (
    <div className="auth-card reveal-item">
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        {fields.map((field) => (
          <label key={field.name} className="field-block">
            <span>{field.label}</span>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              autoComplete="off"
            />
          </label>
        ))}

        {error ? <p className="error-text">{error}</p> : null}

        <button type="submit" className="btn btn-primary">
          {submitLabel}
        </button>
      </form>

      {footer ? <div className="form-footer">{footer}</div> : null}
    </div>
  )
}

export default AuthForm
