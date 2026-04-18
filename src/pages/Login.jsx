

import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { asyncloginuser } from "../store/actions/userActions"

const Login = () => {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const LoginHandler = (user) => {
    dispatch(asyncloginuser(user))
    navigate("/")
  }

  return (
    <div className="auth-wrap">
      <div className="auth-box fade-up">
        <div style={{ marginBottom: 40, textAlign: "center" }}>
          <p style={{ fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 10 }}>
            Welcome back
          </p>
          <h1 className="serif" style={{ fontSize: "clamp(1.8rem, 5vw, 2.4rem)", fontWeight: 400, letterSpacing: "-0.02em" }}>
            Sign in
          </h1>
        </div>

        <form onSubmit={handleSubmit(LoginHandler)}>
          <div className="fade-up fade-up-d1" style={{ marginBottom: 24 }}>
            <label className="field-label">Email address</label>
            <input {...register("email", { required: true })} className="field" type="email" placeholder="you@example.com" />
          </div>

          <div className="fade-up fade-up-d2" style={{ marginBottom: 32 }}>
            <label className="field-label">Password</label>
            <input {...register("password", { required: true })} className="field" type="password" placeholder="••••••••" />
          </div>

          <div className="fade-up fade-up-d3">
            <button type="submit" className="btn btn-primary btn-full">Continue</button>
          </div>
        </form>

        <p className="fade-up fade-up-d4" style={{ marginTop: 28, textAlign: "center", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
          No account?{" "}
          <Link to="/register" style={{ color: "var(--text-primary)", borderBottom: "1px solid var(--border-strong)", paddingBottom: 1 }}>
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
