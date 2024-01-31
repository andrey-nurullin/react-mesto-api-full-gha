import { useContext } from "react"
import { AppContext } from "../contexts/app-context"
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({element: Component, ...props}) => {
  const { isLogged } = useContext(AppContext);
  return (
    isLogged ? <Component {...props} /> : <Navigate to="/signin" replace />
  )
}

export default ProtectedRoute;
