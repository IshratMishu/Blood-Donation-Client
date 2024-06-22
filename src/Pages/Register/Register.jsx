import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { allDistSubDists } from "../../../public/DistrictAndUpazilas";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { imgbb_api } from "../../utils/config";

const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //
  const districts = Object.keys(allDistSubDists);
  const upazilas = selectedDistrict ? allDistSubDists[selectedDistrict] : [];
  //

  const onSubmit = async (data) => {
    // upload image  in imgbb
    const imageFile = { image: data.avatar[0] };
    const imageRes = await axiosPublic.post(imgbb_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    // console.log(imageRes.data);
    if (imageRes.data.success) {
      // create user
      createUser(data.email, data.password)
        .then(() => {
          updateUserProfile(data.name, imageRes.data.data.display_url).then(
            () => {
              // create user entry in the database
              const userInfo = {
                email: data.email,
                name: data.name,
                avatar: imageRes.data.data.display_url,
                bloodGroup: data.bloodGroup,
                district: data.district,
                upazila: data.upazila,
                role: "donor",
                status: "active",
              };
              // console.log(res);
              axiosPublic.post("/users", userInfo).then((res) => {
                if (res.data?.insertedId) {
                  reset();
                  toast.success("Sign Up Success");
                  navigate("/");
                }
              });
            }
          );
          // .catch(err => console.log(err))
        })
        .catch((error) => {
          setRegisterError(error.message);
          // console.log(error.message);
        });
    }
  };

  return (
    <>
      <Helmet>
        <title>VITAL Blood | Sign Up</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200 pt-20">
        <div className="hero-content flex-col lg:flex-row md:w-3/4 ">
          <div className="card shrink-0 w-full max-w-sm md:max-w-xl shadow-2xl bg-[#b91c1c]">
            <h1 className="text-3xl font-bold text-center mt-6 text-white">
              Sign Up now!
            </h1>

            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-white text-white">
                      Name
                    </span>
                  </label>
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    placeholder="name"
                    className="input input-bordered"
                    name="name"
                  />

                  {errors.name && (
                    <span className="text-white">Name is required</span>
                  )}
                </div>

                {/* avatar */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-white">Avatar</span>
                  </label>
                  <input
                    {...register("avatar", { required: true })}
                    type="file"
                    className="file-input file-input-bordered w-full max-w-xs"
                  />

                  {errors.avatar && (
                    <span className="text-white">Avatar is required</span>
                  )}
                </div>
                <div className="flex col-span-2 gap-1">
                  {/* Blood group  */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white">Blood Group</span>
                    </label>
                    <select
                      className="select w-full max-w-xs input-bordered "
                      defaultValue={"default"}
                      {...register("bloodGroup", { required: true })}
                      required
                    >
                      <option disabled value="default">
                        Select your Blood Group
                      </option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>

                    {errors.bloodGroup && (
                      <span className="text-white">
                        Blood group is required
                      </span>
                    )}
                  </div>

                  {/* District*/}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white">District</span>
                    </label>
                    <select
                      className="select w-full max-w-xs input-bordered "
                      defaultValue={"default"}
                      {...register("district", {
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

                  {/* upazila*/}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white">Upazila</span>
                    </label>
                    <select
                      className="select w-full max-w-xs input-bordered "
                      {...register("upazila")}
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
                </div>

                {/* email */}
                <div className="form-control col-span-2">
                  <label className="label">
                    <span className="label-text text-white">Email</span>
                  </label>
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                    name="email"
                  />

                  {errors.email && (
                    <span className="text-white">Email is required</span>
                  )}
                </div>

                {/* password */}
                <div className="form-control col-span-2">
                  <label className="label">
                    <span className="label-text text-white">Password</span>
                  </label>
                  <input
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                    })}
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    name="password"
                  />
                </div>
              </div>

              {registerError && (
                <p className="text-white-500 font-medium pl-1 text-xl ">
                  {registerError.slice(22, 42)}
                </p>
              )}
              <div className="form-control">
                <button className="bg-[#efeded] py-2 mt-5 px-3 rounded text-red-700 font-semibold">
                  Sign In
                </button>
              </div>

              <div className="card-text">
                <p className="text-black text-center">
                  Already have an account?{" "}
                  <Link to="/login">
                    <button className="py-2  px-3 rounded text-white font-semibold">
                      Please login here!
                    </button>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
