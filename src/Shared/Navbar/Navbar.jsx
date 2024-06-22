import { Link, NavLink, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import useAdmin from "../../Hooks/useAdmin";
import useAuth from "../../Hooks/useAuth";
import useVolunteer from "../../Hooks/useVolunteer";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isAdmin] = useAdmin();
  const [isVolunteer] = useVolunteer();
  const navigate = useNavigate();
  // logout user
  const handleLogout = () => {
    logout();
  };
  const linkStyle = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "",
      color: isActive ? "#b91c1c" : "",
      background: isActive ? "none" : "none",
      border: isActive ? "2px solid #b91c1c" : "",
      fontSize: isActive ? "16px" : "14px",
    };
  };
  const navLinks = (
    <>
      <li>
        <NavLink style={linkStyle} to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink style={linkStyle} to="/donation-requests">
          Donation Requests
        </NavLink>
      </li>
      <li>
        <NavLink style={linkStyle} to="/blogs">
          Blog
        </NavLink>
      </li>
      {/* <li><NavLink to='/dashboard'>Dashboard</NavLink></li> */}

      {user && isAdmin && (
        <li>
          <NavLink style={linkStyle} to="/dashboard/admin-home">
            Dashboard
          </NavLink>
        </li>
      )}
      {!isAdmin && !isVolunteer && user && (
        <li>
          <NavLink style={linkStyle} to="/dashboard/user-home">
            Dashboard
          </NavLink>
        </li>
      )}
      {user && isVolunteer && (
        <li>
          <NavLink style={linkStyle} to="/dashboard/volunteer-home">
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="bg-black bg-opacity-30  text-white fixed z-10 max-w-screen-xl mx-auto navbar shadow-xl rounded-b-xl mb-[50px] ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-slate-600 text-white rounded-box w-52"
          >
            {navLinks}
            {user ? (
              <li>
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          {" "}
          <img
            className="h-12 w-28 rounded-sm hidden lg:flex"
            src="https://i.ibb.co/k9Nmx7J/Blue-Modern-Domain-Registrar-Business-Company-Logo.png"
            alt=""
          />
        </Link>
      </div>

      <div className="lg:navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal  px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="flex  items-center gap-3 md:gap-6 ">
            <img
              data-tooltip-id="my-tooltip"
              data-tooltip-content={user?.displayName}
              className="h-14 w-14 rounded-full"
              src={user.photoURL}
              alt=""
            />{" "}
            <div onClick={handleLogout}>
              <Link className="btn border-red-600 text-red-700 btn-outline hidden md:flex">
                <span className="">Logout</span>
              </Link>
            </div>{" "}
          </div>
        ) : (
          <Link
            to="/login"
            className="btn btn-outline hidden md:flex btn-ghost"
          >
            <span className="text-white">Login</span>
          </Link>
        )}
        <Tooltip id="my-tooltip" />
      </div>
    </div>
  );
};

export default Navbar;
