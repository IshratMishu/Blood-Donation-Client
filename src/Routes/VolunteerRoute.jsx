import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useVolunteer from "../Hooks/useVolunteer";

const VolunteerRoute = ({children}) => {
    const { user, loading } = useAuth()
    const [isVolunteer, isVolunteerLoading] = useVolunteer()

    const location = useLocation()

    if (loading || isVolunteerLoading) {
        return <div>
            <progress className="progress w-56"></progress>
            Loading........
        </div>
    }
    if (user && isVolunteer) {
        return children;
    }
    return <Navigate to={'/'} state={{ from: location }} replace></Navigate>
};

export default VolunteerRoute;