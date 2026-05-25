import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ShellLayout from './components/ShellLayout'
import AdminPage from './features/admin/AdminPage'
import LoginPage from './features/auth/LoginPage'
import RegisterPage from './features/auth/RegisterPage'
import CatalogPage from './features/catalog/CatalogPage'
import LandingPage from './features/landing/LandingPage'
import { createId } from './lib/id'
import { initialCategories, initialProducts, initialUsers } from './lib/mockData'
import './App.css'

function App() {
  const [products, setProducts] = useState(initialProducts)
  const [categories, setCategories] = useState(initialCategories)
  const [users, setUsers] = useState(initialUsers)
  const [session, setSession] = useState({
    isAuthenticated: false,
    role: 'guest',
    userName: '',
  })

  const handleLogin = ({ email, password }) => {
    const user = users.find(
      (item) =>
        item.email.toLowerCase() === email.trim().toLowerCase() &&
        item.password === password,
    )

    if (!user) {
      return false
    }

    setSession({
      isAuthenticated: true,
      role: user.role,
      userName: user.name,
    })

    return true
  }

  const handleLogout = () => {
    setSession({
      isAuthenticated: false,
      role: 'guest',
      userName: '',
    })
  }

  const handleRegister = ({ name, email, password }) => {
    const newUser = {
      id: createId('user'),
      name,
      email,
      password,
      role: 'cliente',
      status: 'activo',
    }

    setUsers((prev) => [...prev, newUser])
    setSession({
      isAuthenticated: true,
      role: 'cliente',
      userName: name,
    })
  }

  const createCategory = (data) => {
    setCategories((prev) => [...prev, { id: createId('cat'), ...data }])
  }

  const updateCategory = (id, data) => {
    setCategories((prev) => prev.map((item) => (item.id === id ? { ...item, ...data } : item)))
  }

  const deleteCategory = (id) => {
    const hasProducts = products.some((product) => product.categoryId === id)

    if (hasProducts) {
      window.alert('No puedes eliminar una categoria con productos asociados.')
      return
    }

    setCategories((prev) => prev.filter((item) => item.id !== id))
  }

  const createProduct = (data) => {
    setProducts((prev) => [
      ...prev,
      {
        id: createId('prod'),
        ...data,
        price: Number(data.price),
        stock: Number(data.stock),
      },
    ])
  }

  const updateProduct = (id, data) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              ...data,
              price: Number(data.price),
              stock: Number(data.stock),
            }
          : item,
      ),
    )
  }

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id))
  }

  const createUser = (data) => {
    setUsers((prev) => [...prev, { id: createId('user'), ...data }])
  }

  const updateUser = (id, data) => {
    setUsers((prev) => prev.map((item) => (item.id === id ? { ...item, ...data } : item)))
  }

  const deleteUser = (id) => {
    const currentUser = users.find((item) => item.name === session.userName)
    if (currentUser?.id === id) {
      window.alert('No puedes eliminar el usuario con sesion activa.')
      return
    }

    setUsers((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ShellLayout session={session} onLogout={handleLogout} />}>
          <Route index element={<LandingPage />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/registro" element={<RegisterPage onRegister={handleRegister} />} />
          <Route
            path="/catalogo"
            element={<CatalogPage products={products} categories={categories} />}
          />
          <Route
            path="/admin"
            element={
              <AdminPage
                session={session}
                categories={categories}
                products={products}
                users={users}
                onCreateCategory={createCategory}
                onUpdateCategory={updateCategory}
                onDeleteCategory={deleteCategory}
                onCreateProduct={createProduct}
                onUpdateProduct={updateProduct}
                onDeleteProduct={deleteProduct}
                onCreateUser={createUser}
                onUpdateUser={updateUser}
                onDeleteUser={deleteUser}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
