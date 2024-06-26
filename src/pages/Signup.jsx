import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Spinner } from "flowbite-react";
import { CONSTANT } from "../util";
import { EyeIcon, EyeSlashIcon } from "../assets/icon";

function Signup() {
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;

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

    if (
      !formValues.email ||
      !formValues.password ||
      !formValues.name ||
      !formValues.phoneNumber
    ) {
      return toast.error("Please fill all fields");
    }

    if (formValues.password.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }

    if (!regex.test(formValues.password)) {
      return toast.error(
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
      );
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${CONSTANT.BASE_URL}/users/signup`,
        formValues
      );
      if (res.status === 200) {
        toast.success("User created successfully");
        setTimeout(() => {
          window.location.href = "/verify";
        }, 2000);
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
                  <div className="relative flex justify-between w-full">
                    <input
                      id="password"
                      name="password"
                      onChange={handleChange}
                      type={showPassword ? "text" : "password"}
                      className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="w-5" />
                      ) : (
                        <EyeIcon className="w-5" />
                      )}
                    </button>
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
