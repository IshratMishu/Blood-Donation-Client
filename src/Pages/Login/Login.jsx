import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";

const Login = () => {
  const { signInUser } = useAuth();
  const [credentials, setCredentials] = useState("");

  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // navigation systems
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";
  // Function to handle form submission
  const onLogin = ({ email, password }) => {
    signInUser(email, password)
      .then((result) => {
        if (result.user) {
          toast.success("Login Successful!", {
            autoClose: 2000,
          });
          navigate(from);
        }
      })
      .catch(() => {
        setCredentials("Invalid Credentials! Please try again.");
      });
  };

  return (
    <div className="hero min-h-screen bg-base-100 mb-14">
      <div className="hero-content flex flex-col">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#b91c1c]">
            Great to have you back!
          </h1>
        </div>
        <br />
        <div className="card shrink-0 w-full max-w-sm shadow-md shadow-gray-400 bg-[#b91c1c]">
          <form className="card-body" onSubmit={handleSubmit(onLogin)}>
            <div className="form-control">
              <label className="">
                <span className="text-black">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-white">This field is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="">
                <span className="text-black">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-white">This field is required</span>
              )}
              <label className="">
                <a href="#" className="text-black link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control">
              <button
                type="submit"
                className="bg-[#efeded] py-2 mt-5 px-3 rounded text-red-700 font-semibold"
              >
                Sign In
              </button>
            </div>
            {credentials && (
              <small className="text-[#FF497C]">{credentials}</small>
            )}
            <div className="card-text">
              <p className="text-black">
                New here?{" "}
                <Link to="/signUp">
                  <button className="py-2  px-3 rounded text-white font-semibold">
                    Create an Account
                  </button>
                </Link>
              </p>
            </div>
          </form>
          {/* <div className="divider m-0 px-3">or</div>
          <SocialLogins></SocialLogins> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
