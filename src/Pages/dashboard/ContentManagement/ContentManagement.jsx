import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAdmin from "../../../Hooks/useAdmin";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ContentManagement = () => {
  const [filter, setFilter] = useState("all");
  const axiosSecure = useAxiosSecure();
  const [isAdmin] = useAdmin();

  const { data: blogs = [], refetch } = useQuery({
    queryKey: [filter, "blogs"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-blogs?status=${filter}`);
      return res.data;
    },
  });

  const handleUpdateStatus = (status, id) => {
    axiosSecure.patch(`/update-blog-status/${id}`, { status }).then((res) => {
      // console.log(res.data);
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
        axiosSecure.delete(`/delete-blog/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your blog has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <div className="">
      <Helmet>
        <title>VITAL Blood | Content Managements</title>
      </Helmet>

      <div className="flex justify-end">
        <Link to={"/dashboard/content-management/add-blog"}>
          {" "}
          <button className="btn text-red-500 border-red-500 btn-outline">
            Add Blog
          </button>
        </Link>
      </div>

      <div>
        <h3 className="text-3xl text-center text-red-500">All Blogs</h3>

        <div className="text-center mt-5">
          <select
            onChange={(e) => {
              setFilter(e.currentTarget.value);
            }}
            defaultValue={"all"}
            className="select  w-full max-w-xs border-red-500"
          >
            <option disabled value={"all"}>
              Filter By Status
            </option>
            <option value={"all"}>All</option>
            <option value={"draft"}>draft</option>
            <option value={"published"}>published</option>
          </select>
        </div>

        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="flex p-5 rounded-lg bg-slate-100 flex-col lg:flex-row gap-6 shadow-xl mt-7"
          >
            <figure>
              <img className="w-96" src={blog.thumbnail} alt="Shoes" />
            </figure>
            <div className="">
              <h2 className="card-title">{blog.title}</h2>
              <div className="card-actions justify-end items-center mt-5">
                <div className="badge badge-outline badge-lg">
                  {blog.status}
                </div>
                {blog.status === "draft" && (
                  <div
                    onClick={() => handleUpdateStatus("published", blog._id)}
                    className={` ${
                      !isAdmin && "hidden"
                    } btn btn-outline btn-accent btn-sm`}
                  >
                    Publish
                  </div>
                )}
                {blog.status === "published" && (
                  <div
                    onClick={() => handleUpdateStatus("draft", blog._id)}
                    className={` ${
                      !isAdmin && "hidden"
                    } btn btn-outline btn-accent btn-sm`}
                  >
                    Unpublish
                  </div>
                )}
                <div
                  onClick={() => handleDelete(blog._id)}
                  className={` ${
                    !isAdmin && "hidden"
                  } btn btn-outline btn-error btn-sm`}
                >
                  Delete
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentManagement;
