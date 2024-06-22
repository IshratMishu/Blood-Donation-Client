import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layout/Dashboard";
import Root from "../Layout/Root";
import BlogDetails from "../Pages/Blogs/BlogDetails";
import Blogs from "../Pages/Blogs/Blogs";
import DonationDetails from "../Pages/DonationDetails/DonationDetails";
import DonationRequest from "../Pages/DonationRequest/DonationRequest";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Search from "../Pages/Search/Search";
import AdminHome from "../Pages/dashboard/AdminHome/AdminHome";
import AllDonationRequest from "../Pages/dashboard/AllDonationRequest/AllDonationRequest";
import AllUsers from "../Pages/dashboard/AllUsers/AllUsers";
import AddBlog from "../Pages/dashboard/ContentManagement/AddBlog/AddBlog";
import ContentManagement from "../Pages/dashboard/ContentManagement/ContentManagement";
import CreateDonationRequest from "../Pages/dashboard/CreateDonationRequest/CreateDonationRequest";
import DonorHome from "../Pages/dashboard/DonorHome/DonorHome";
import MyDonationRequest from "../Pages/dashboard/MyDonationRequest/MyDonationRequest";
import Profile from "../Pages/dashboard/Profile/Profile";
import UpdateDonationRequest from "../Pages/dashboard/UpdateDonationRequest/UpdateDonationRequest";
import VolunteerHome from "../Pages/dashboard/VolunteerHome/VolunteerHome";
import { API } from "../utils/config";
import AdminOrVolunteerRoute from "./AdminOrVolunteerRoute";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import VolunteerRoute from "./VolunteerRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },

      {
        path: "/search",
        element: <Search></Search>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signUp",
        element: <Register></Register>,
      },
      {
        path: "/donation-requests",
        element: <DonationRequest></DonationRequest>,
      },
      {
        path: "/donation-details/:id",
        element: (
          <PrivateRoute>
            <DonationDetails></DonationDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) => fetch(`${API}/${params.id}`),
      },
      {
        path: "/blogs",
        element: <Blogs></Blogs>,
      },
      {
        path: "/blog-details/:id",
        element: <BlogDetails></BlogDetails>,
        loader: ({ params }) => fetch(`${API}/blogs/${params.id}`),
      },
    ],
  },

  // dashboard
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      // only admin]
      {
        path: "/dashboard/admin-home",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/content-management",
        element: (
          <AdminOrVolunteerRoute>
            {" "}
            <ContentManagement></ContentManagement>
          </AdminOrVolunteerRoute>
        ),
      },
      {
        path: "content-management/add-blog",
        element: (
          <AdminOrVolunteerRoute>
            {" "}
            <AddBlog></AddBlog>
          </AdminOrVolunteerRoute>
        ),
      },

      // admin and volant
      {
        path: "all-blood-donation-request",
        element: (
          <AdminOrVolunteerRoute>
            <AllDonationRequest></AllDonationRequest>
          </AdminOrVolunteerRoute>
        ),
      },

      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },

      // Volunteer
      {
        path: "/dashboard/volunteer-home",
        element: (
          <VolunteerRoute>
            <VolunteerHome></VolunteerHome>
          </VolunteerRoute>
        ),
      },

      // common
      {
        path: "profile/:email",
        element: (
          <PrivateRoute>
            {" "}
            <Profile></Profile>
          </PrivateRoute>
        ),
        loader: ({ params }) => fetch(`${API}/user/${params.email}`),
      },

      {
        path: "create-donation-request",
        element: (
          <PrivateRoute>
            {" "}
            <CreateDonationRequest></CreateDonationRequest>
          </PrivateRoute>
        ),
      },
      {
        path: "my-donation-requests",
        element: (
          <PrivateRoute>
            {" "}
            <MyDonationRequest></MyDonationRequest>
          </PrivateRoute>
        ),
      },

      {
        path: "update-donation-request/:id",
        element: (
          <PrivateRoute>
            <UpdateDonationRequest></UpdateDonationRequest>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${API}/donation-request-byId/${params.id}`),
      },
      // user
      {
        path: "/dashboard/user-home",
        element: (
          <PrivateRoute>
            <DonorHome></DonorHome>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
