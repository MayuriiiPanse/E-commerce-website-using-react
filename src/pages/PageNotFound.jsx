import { Link } from "react-router-dom"

const PageNotFound = () => (
  <div style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "40px 6%" }}>
    <div className="fade-up">
      <p className="serif" style={{ fontSize: "clamp(5rem, 20vw, 9rem)", fontWeight: 400, color: "var(--border)", lineHeight: 1, letterSpacing: "-0.04em" }}>
        404
      </p>
      <h1 className="serif" style={{ fontSize: "clamp(1.3rem, 4vw, 1.8rem)", fontWeight: 400, margin: "14px 0 10px", letterSpacing: "-0.02em" }}>
        Page not found
      </h1>
      <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", marginBottom: 32, lineHeight: 1.6, maxWidth: 320 }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary">Back to shop</Link>
    </div>
  </div>
)

export default PageNotFound
