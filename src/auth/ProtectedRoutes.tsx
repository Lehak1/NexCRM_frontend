import { useAuth0 } from "@auth0/auth0-react"
import { Navigate, Outlet } from "react-router-dom";




function ProtectedRoutes() {
    const {isLoading,isAuthenticated}=useAuth0();
    if(isLoading){
        return null;
    }
return isAuthenticated ? (<Outlet/>) : (<Navigate to="/" replace/>

  )
}

export default ProtectedRoutes