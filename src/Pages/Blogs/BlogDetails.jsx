import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";

const BlogDetails = () => {
  const blog = useLoaderData();
  return (
    <div className="pt-28">
      <Helmet>
        <title>VITAL Blood | Blog Details</title>
      </Helmet>

      <div className="flex p-5 rounded-lg bg-slate-100 flex-col gap-6 shadow-xl mt-7">
        <figure>
          <img className=" w-full" src={blog?.thumbnail} alt="Shoes" />
        </figure>

        <div className="">
          <h2 className="card-title">{blog?.title}</h2>

          <div dangerouslySetInnerHTML={{ __html: blog?.content }}></div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
