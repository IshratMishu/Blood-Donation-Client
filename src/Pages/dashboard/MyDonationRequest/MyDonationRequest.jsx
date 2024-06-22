import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useMyDonationRequest from "../../../Hooks/useMyDonationRequest";

const MyDonationRequest = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState("all");
  const [my_donation_request, refetch] = useMyDonationRequest(
    filter,
    user.email
  );
  const axiosSecure = useAxiosSecure();

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

  return (
    <div>
      <h3 className="text-3xl text-center text-red-500">
        My Blood Donation Request
      </h3>

      <div className="text-center mt-5">
        <select
          onChange={(e) => {
            setFilter(e.currentTarget.value);
          }}
          defaultValue={"all"}
          className="select border-red-500 w-full max-w-xs"
        >
          <option disabled value={"all"}>
            Filter By Status
          </option>
          <option value={"all"}>All</option>
          <option value={"pending"}>Pending</option>
          <option value={"inprogress"}>Inprogress</option>
          <option value={"done"}>Done</option>
          <option value={"canceled"}>Canceled</option>
        </select>
      </div>
      <Helmet>
        <title>VITAL Blood | My Donation Request</title>
      </Helmet>

      <div className="overflow-x-auto mt-8">
        <table className="table table-sm">
          <thead>
            <tr className="bg-red-700 text-white">
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
            {my_donation_request?.map((request, idx) => (
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
                        onClick={() => handleDoneOrCancel("done", request._id)}
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
    </div>
  );
};

export default MyDonationRequest;
