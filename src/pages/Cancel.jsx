import React from "react";
import { Link } from "react-router-dom";

function Cancel() {
  return (
    <div className="flex items-center justify-center flex-col w-screen h-screen">
      <h1 className="text-3xl font-bold">Payment Cancelled</h1>
      <p>Your payment has been cancelled.</p>
      <Link to="/shop" className="text-primary underline mt-4">
        Go Home
      </Link>
    </div>
  );
}

export default Cancel;
