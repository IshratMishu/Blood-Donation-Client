import { Navigate, useLocation } from "react-router-dom";
import useVolunteer from "../Hooks/useVolunteer";
import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";

const AdminOrVolunteerRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const [isVolunteer, isVolunteerLoading] = useVolunteer()
    const [isAdmin, isAdminLoading] = useAdmin()


    const location = useLocation()

    if (loading || isVolunteerLoading || isAdminLoading) {
        return <div>
            <progress className="progress w-56"></progress>
            Loading........
        </div>
    }
    if ((user && isVolunteer) || (user && isAdmin)) {
        return children;
    }
    return <Navigate to={'/'} state={{ from: location }} replace></Navigate>
};

export default AdminOrVolunteerRoute;