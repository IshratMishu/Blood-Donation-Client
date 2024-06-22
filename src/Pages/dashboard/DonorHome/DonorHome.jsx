import { useQuery } from "@tanstack/react-query";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const DonorHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: donation_request = [], refetch } = useQuery({
    queryKey: ["recent-donation-request"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/recent-donation-request/${user.email}`
      );
      // console.log(data);
      return data.slice(0, 3);
    },
  });

  const handleDoneOrCancel = (status, id) => {
    axiosSecure.patch(`done-cancel/${id}?status=${status}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/delete-request/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your Request has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  // console.log(donation_request);
  return (
    <div>
      <div>
        <div className="h-screen flex justify-center items-center ">
          <div className="text-center">
            <h2 className="text-3xl">
              <span>Hello, {user?.displayName || "Dear"}</span>
            </h2>
            <h4>Welcome to dashboard</h4>
          </div>
        </div>
      </div>

      <div className={`${donation_request.length === 0 && "hidden"}`}>
        <h3 className="text-3xl text-center mt-6">Recent Donation Request</h3>

        <div className="overflow-x-auto mt-8">
          <table className="table table-sm">
            <thead>
              <tr className="bg-orange-400">
                <th>#</th>
                <th>Recipient Name</th>
                <th>Recipient location</th>
                <th>Donation date</th>
                <th>Donation time</th>
                <th>Donation status</th>
                <th>Donor Action</th>
                <th>Donor information</th>
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
                  <td>{request.donation_status}</td>
                  <td>
                    {request.donation_status === "inprogress" && (
                      <p className="flex gap-2">
                        <button
                          onClick={() =>
                            handleDoneOrCancel("done", request._id)
                          }
                          className="btn btn-xs btn-accent btn-outline"
                        >
                          Done
                        </button>
                        <button
                          onClick={() =>
                            handleDoneOrCancel("canceled", request._id)
                          }
                          className="btn btn-xs btn-error btn-outline"
                        >
                          Cancel
                        </button>
                      </p>
                    )}
                  </td>
                  <td className="text-center">
                    <p>{request?.donor_name}</p>
                    <p> {request?.donor_email}</p>
                  </td>
                  {/* <td>
                                    <FaEdit className='text-2xl bg-amber-600 hover:bg-amber-500 text-white p-1 rounded-md'></FaEdit>
                                </td> */}
                  <td className="flex gap-3">
                    <Link
                      to={`/dashboard/update-donation-request/${request._id}`}
                    >
                      <FaEdit className="text-2xl bg-amber-600 hover:bg-amber-500 text-white p-1 rounded-md"></FaEdit>
                    </Link>

                    <button onClick={() => handleDelete(request._id)}>
                      <MdDeleteForever className="text-2xl bg-red-700 hover:bg-red-700 text-white p-1 rounded-md"></MdDeleteForever>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Link
          to={"/dashboard/my-donation-requests"}
          className="text-center flex justify-center "
        >
          <button className="btn btn-accent mt-7">
            View My All Donation Requests
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DonorHome;
