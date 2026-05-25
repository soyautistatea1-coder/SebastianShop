export const initialCategories = [
  { id: 'cat-1', name: 'Hogar', description: 'Accesorios y soluciones para tu casa' },
  { id: 'cat-2', name: 'Tecnologia', description: 'Gadgets y dispositivos de uso diario' },
  { id: 'cat-3', name: 'Cuidado Personal', description: 'Productos de bienestar y cuidado' },
  { id: 'cat-4', name: 'Escolar', description: 'Elementos para estudio y oficina' },
]

export const initialProducts = [
  {
    id: 'prod-1',
    name: 'Termo Acero 1L',
    categoryId: 'cat-1',
    price: 79900,
    stock: 23,
    badge: 'Mas vendido',
    image:
      'https://images.unsplash.com/photo-1610824352934-c10d87b700cc?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'prod-2',
    name: 'Luz LED Inteligente',
    categoryId: 'cat-2',
    price: 45900,
    stock: 45,
    badge: 'Nuevo',
    image:
      'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'prod-3',
    name: 'Set Skincare Diario',
    categoryId: 'cat-3',
    price: 99900,
    stock: 18,
    badge: 'Oferta',
    image:
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'prod-4',
    name: 'Kit Marcadores x24',
    categoryId: 'cat-4',
    price: 32900,
    stock: 60,
    badge: 'Top',
    image:
      'https://images.unsplash.com/photo-1516383607781-913a19294fd1?auto=format&fit=crop&w=900&q=80',
  },
]

export const initialUsers = [
  {
    id: 'user-1',
    name: 'Sebastian Admin',
    email: 'admin@tiendasebastian.com',
    password: 'Admin123*',
    role: 'admin',
    status: 'activo',
  },
  {
    id: 'user-2',
    name: 'Ana Cliente',
    email: 'ana@correo.com',
    password: 'Cliente123*',
    role: 'cliente',
    status: 'activo',
  },
]

export const roleOptions = [
  { value: 'admin', label: 'Administrador' },
  { value: 'cliente', label: 'Cliente' },
]

export const statusOptions = [
  { value: 'activo', label: 'Activo' },
  { value: 'inactivo', label: 'Inactivo' },
]
