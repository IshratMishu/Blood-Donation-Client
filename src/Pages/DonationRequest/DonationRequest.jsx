import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const DonationRequest = () => {
  const axiosPublic = useAxiosPublic();

  const { data: donation_request = [] } = useQuery({
    queryKey: ["donation-request"],
    queryFn: async () => {
      const res = await axiosPublic.get("/donation-request");
      return res.data;
    },
  });

  return (
    <div className="pt-24">
      <Helmet>
        <title>VITAL Blood | Donation Request</title>
      </Helmet>

      <h3 className="text-3xl text-center text-red-600"> Donation Request</h3>

      <div className="overflow-x-auto mt-9">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr className="text-red-500 font">
              <th>#</th>
              <th>Recipient Name</th>
              <th>Location</th>
              <th>Date</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {donation_request?.map((request, idx) => (
              <tr key={request._id}>
                <th>{idx + 1}</th>
                <td>{request.recipient_name}</td>
                <td>
                  {request.recipient_upazila}, {request.recipient_district}
                </td>
                <td>{request.donation_date}</td>
                <td>{request.donation_time}</td>
                <td>
                  <Link
                    to={`/donation-details/${request._id}`}
                    className="btn btn-xs border-red-600 bg-red-700 text-white btn-outline "
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonationRequest;
