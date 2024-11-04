import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({adminOnly}) => {
    const {token, isAdmin} = useSelector((state) => state.auth);

    
   
    

    if(!token) {
        return <Navigate to={'/login'} replace />
    }

 
    

    if(adminOnly && !isAdmin) {
        return <Navigate to={'/'} replace  />
    }

    if(token) {
        return  <Outlet />
    }

    return <Outlet />;
}
export default ProtectedRoute