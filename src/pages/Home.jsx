

import React from 'react'

function Home() {
  return (
    <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 6%", textAlign: "center" }}>
      <div className="fade-up">
        <p style={{ fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 14 }}>Welcome</p>
        <h1 className="serif" style={{ fontSize: "clamp(2.4rem, 10vw, 4rem)", fontWeight: 400, letterSpacing: "-0.02em" }}>Home</h1>
      </div>
    </div>
  )
}

export default Home

