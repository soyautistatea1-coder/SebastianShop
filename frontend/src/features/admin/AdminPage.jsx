import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import AnimatedSection from '../../components/AnimatedSection'
import CrudPanel from '../../components/CrudPanel'
import { roleOptions, statusOptions } from '../../lib/mockData'

function AdminPage({
  session,
  categories,
  products,
  users,
  onCreateCategory,
  onUpdateCategory,
  onDeleteCategory,
  onCreateProduct,
  onUpdateProduct,
  onDeleteProduct,
  onCreateUser,
  onUpdateUser,
  onDeleteUser,
}) {
  const categoryOptions = useMemo(
    () => categories.map((category) => ({ value: category.id, label: category.name })),
    [categories],
  )

  if (!session?.isAuthenticated || session?.role !== 'admin') {
    return (
      <AnimatedSection className="admin-page">
        <article className="admin-guard reveal-item">
          <h2>Panel restringido</h2>
          <p>
            Debes iniciar sesion como administrador para gestionar productos,
            categorias y usuarios.
          </p>
          <Link to="/login" className="btn btn-primary">
            Ir a inicio de sesion
          </Link>
        </article>
      </AnimatedSection>
    )
  }

  return (
    <AnimatedSection className="admin-page">
      <header className="catalog-head reveal-item">
        <h2>Panel Administrador</h2>
        <p>Gestiona las entidades clave de la tienda con operaciones CRUD.</p>
      </header>

      <CrudPanel
        title="CRUD de Categorias"
        rows={categories}
        onCreate={onCreateCategory}
        onUpdate={onUpdateCategory}
        onDelete={onDeleteCategory}
        fields={[
          { name: 'name', label: 'Nombre', type: 'text' },
          { name: 'description', label: 'Descripcion', type: 'text' },
        ]}
      />

      <CrudPanel
        title="CRUD de Productos"
        rows={products}
        onCreate={onCreateProduct}
        onUpdate={onUpdateProduct}
        onDelete={onDeleteProduct}
        fields={[
          { name: 'name', label: 'Nombre', type: 'text' },
          { name: 'categoryId', label: 'Categoria', type: 'select', options: categoryOptions },
          { name: 'price', label: 'Precio', type: 'number' },
          { name: 'stock', label: 'Stock', type: 'number' },
          { name: 'badge', label: 'Etiqueta', type: 'text' },
          { name: 'image', label: 'URL imagen', type: 'url' },
        ]}
      />

      <CrudPanel
        title="CRUD de Usuarios"
        rows={users}
        onCreate={onCreateUser}
        onUpdate={onUpdateUser}
        onDelete={onDeleteUser}
        fields={[
          { name: 'name', label: 'Nombre', type: 'text' },
          { name: 'email', label: 'Correo', type: 'email' },
          { name: 'password', label: 'Contrasena', type: 'password' },
          { name: 'role', label: 'Rol', type: 'select', options: roleOptions },
          { name: 'status', label: 'Estado', type: 'select', options: statusOptions },
        ]}
      />
    </AnimatedSection>
  )
}

export default AdminPage
