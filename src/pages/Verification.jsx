import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Spinner } from "flowbite-react";
import { CONSTANT } from "../util";

function Verification() {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!email || !otp) {
      return toast.error("Please fill all fields");
    }

    setLoading(true);
    try {
      const res = await axios.post(`${CONSTANT.BASE_URL}/users/verify`, {
        email,
        otp,
      });
      if (res.status === 200) {
        toast.success("User verified successfully");
        window.location.href = "/login";
      }
    } catch (error) {
      toast.error(error.response.data.Message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <Toaster />
      <div className="relative py-3 sm:max-w-xl w-full sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Verification Form</h1>
              <p className="text-sm">
                We have sent an OTP to your email address. Please enter the OTP
                below to verify your account
              </p>
            </div>
            <div className="divide-y divide-gray-200">
              <form
                onSubmit={handleVerify}
                className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
              >
                <div className="relative">
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="peer  h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Email address"
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    onChange={(e) => setOtp(e.target.value)}
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="OTP"
                  />
                </div>
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
  );
}

export default Verification;
