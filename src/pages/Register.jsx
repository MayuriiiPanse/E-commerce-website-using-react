import { useForm } from "react-hook-form"
import { nanoid } from "nanoid"
import { Link, useNavigate } from "react-router-dom"
import { asyncreateruser } from "../store/actions/userActions"
import { useDispatch } from "react-redux"

const Register = () => {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const RegisterHandler = (user) => {
    user.id = nanoid()
    user.isAdmin = false
    user.cart = []
    dispatch(asyncreateruser(user))
    navigate("/login")
  }

  return (
    <div className="auth-wrap">
      <div className="auth-box fade-up">
        <div style={{ marginBottom: 40, textAlign: "center" }}>
          <p style={{ fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 10 }}>
            Get started
          </p>
          <h1 className="serif" style={{ fontSize: "clamp(1.8rem, 5vw, 2.4rem)", fontWeight: 400, letterSpacing: "-0.02em" }}>
            Create account
          </h1>
        </div>

        <form onSubmit={handleSubmit(RegisterHandler)}>
          <div className="fade-up fade-up-d1" style={{ marginBottom: 24 }}>
            <label className="field-label">Full name</label>
            <input {...register("username", { required: true })} className="field" type="text" placeholder="John Doe" />
          </div>

          <div className="fade-up fade-up-d2" style={{ marginBottom: 24 }}>
            <label className="field-label">Email address</label>
            <input {...register("email", { required: true })} className="field" type="email" placeholder="you@example.com" />
          </div>

          <div className="fade-up fade-up-d3" style={{ marginBottom: 32 }}>
            <label className="field-label">Password</label>
            <input {...register("password", { required: true })} className="field" type="password" placeholder="••••••••" />
          </div>

          <div className="fade-up fade-up-d4">
            <button type="submit" className="btn btn-primary btn-full">Create account</button>
          </div>
        </form>

        <p style={{ marginTop: 28, textAlign: "center", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
          Already have an account?{" "}
          <Link to="/Login" style={{ color: "var(--text-primary)", borderBottom: "1px solid var(--border-strong)", paddingBottom: 1 }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
