import { NavLink, Outlet } from 'react-router-dom'

const menu = [
  { to: '/', label: 'Landing' },
  { to: '/catalogo', label: 'Catalogo' },
  { to: '/login', label: 'Iniciar sesion' },
  { to: '/registro', label: 'Registro' },
  { to: '/admin', label: 'Admin' },
]

function ShellLayout({ session, onLogout }) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-block">
          <span className="brand-kicker">Tienda General</span>
          <h1>Tienda Sebastian</h1>
        </div>

        <nav className="topbar-nav" aria-label="Navegacion principal">
          {menu.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `nav-pill${isActive ? ' nav-pill-active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="session-box">
          {session?.isAuthenticated ? (
            <>
              <span>
                {session.userName} ({session.role})
              </span>
              <button type="button" className="btn btn-ghost" onClick={onLogout}>
                Cerrar sesion
              </button>
            </>
          ) : (
            <span>Sesion no iniciada</span>
          )}
        </div>
      </header>

      <main className="page-wrapper">
        <Outlet />
      </main>
    </div>
  )
}

export default ShellLayout
