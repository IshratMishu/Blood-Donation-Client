import { useLoaderData, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { allDistSubDists } from "../../../../public/DistrictAndUpazilas";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const UpdateDonationRequest = () => {
  const donation_request = useLoaderData();
  const navigate = useNavigate();
  const {
    _id,
    requester_name,
    requester_email,
    recipient_name,
    recipient_district,
    recipient_upazila,
    hospital_name,
    address,
    request_message,
    donation_status,
  } = donation_request;

  const [selectedDistrict, setSelectedDistrict] = useState(recipient_district);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset
  } = useForm();

  const onSubmit = async (data) => {
    // date
    // console.log(date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    // console.log(`${day}-${month}-${year}`);

    // time
    const hours = time.getHours();
    const minutes = String(time.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    // console.log(`${String(formattedHours).padStart(2, '0')}:${minutes} ${ampm}`);

    const requestInfo = {
      requester_name: user?.displayName,
      requester_email: user?.email,
      recipient_name: data.recipient_name,
      recipient_district: data.recipient_district,
      recipient_upazila: data.recipient_upazila,
      hospital_name: data.hospital_name,
      address: data.address,
      donation_date: `${day}-${month}-${year}`,
      donation_time: `${String(formattedHours).padStart(
        2,
        "0"
      )}:${minutes} ${ampm}`,
      request_message: data.message,
      donation_status: donation_status,
      timeStamp: new Date(),
    };
    // console.log(requestInfo);

    // now update
    axiosSecure
      .patch(`/update-donation-request/${_id}`, requestInfo)
      .then((res) => {
        // console.log(res.data);
        if (res.data.modifiedCount > 0) {
          toast.success("Update successfull");
          navigate("/dashboard/all-blood-donation-request");
        }
      });
  };

  //
  const districts = Object.keys(allDistSubDists);
  const upazilas = selectedDistrict ? allDistSubDists[selectedDistrict] : [];
  //

  return (
    <div className="hero min-h-screen">
      <div className="hero-content p-0 flex-col lg:flex-row md:w-3/4 ">
        <div className="card shrink-0 w-full max-w-sm md:max-w-xl bg-red-700 shadow-2xl">
          <h1 className="text-2xl px-5 font-bold text-center mt-6 text-white">
            Update Donation Request
          </h1>
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
              {/* name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Requester Name</span>
                </label>
                <input
                  defaultValue={requester_name}
                  {...register("name")}
                  disabled
                  type="text"
                  placeholder="name"
                  className="input input-bordered"
                  name="name"
                />

                {errors.name && (
                  <span className="text-red-600">Name is required</span>
                )}
              </div>

              {/* email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Requester Email</span>
                </label>
                <input
                  defaultValue={requester_email}
                  {...register("email")}
                  disabled
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  name="email"
                />

                {errors.email && (
                  <span className="text-red-600">Email is required</span>
                )}
              </div>

              {/* recipient_name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Recipient Name</span>
                </label>
                <input
                  defaultValue={recipient_name}
                  {...register("recipient_name", { required: true })}
                  type="text"
                  placeholder="recipient name"
                  className="input input-bordered"
                />

                {errors.recipient_name && (
                  <span className="text-red-600">
                    Recipient Name is required
                  </span>
                )}
              </div>

              {/* recipient district*/}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">
                    Recipient District
                  </span>
                </label>
                <select
                  className="select w-full input-bordered "
                  defaultValue={recipient_district}
                  {...register("recipient_district", {
                    onChange: (e) => {
                      setSelectedDistrict(e.target.value);
                      // setSelectedUpazila("");
                    },
                  })}
                  required
                >
                  <option disabled value="default">
                    Select your District
                  </option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>

              {/*  recipient upazila*/}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">
                    {" "}
                    Recipient Upazila
                  </span>
                </label>
                <select
                  className="select w-full w-full input-bordered "
                  {...register("recipient_upazila")}
                  defaultValue={recipient_upazila}
                  // disabled={!selectedDistrict}
                  required
                >
                  <option disabled value="default">
                    Select your Upazila
                  </option>
                  {upazilas.map((upazila) => (
                    <option key={upazila} value={upazila}>
                      {upazila}
                    </option>
                  ))}
                </select>
              </div>

              {/* Hospital Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Hospital Name</span>
                </label>
                <input
                  defaultValue={hospital_name}
                  {...register("hospital_name", { required: true })}
                  type="text"
                  placeholder="hospital name"
                  className="input input-bordered"
                />

                {errors.hospital_name && (
                  <span className="text-red-600">
                    Hospital Name is required
                  </span>
                )}
              </div>

              {/* Full Address Line */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Full Address</span>
                </label>
                <input
                  defaultValue={address}
                  {...register("address", { required: true })}
                  type="text"
                  placeholder="full address"
                  className="input input-bordered"
                />
                {errors.address && (
                  <span className="text-red-600">Address is required</span>
                )}
              </div>

              {/* Date */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Date</span>
                </label>
                <ReactDatePicker
                  // {...register("date")}
                  className="input w-full input-bordered"
                  selected={date}
                  onChange={(date) => setDate(date)}
                  placeholderText="Select a date"
                  // dateFormat="yyyy-MM-dd"
                  dateFormat="dd-MM-yyyy"
                  required
                />
                {errors.date && (
                  <span className="text-red-600"> Date is required</span>
                )}
              </div>

              {/* Time */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Time</span>
                </label>
                <ReactDatePicker
                  className="input w-full input-bordered"
                  selected={time}
                  onChange={(time) => setTime(time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  placeholderText="Select a time"
                  required
                />
                {errors.date && (
                  <span className="text-red-600"> Date is required</span>
                )}
              </div>

              {/* message */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Message</span>
                </label>
                <input
                  defaultValue={request_message}
                  {...register("message")}
                  type="text"
                  placeholder="write your message"
                  className="input input-bordered"
                />

                {errors.message && (
                  <span className="text-red-600">Name is required</span>
                )}
              </div>
            </div>

            <div className="form-control mt-3">
              <input
                className="btn btn-outline text-red-700 bg-white"
                type="submit"
                value="Update Request"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateDonationRequest;
