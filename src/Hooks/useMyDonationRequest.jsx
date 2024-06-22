import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useMyDonationRequest = (filter, email) => {
    const axiosSecure = useAxiosSecure()
    // console.log(filter);

    const {
        data: my_donation_request = [],
        refetch
    } = useQuery({
        queryKey: [filter, "my-donation-request"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-donation-request/${email}?status=${filter}`)
            return res.data
        }
    })

    return [my_donation_request, refetch]
};

export default useMyDonationRequest;