
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { asyncupdateuser } from "../store/actions/userActions"

const Producttemplate = ({ product, index }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.usersReducer?.user)

  const AddtoCartHandler = (product) => {
    if (!user) { navigate("/login"); return }
    const copyuser = { ...user, cart: user.cart ? [...user.cart] : [] }
    const existingIndex = copyuser.cart.findIndex((e) => e?.product?.id === product.id)
    if (existingIndex === -1) {
      copyuser.cart.push({ product, quantity: 1 })
    } else {
      copyuser.cart[existingIndex] = { product, quantity: copyuser.cart[existingIndex].quantity + 1 }
    }
    dispatch(asyncupdateuser(copyuser.id, copyuser))
    navigate("/cart")
  }

  return (
    <div className="card" key={`${product.id}-${index}`} style={{ display: "flex", flexDirection: "column" }}>
      {/* Image */}
      <div style={{
        background: "var(--surface-2)",
        overflow: "hidden",
        aspectRatio: "4/3",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <img
          src={product.image}
          alt={product.title}
          style={{ width: "100%", height: "100%", objectFit: "contain", padding: "14px", transition: "transform 0.3s ease" }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        />
      </div>

      {/* Body */}
      <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", flex: 1 }}>
        {product.category && (
          <span className="tag" style={{ marginBottom: 8, alignSelf: "flex-start" }}>{product.category}</span>
        )}

        <h2 style={{ fontSize: "clamp(0.8rem, 2.5vw, 0.92rem)", fontWeight: 400, color: "var(--text-primary)", marginBottom: 6, lineHeight: 1.4, flex: 1 }}>
          {product.title}
        </h2>

        <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: 12, lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {product.description || ""}
        </p>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.95rem", fontWeight: 500 }}>₹{product.price}</span>
          <div style={{ display: "flex", gap: 6 }}>
            <Link to={`/product/${product.id}`} className="btn btn-outline" style={{ padding: "6px 10px", fontSize: "0.72rem" }}>
              Details
            </Link>
            <button onClick={() => AddtoCartHandler(product)} className="btn btn-primary" style={{ padding: "6px 10px", fontSize: "0.72rem" }}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Producttemplate
