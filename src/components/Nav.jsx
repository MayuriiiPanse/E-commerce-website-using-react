import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import { asynclogoutuser } from "../store/actions/userActions"

const Nav = () => {
  const user = useSelector((state) => state.usersReducer.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const close = () => setMenuOpen(false)

  const logoutHandler = () => {
    dispatch(asynclogoutuser(user.id))
    navigate("/login")
    close()
  }

  const cartCount = user?.cart?.reduce((sum, i) => sum + (i.quantity || 1), 0) || 0

  const linkClass = ({ isActive }) => "nav-link" + (isActive ? " active" : "")

  return (
    <>
      <header style={{
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
        position: "sticky", top: 0, zIndex: 50,
        height: "var(--nav-h)",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto", padding: "0 5%",
          height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Logo */}
          <NavLink to="/" style={{ textDecoration: "none" }} onClick={close}>
            <span className="serif" style={{ fontSize: "1.2rem", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
              store.
            </span>
          </NavLink>

          {/* Desktop nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 28 }} className="desktop-nav">
            <NavLink to="/" className={linkClass}>Shop</NavLink>
            {user ? (
              <>
                {user?.isAdmin && <NavLink to="/admin/create-product" className={linkClass}>Create</NavLink>}
                <NavLink to="/admin/user-profile" className={linkClass}>Profile</NavLink>
                <NavLink to="/cart" className={linkClass} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  Cart
                  {cartCount > 0 && (
                    <span style={{
                      background: "var(--text-primary)", color: "#fff",
                      fontSize: "0.58rem", borderRadius: "50%",
                      width: 16, height: 16,
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                    }}>{cartCount}</span>
                  )}
                </NavLink>
                <button onClick={logoutHandler} className="btn btn-ghost" style={{ fontSize: "0.85rem" }}>Logout</button>
              </>
            ) : (
              <>
                <NavLink to="/Login" className={linkClass}>Login</NavLink>
                <NavLink to="/Register">
                  <span className="btn btn-primary" style={{ padding: "7px 16px", fontSize: "0.8rem" }}>Register</span>
                </NavLink>
              </>
            )}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="hamburger"
            aria-label="Toggle menu"
            style={{
              background: "none", border: "none", cursor: "pointer",
              padding: 8, display: "none", flexDirection: "column",
              gap: 5, alignItems: "center", justifyContent: "center",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <span style={{
              display: "block", width: 22, height: 1.5,
              background: menuOpen ? "transparent" : "var(--text-primary)",
              transition: "all 0.2s",
              transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none",
            }} />
            <span style={{
              display: "block", width: 22, height: 1.5,
              background: "var(--text-primary)",
              transition: "all 0.2s",
              transform: menuOpen ? "rotate(-45deg)" : "none",
              marginTop: menuOpen ? -8 : 0,
            }} />
            {!menuOpen && <span style={{ display: "block", width: 22, height: 1.5, background: "var(--text-primary)" }} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={"mobile-drawer" + (menuOpen ? " open" : "")}>
        <NavLink to="/" className={linkClass} onClick={close}>Shop</NavLink>
        {user ? (
          <>
            {user?.isAdmin && <NavLink to="/admin/create-product" className={linkClass} onClick={close}>Create Product</NavLink>}
            <NavLink to="/admin/user-profile" className={linkClass} onClick={close}>Profile</NavLink>
            <NavLink to="/cart" className={linkClass} onClick={close} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              Cart {cartCount > 0 && <span style={{
                background: "var(--text-primary)", color: "#fff",
                fontSize: "0.6rem", borderRadius: "50%",
                width: 18, height: 18,
                display: "inline-flex", alignItems: "center", justifyContent: "center",
              }}>{cartCount}</span>}
            </NavLink>
            <button onClick={logoutHandler} className="btn btn-ghost" style={{ fontSize: "1rem", textAlign: "left" }}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/Login" className={linkClass} onClick={close}>Login</NavLink>
            <NavLink to="/Register" onClick={close}>
              <span className="btn btn-primary btn-full" style={{ marginTop: 8 }}>Register</span>
            </NavLink>
          </>
        )}
      </div>

      {/* Overlay when drawer is open */}
      {menuOpen && (
        <div
          onClick={close}
          style={{ position: "fixed", inset: 0, zIndex: 30, background: "rgba(0,0,0,0.15)", top: "var(--nav-h)" }}
        />
      )}

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}

export default Nav

