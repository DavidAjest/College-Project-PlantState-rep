import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";



function AuthenticatedGuard(Component, redirect = false) {
    return function useAuthenticated(props) {
        const { user, loadingUser } = useAuth()
        if (!user && loadingUser)
            return null
        if (!user)
            if (redirect)
                return <Navigate to="/auth/login" />
            else
                return <div>
                    You need to be logged in to view this page <Link to="/auth/login">Login here</Link>
                </div>
        return <Component {...props} />
    }
}

export default AuthenticatedGuard;