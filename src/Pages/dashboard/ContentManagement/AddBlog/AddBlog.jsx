import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddBlog = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // upload image  in imgbb
    const imageFile = { image: data.thumbnail[0] };
    const imageRes = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    // console.log(imageRes.data);
    if (imageRes.data.success) {
      const blog = {
        title: data.title,
        thumbnail: imageRes.data.data.display_url,
        content: content,
        status: "draft",
      };
      // console.log(blog);

      // now send database
      axiosSecure.post("/add-blog", blog).then((res) => {
        // console.log(res.data);
        if (res.data.insertedId) {
          toast.success("Blog Add Success");
          navigate("/dashboard/content-management");
        }
      });
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200 pt-20">
      <div className="hero-content flex-col lg:flex-row md:w-3/4 ">
        <div className="card shrink-0 w-full  shadow-2xl bg-red-700">
          <h1 className="text-3xl font-bold text-center mt-6 text-white">
            Add Your Blog
          </h1>

          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Title</span>
                </label>
                <input
                  {...register("title", { required: true })}
                  type="text"
                  placeholder="title"
                  className="input input-bordered"
                />

                {errors.title && (
                  <span className="text-red-600">Title is required</span>
                )}
              </div>

              {/* avatar */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Thumbnail</span>
                </label>
                <input
                  {...register("thumbnail", { required: true })}
                  type="file"
                  className="file-input file-input-bordered w-full max-w-xs"
                />

                {errors.thumbnail && (
                  <span className="text-red-600">Thumbnail is required</span>
                )}
              </div>
            </div>

            {/*  */}

            <JoditEditor
              className="mt-7"
              ref={editor}
              value={content}
              onChange={(newContent) => {
                setContent(newContent);
              }}
            />

            <div className="form-control">
              <input
                className="btn btn-outline text-red-500 bg-white"
                type="submit"
                value="Create a Blog"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
