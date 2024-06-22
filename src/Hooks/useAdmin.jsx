import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const { user, loading } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: isAdmin = false, isPending: isAdminLoading } = useQuery({
        enabled: !loading,

        queryKey: [user?.email, "isAdmin"],
        queryFn: async () => {
            if (user) {
                const { data } = await axiosSecure.get(`/users/admin/${user?.email}`)
                // console.log("adimn data", data);
                return data?.admin
            }
            return false
        }
    })
    return [isAdmin, isAdminLoading]

};

export default useAdmin;