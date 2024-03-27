import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./pages/App.jsx";
import DashboardLayout from "./components/dashboard/DashboardLayout.jsx";
import SingleBook from "./components/shop/SingleBook.jsx";
import Shop from "./pages/Shop.jsx";
import "./index.css";
import UploadBook from "./components/dashboard/UploadBook.jsx";
import ManageBooks from "./components/dashboard/ManageBooks.jsx";
import EditBooks from "./components/dashboard/EditBooks.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import { CONSTANT } from "./util.js";
import Verification from "./pages/Verification.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Success from "./pages/Success.jsx";
import Cancel from "./pages/Cancel.jsx";
import NotFound from "./pages/404.jsx";
import Contact from "./pages/Contact.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/book/:id",
    element: <SingleBook />,
    loader: ({ params }) => fetch(`${CONSTANT.BASE_URL}/book/${params.id}`),
  },
  {
    path: "/shop",
    element: <Shop />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },

  // payments routes
  {
    path: "/success",
    element: <Success />,
  },
  {
    path: "/cancel",
    element: <Cancel />,
  },

  // admin routes
  {
    path: "/admin/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/admin/dashboard",
        element: <ManageBooks />,
      },
      {
        path: "/admin/dashboard/upload",
        element: <UploadBook />,
      },

      {
        path: "/admin/dashboard/edit-books/:id",
        element: <EditBooks />,
        loader: ({ params }) => fetch(`${CONSTANT.BASE_URL}/book/${params.id}`),
      },
    ],
  },

  // auth routes
  {
    path: "/sign-up",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/verify",
    element: <Verification />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
