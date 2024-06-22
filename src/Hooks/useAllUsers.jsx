import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAllUsers = (filter) => {
    const axiosSecure = useAxiosSecure()
    const {
        data: all_users = [],
        refetch
    } = useQuery({
        queryKey: [filter, "all-users"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-users?status=${filter}`)
            return res.data
        }
    })

    return [all_users, refetch]
};

export default useAllUsers;