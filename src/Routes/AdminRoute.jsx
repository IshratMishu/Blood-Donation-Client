import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth()
    let [isAdmin, isAdminLoading] = useAdmin()

    const location = useLocation()

    if (loading || isAdminLoading) {
        return <div>
            <progress className="progress w-56"></progress>
            Loading........
        </div>
    }
    if (user && isAdmin) {
        return children;
    }
    return <Navigate to={'/'} state={{ from: location }} replace></Navigate>
};

export default AdminRoute;