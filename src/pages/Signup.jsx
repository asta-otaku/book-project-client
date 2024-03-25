import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Spinner } from "flowbite-react";
import { CONSTANT } from "../util";

function Signup() {
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!formValues.email || !formValues.password || !formValues.name) {
      return toast.error("Please fill all fields");
    }

    if (formValues.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${CONSTANT.BASE_URL}/users/signup`,
        formValues
      );
      if (res.status === 200) {
        toast.success("User created successfully");
        window.location.href = "/verify";
      }
    } catch (error) {
      toast.error(error.response.data);
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
                <h1 className="text-2xl font-semibold">Sign up Form</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <form
                  onSubmit={handleSignUp}
                  className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
                >
                  <div className="relative">
                    <input
                      onChange={handleChange}
                      name="name"
                      type="text"
                      className="peer  h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Name"
                    />
                  </div>
                  <div className="relative">
                    <input
                      onChange={handleChange}
                      name="email"
                      type="text"
                      className="peer  h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Email address"
                    />
                  </div>
                  <div className="relative">
                    <input
                      onChange={handleChange}
                      name="phoneNumber"
                      type="text"
                      className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Phone Number"
                    />
                  </div>
                  <div className="relative">
                    <input
                      onChange={handleChange}
                      name="password"
                      type="password"
                      className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password"
                    />
                  </div>
                  <p className="text-xs my-2">
                    If you have an account, Please{" "}
                    <Link to="/login" className="text-blue-700 underline">
                      Log in
                    </Link>
                  </p>
                  <Link to="/" className="text-xs underline text-primary">
                    Home
                  </Link>
                  <div className="relative">
                    <button
                      disabled={loading}
                      className="bg-blue-500 text-white rounded-md px-6 py-2"
                    >
                      {loading ? <Spinner /> : "Sign up"}
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

export default Signup;
