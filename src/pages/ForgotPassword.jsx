import React, { useState } from "react";
import { Spinner } from "flowbite-react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { CONSTANT } from "../util";
import { EyeIcon, EyeSlashIcon } from "../assets/icon";

function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
    step: 1,
  });
  const [showPassword, setShowPassword] = useState(false);
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;

  const [loading, setLoading] = useState(false);
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      return toast.error("Please fill all fields");
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${CONSTANT.BASE_URL}/users/forgot-password`,
        {
          email: formData.email,
        }
      );
      if (res.status === 200) {
        toast.success("OTP sent successfully");
        setFormData({ ...formData, step: 2 });
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.otp || !formData.password) {
      return toast.error("Please fill all fields");
    }

    if (formData.password.length < 8) {
      return toast.error("Password must be at least 6 characters");
    }

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (!regex.test(formData.password)) {
      return toast.error(
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
      );
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${CONSTANT.BASE_URL}/users/reset-password`,
        {
          email: formData.email,
          otp: formData.otp,
          password: formData.password,
        }
      );
      if (res.status === 200) {
        toast.success("Password reset successfully");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div>
      {
        {
          1: (
            <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
              <Toaster />
              <div className="relative py-3 sm:max-w-xl w-full sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                  <div className="max-w-md mx-auto">
                    <div>
                      <h1 className="text-2xl font-semibold">
                        Forgot Password
                      </h1>
                    </div>
                    <div className="divide-y divide-gray-200">
                      <form
                        onSubmit={handleForgotPassword}
                        className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
                      >
                        <div className="relative">
                          <input
                            type="email"
                            name="email"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            className="peer  h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                            placeholder="Email address"
                          />
                        </div>
                        <Link
                          to="/login"
                          className="text-xs my-2 underline text-primary"
                        >
                          Login
                        </Link>
                        <div className="relative">
                          <button
                            disabled={loading}
                            className="bg-blue-500 text-white rounded-md px-6 py-2"
                          >
                            {loading ? <Spinner /> : "Send OTP"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ),
          2: (
            <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
              <Toaster />
              <div className="relative py-3 sm:max-w-xl w-full sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                  <div className="max-w-md mx-auto">
                    <div>
                      <h1 className="text-2xl font-semibold">Reset Password</h1>
                    </div>
                    <div className="divide-y divide-gray-200">
                      <form
                        onSubmit={handleVerify}
                        className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
                      >
                        <div className="relative">
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            className="peer  h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                            placeholder="Email address"
                          />
                        </div>
                        <div className="relative">
                          <input
                            type="text"
                            onChange={(e) =>
                              setFormData({ ...formData, otp: e.target.value })
                            }
                            className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                            placeholder="OTP"
                          />
                        </div>
                        <div className="relative flex justify-between w-full">
                          <input
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                password: e.target.value,
                              })
                            }
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
                        <div className="relative flex justify-between w-full">
                          <input
                            type={showPassword ? "text" : "password"}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                confirmPassword: e.target.value,
                              })
                            }
                            className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                            placeholder="Confirm Password"
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
                        <div className="relative">
                          <button
                            disabled={loading}
                            className="bg-blue-500 text-white rounded-md px-6 py-2"
                          >
                            {loading ? <Spinner /> : "Reset Password"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ),
        }[formData.step]
      }
    </div>
  );
}

export default ForgotPassword;
