import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import useAllUsers from "../../../Hooks/useAllUsers";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllUsers = () => {
  const [filter, setFilter] = useState("all");
  const [all_users, refetch] = useAllUsers(filter);
  const axiosSecure = useAxiosSecure();

  const handleBlockAndUnblock = (status, id) => {
    axiosSecure.patch(`/update-user-status/${id}`, { status }).then((res) => {
      // console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
      }
    });
  };

  const handleRoleChange = (role, id) => {
    // console.log(role, id);
    axiosSecure.patch(`/update-user-role/${id}`, { role }).then((res) => {
      // console.log(res.data)s;
      if (res.data.modifiedCount > 0) {
        refetch();
      }
    });
  };

  return (
    <div>
      <h3 className="text-3xl text-center text-red-500">All Users</h3>
      <Helmet>
        <title>VITAL Blood | All Users</title>
      </Helmet>

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
          <option value={"active"}>Active</option>
          <option value={"blocked"}>Blocked</option>
        </select>
      </div>

      <div className="overflow-x-auto mt-10">
        <table className="table table-sm">
          {/* head */}
          <thead>
            <tr className="text-red-500">
              <th>#</th>
              <th>Avatar</th>
              <th>Email</th>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {all_users?.map((user, idx) => (
              <tr key={user._id}>
                <th>{idx + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={user.avatar}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <th>{user.role}</th>
                <td>{user.status}</td>
                <td>
                  <div className="navbar-start flex">
                    <div className="dropdown">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h7"
                          />
                        </svg>
                      </div>
                      <ul
                        tabIndex={0}
                        className="menu menu-sm bg-red-700  text-white dropdown-content -mt-10 z-[1] p-2 shadow rounded-box w-52"
                      >
                        <li>
                          <Link>
                            {user.status === "active" ? (
                              <button
                                onClick={() =>
                                  handleBlockAndUnblock("blocked", user._id)
                                }
                              >
                                Block
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  handleBlockAndUnblock("active", user._id)
                                }
                              >
                                Unblock
                              </button>
                            )}
                          </Link>
                        </li>

                        <li>
                          <Link>
                            <button
                              onClick={() =>
                                handleRoleChange("volunteer", user._id)
                              }
                            >
                              Make Volunteer
                            </button>
                          </Link>
                        </li>

                        <li>
                          <Link>
                            <button
                              onClick={() =>
                                handleRoleChange("admin", user._id)
                              }
                            >
                              Make Admin
                            </button>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
