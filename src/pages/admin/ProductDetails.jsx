
import { useSelector, useDispatch } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { asyncdeleteproduct, asyncupdateproduct } from "../../store/actions/productActions"
import { asyncupdateuser } from "../../store/actions/userActions"
import { useState } from "react"

const ProductDetails = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const [saved, setSaved] = useState(false)

  const products = useSelector((state) => state.productReducer.products)
  const user = useSelector((state) => state.usersReducer?.user)
  const product = products?.find((p) => p.id === id)

  const { register, handleSubmit } = useForm({
    defaultValues: {
      image: product?.image, title: product?.title,
      price: product?.price, category: product?.category, description: product?.description,
    },
  })

  if (!product) return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "var(--text-muted)" }}>Loading…</p>
    </div>
  )

  const isAdmin = user?.isAdmin === true || user?.isAdmin === "true"

  const AddtoCartHandler = () => {
    if (!user) { navigate("/login"); return }
    const copyuser = { ...user, cart: user.cart ? [...user.cart] : [] }
    const existingIndex = copyuser.cart.findIndex((e) => e?.product?.id === product.id)
    if (existingIndex === -1) { copyuser.cart.push({ product, quantity: 1 }) }
    else { copyuser.cart[existingIndex] = { product, quantity: copyuser.cart[existingIndex].quantity + 1 } }
    dispatch(asyncupdateuser(copyuser.id, copyuser))
    navigate("/cart")
  }

  const UpdateProductHandler = (formData) => {
    dispatch(asyncupdateproduct({ ...formData, id }))
    setSaved(true)
    setTimeout(() => { setSaved(false); navigate("/") }, 1200)
  }

  const deleteHandler = () => { dispatch(asyncdeleteproduct(id)); navigate("/") }

  return (
    <div className="page-section">
      {/* Product layout — responsive grid */}
      <div className="product-detail-grid fade-up">
        {/* Image */}
        <div className="product-detail-image" style={{
          background: "var(--surface-2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          aspectRatio: "1", overflow: "hidden",
        }}>
          <img src={product.image} alt={product.title} style={{ width: "100%", height: "100%", objectFit: "contain", padding: "clamp(16px, 5%, 36px)" }} />
        </div>

        {/* Info */}
        <div className="product-detail-info">
          {product.category && <span className="tag" style={{ marginBottom: 14, display: "inline-block" }}>{product.category}</span>}
          <h1 className="serif fade-up fade-up-d1" style={{ fontSize: "clamp(1.5rem, 5vw, 2rem)", fontWeight: 400, marginBottom: 10, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            {product.title}
          </h1>
          <p className="fade-up fade-up-d2" style={{ fontSize: "clamp(1.1rem, 3vw, 1.4rem)", fontWeight: 500, marginBottom: 18 }}>
            ₹{product.price}
          </p>
          <p className="fade-up fade-up-d3" style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 28 }}>
            {product.description}
          </p>
          <button onClick={AddtoCartHandler} className="btn btn-primary fade-up fade-up-d4" style={{ padding: "12px 28px", width: "100%", maxWidth: 240 }}>
            Add to cart
          </button>
        </div>
      </div>

      {/* Admin edit */}
      {user && isAdmin && (
        <div className="fade-up" style={{ borderTop: "1px solid var(--border)", paddingTop: 36, marginTop: 48 }}>
          <p style={{ fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 24 }}>
            Admin — Edit product
          </p>
          <form onSubmit={handleSubmit(UpdateProductHandler)} style={{ maxWidth: 560, display: "flex", flexDirection: "column", gap: 20 }}>
            <div><label className="field-label">Image URL</label><input {...register("image")} className="field" type="url" placeholder="https://…" /></div>
            <div><label className="field-label">Title</label><input {...register("title")} className="field" type="text" placeholder="Product title" /></div>
            <div><label className="field-label">Price (₹)</label><input {...register("price")} className="field" type="number" placeholder="0" /></div>
            <div><label className="field-label">Category</label><input {...register("category")} className="field" type="text" placeholder="Category" /></div>
            <div><label className="field-label">Description</label><textarea {...register("description")} className="field" rows={4} placeholder="Description…" style={{ resize: "vertical" }} /></div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", paddingTop: 6 }}>
              <button type="submit" className="btn btn-primary" style={{ flex: 1, minWidth: 140 }}>
                {saved ? "✓ Updated" : "Update product"}
              </button>
              <button type="button" onClick={deleteHandler} className="btn btn-danger" style={{ flex: 1, minWidth: 100 }}>
                Delete
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default ProductDetails

