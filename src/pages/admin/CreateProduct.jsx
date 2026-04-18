import { useForm } from "react-hook-form"
import { nanoid } from "nanoid"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { asynccreateproduct } from "../../store/actions/productActions"

const CreateProduct = () => {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const CreateProductHandler = (product) => {
    product.id = nanoid()
    dispatch(asynccreateproduct(product))
    navigate("/products")
  }

  return (
    <div className="page-section" style={{ maxWidth: 560 }}>
      <div className="fade-up" style={{ marginBottom: 36 }}>
        <p style={{ fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 6 }}>Admin</p>
        <h1 className="serif" style={{ fontSize: "clamp(1.6rem, 5vw, 2.2rem)", fontWeight: 400, letterSpacing: "-0.02em" }}>New Product</h1>
      </div>

      <form onSubmit={handleSubmit(CreateProductHandler)} style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div className="fade-up fade-up-d1">
          <label className="field-label">Image URL</label>
          <input {...register("image", { required: true })} className="field" type="url" placeholder="https://example.com/image.jpg" />
        </div>
        <div className="fade-up fade-up-d1">
          <label className="field-label">Product title</label>
          <input {...register("title", { required: true })} className="field" type="text" placeholder="e.g. Wireless Headphones" />
        </div>
        <div className="fade-up fade-up-d2">
          <label className="field-label">Price (₹)</label>
          <input {...register("price", { required: true })} className="field" type="number" placeholder="0" />
        </div>
        <div className="fade-up fade-up-d2">
          <label className="field-label">Category</label>
          <input {...register("category")} className="field" type="text" placeholder="e.g. Electronics" />
        </div>
        <div className="fade-up fade-up-d3">
          <label className="field-label">Description</label>
          <textarea {...register("description")} className="field" rows={5} placeholder="Describe the product…" style={{ resize: "vertical" }} />
        </div>
        <div className="fade-up fade-up-d4" style={{ paddingTop: 6 }}>
          <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>Publish product</button>
        </div>
      </form>
    </div>
  )
}

export default CreateProduct

