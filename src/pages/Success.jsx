import React from "react";
import { Link } from "react-router-dom";

function Success() {
  return (
    <div className="flex items-center justify-center flex-col w-screen h-screen">
      <h1 className="text-3xl font-bold">Payment successful!</h1>
      <p className="text-lg text-center">Thank you for your purchase.</p>
      <Link to="/shop" className="text-primary underline mt-4">
        Go Home
      </Link>
    </div>
  );
}

export default Success;
