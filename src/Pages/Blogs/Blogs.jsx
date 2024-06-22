import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Blogs = () => {
  const axiosPublic = useAxiosPublic();
  //load all blog posts
  const { data: blogs = [] } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosPublic.get("/blogs");
      return res.data;
    },
  });

  return (
    <div className="pt-28">
      <Helmet>
        <title>VITAL Blood || Blog</title>
      </Helmet>

      <div className="">
        <h3 className="text-3xl text-center text-red-500 font-bold">
          All Blogs
        </h3>

        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-6 mb-5">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="flex p-2 border-red-400 border rounded-lg bg-slate-100 flex-col lg:flex-row gap-6 shadow-xl mt-7"
            >
              <figure className="w-96 h-50 flex justify-center items-center">
                <img
                  className="w-full h-auto rounded-md"
                  src={blog.thumbnail}
                  alt="Shoes"
                />
              </figure>
              <div className="">
                <h2 className="card-title">{blog.title}</h2>

                <div className=" mt-4">
                  <Link to={`/blog-details/${blog._id}`}>
                    <button className="border-red-400 text-red-600  btn-sm btn-outline btn">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
