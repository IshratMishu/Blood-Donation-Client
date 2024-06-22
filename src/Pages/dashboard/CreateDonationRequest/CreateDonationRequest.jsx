import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { allDistSubDists } from "../../../../public/DistrictAndUpazilas";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const CreateDonationRequest = () => {
  const [selectedDistrict, setSelectedDistrict] = useState("");
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
    console.log(date);
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
      donation_status: "pending",
      timeStamp: new Date(),
    };

    // now post
    axiosSecure.post("/donation-request", requestInfo).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        toast.success("Donation request create successfull");
      }
    });
  };

  //
  const districts = Object.keys(allDistSubDists);
  const upazilas = selectedDistrict ? allDistSubDists[selectedDistrict] : [];
  //

  return (
    <div className="hero min-h-screen">
      <Helmet>
        <title>VITAL Blood | Create Donation </title>
      </Helmet>

      <div className="hero-content p-0 flex-col lg:flex-row md:w-3/4 ">
        <div className="card shrink-0 w-full max-w-sm md:max-w-xl shadow-2xl bg-red-700">
          <h1 className="text-2xl px-5 font-bold text-center mt-6 text-white">
            Create Donation Request
          </h1>
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
              {/* name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white ">Name</span>
                </label>
                <input
                  defaultValue={user?.displayName}
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
                  <span className="label-text text-white">Email</span>
                </label>
                <input
                  defaultValue={user?.email}
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
                  defaultValue={"default"}
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
                  defaultValue={"default"}
                  disabled={!selectedDistrict}
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
                className="btn btn-outline text-red-600 bg-white font-bold"
                type="submit"
                value="Create Request"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateDonationRequest;
