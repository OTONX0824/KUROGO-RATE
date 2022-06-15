import { Navigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useAuthContext();
  console.log(user);
  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
