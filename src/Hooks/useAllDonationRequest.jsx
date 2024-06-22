import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllDonationRequest = (filter) => {
    const axiosSecure = useAxiosSecure()
    const {
        data: all_donation_request = [],
        refetch
    } = useQuery({
        queryKey: [filter, "all-donation-request"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-donation-request?status=${filter}`)
            return res.data
        }
    })

    return [all_donation_request, refetch]
};

export default useAllDonationRequest;