import { useMemo, useState } from 'react'

function CrudPanel({ title, fields, rows, onCreate, onUpdate, onDelete, idKey = 'id' }) {
  const initialData = useMemo(
    () =>
      fields.reduce((acc, field) => {
        acc[field.name] = field.defaultValue || ''
        return acc
      }, {}),
    [fields],
  )

  const [formData, setFormData] = useState(initialData)
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState('')

  const reset = () => {
    setFormData(initialData)
    setEditingId(null)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const hasEmpty = fields.some((field) => !String(formData[field.name]).trim())
    if (hasEmpty) {
      setMessage('Completa todos los campos del formulario.')
      return
    }

    if (editingId) {
      onUpdate(editingId, formData)
      setMessage('Registro actualizado correctamente.')
    } else {
      onCreate(formData)
      setMessage('Registro creado correctamente.')
    }

    reset()
  }

  const handleEdit = (row) => {
    setEditingId(row[idKey])
    setFormData(
      fields.reduce((acc, field) => {
        acc[field.name] = row[field.name] ?? ''
        return acc
      }, {}),
    )
  }

  const handleDelete = (id) => {
    onDelete(id)
    if (editingId === id) {
      reset()
    }
    setMessage('Registro eliminado.')
  }

  return (
    <section className="admin-panel reveal-item">
      <div className="admin-panel-head">
        <h3>{title}</h3>
      </div>

      <form className="crud-form" onSubmit={handleSubmit}>
        {fields.map((field) => (
          <label key={field.name} className="field-block">
            <span>{field.label}</span>
            {field.type === 'select' ? (
              <select name={field.name} value={formData[field.name]} onChange={handleChange}>
                <option value="">Selecciona</option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type || 'text'}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
              />
            )}
          </label>
        ))}

        <div className="crud-actions">
          <button type="submit" className="btn btn-primary">
            {editingId ? 'Actualizar' : 'Crear'}
          </button>
          <button type="button" className="btn btn-ghost" onClick={reset}>
            Limpiar
          </button>
        </div>
      </form>

      {message ? <p className="success-text">{message}</p> : null}

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              {fields.map((field) => (
                <th key={field.name}>{field.label}</th>
              ))}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[idKey]}>
                {fields.map((field) => {
                  const optionLabel = field.options?.find(
                    (option) => option.value === row[field.name],
                  )?.label

                  return <td key={field.name}>{optionLabel || row[field.name]}</td>
                })}
                <td>
                  <div className="table-actions">
                    <button type="button" className="btn btn-small" onClick={() => handleEdit(row)}>
                      Editar
                    </button>
                    <button
                      type="button"
                      className="btn btn-small btn-danger"
                      onClick={() => handleDelete(row[idKey])}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr>
                <td colSpan={fields.length + 1}>No hay registros disponibles.</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default CrudPanel
