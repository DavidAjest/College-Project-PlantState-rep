import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AlreadyLoggedInGuard(Component) {
    return function useAuthenticated(props) {
        const { user } = useAuth()
        if (user)
            return <Navigate to="/" />
        return <Component {...props} />
    }
}

export default AlreadyLoggedInGuard;