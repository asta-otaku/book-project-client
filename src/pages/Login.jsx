import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "flowbite-react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { CONSTANT } from "../util";

function Login() {
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${CONSTANT.BASE_URL}/users/user-info`, {
          withCredentials: true,
        });
        // if (res.status === 200) {
        //   console.log(res.data);
        //   window.location.href = "/admin/dashboard";
        // }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  const [loading, setLoading] = useState(false);

  const handleLogIn = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${CONSTANT.BASE_URL}/users/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status == 200) {
        toast.success("Login successfully");
        // setTimeout(() => {
        //   window.location.href = "/admin/dashboard";
        // }, 2000);
      } else {
        toast.error("Failed to login");
      }
    } catch (error) {
      toast.error("Failed to login");
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div>
      <Toaster />
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl w-full sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">Login Form</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <form
                  onSubmit={handleLogIn}
                  className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
                >
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="text"
                      className="peer  h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Email address"
                    />
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-between w-full my-2">
                    <p className="text-xs">
                      If you don't have an account, Please{" "}
                      <Link to="/sign-up" className="text-blue-700 underline">
                        Sign up
                      </Link>
                    </p>
                    <Link
                      to="/forgot-password"
                      className="text-xs text-blue-700"
                    >
                      Forgot Password
                    </Link>
                  </div>
                  <Link to="/" className="text-xs underline text-primary">
                    Home
                  </Link>
                  <div className="relative">
                    <button
                      disabled={loading}
                      className="bg-blue-500 text-white rounded-md px-6 py-2"
                    >
                      {loading ? <Spinner /> : "Log in"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
