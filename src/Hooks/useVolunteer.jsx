import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useVolunteer = () => {
    const { user, loading } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: isVolunteer, isPending: isVolunteerLoading } = useQuery({
        enabled: !loading,
        queryKey: [user?.email, "isVolunteer"],
        queryFn: async () => {
            if (user) {
                const { data } = await axiosSecure.get(`/users/volunteer/${user?.email}`)
                // console.log("adimn data", data);
                return data?.volunteer
            }
            return false
        }
    })
    return [isVolunteer, isVolunteerLoading]
};

export default useVolunteer;