import { useQuery } from "@tanstack/react-query";
import { FaListAlt, FaUsers } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  return (
    <div className="h-screen flex justify-center items-center flex-col ">
      <h2 className="text-3xl text-red-700">
        <span>Hi, Welcome </span>
        {user?.displayName ? user.displayName : "Back!"}
      </h2>

      <div className="stats shadow mt-7">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaUsers className="text-3xl  text-red-700"></FaUsers>
          </div>
          <div className="stat-title">Total User</div>
          <div className="stat-value">{stats.users}</div>
          {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaListAlt className="text-3xl text-red-700"></FaListAlt>
          </div>
          <div className="stat-title">Total Blood Donation request</div>
          <div className="stat-value">{stats.requests}</div>
          {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
