import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";



function AuthenticatedAdminGuard(Component, redirect = false) {
    return function useAuthenticated(props) {
        const { user, loadingUser } = useAuth()
        if (!user && loadingUser)
            return null
        if (!user || !user.isAdmin)
            if (redirect)
                return <Navigate to="/auth/login" />
            else
                return <div>
                    You need to be an admin to view this page <Link to="/">Back home</Link>
                </div>
        return <Component {...props} />
    }
}

export default AuthenticatedAdminGuard;