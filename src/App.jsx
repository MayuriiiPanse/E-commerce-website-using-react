
import Mainroutes from "./routes/Mainroutes"
import Nav from "./components/Nav"
import { useEffect } from "react"
import { asynccurrentuser } from "./store/actions/userActions"
import { asyncloadproducts } from "./store/actions/productActions"
import { useDispatch } from "react-redux"
import { seedIfNeeded } from "./utils/localStorageDB"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    seedIfNeeded()
    dispatch(asynccurrentuser())
    dispatch(asyncloadproducts())
  }, [])

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text-primary)" }}>
      <Nav />
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%" }}>
        <Mainroutes />
      </main>
    </div>
  )
}

export default App
