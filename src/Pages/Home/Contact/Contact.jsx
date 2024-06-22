import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Contact = () => {
  const photo =
    "https://i.ibb.co/GWpJTqq/pexels-puwadon-sang-ngern-2168173-5340267.jpg";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    Swal.fire({
      title: "Message Sent!",
      text: "We will get back to you soon.",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div>
      <div className="text-center mt-28 mb-6">
        <h1 className="text-3xl font-bold text-red-700">Contact Us</h1>
      </div>
      <div
        className="p-10 bg-cover"
        style={{ backgroundImage: `url(${photo})` }}
      >
        <div className="flex flex-col md:flex-row justify-center items-center mt-10">
          <div className="card w-full max-w-md p-5 shadow-md bg-red-700 text-white">
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <p>Phone: (212) 555-1234</p>
            <p>Email: info@blood.com</p>
          </div>
          <div className="card w-full max-w-md p-5 shadow-md bg-base-100 mt-5 md:mt-0 md:ml-10">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="text-black">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="input input-bordered"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="text-red-700">This field is required</span>
                )}
              </div>
              <div className="form-control mt-4">
                <label className="label">
                  <span className="text-black">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Your email"
                  className="input input-bordered"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-700">This field is required</span>
                )}
              </div>
              <div className="form-control mt-4">
                <label className="label">
                  <span className="text-black">Message</span>
                </label>
                <textarea
                  placeholder="Your message"
                  className="textarea textarea-bordered"
                  {...register("message", { required: true })}
                ></textarea>
                {errors.message && (
                  <span className="text-red-700">This field is required</span>
                )}
              </div>
              <div className="form-control mt-6">
                <button className="bg-[#b91c1c] text-white py-2 px-3 rounded font-semibold hover:bg-[#988087]">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
