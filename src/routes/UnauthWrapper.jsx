import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const UnauthWrapper = (props) => {
    const {user} = useSelector((state)=> state.usersReducer)
    
  return !user ? props.children : <Navigate to="/"/>
}

export default UnauthWrapper;