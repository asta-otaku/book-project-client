import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

import { Card } from "flowbite-react";
import { CONSTANT } from "../util";

function Shop() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch(`${CONSTANT.BASE_URL}/all-books`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
      });
  }, []);

  const itemsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.ceil(books.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  const displayedData = books.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const makePayment = async () => {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_KEY);

    const body = {
      items: [
        {
          id: "book",
          quantity: 1,
        },
      ],
    };
    const header = {
      "Content-Type": "application/json",
    };

    const response = await fetch(
      `${CONSTANT.BASE_URL}/create-checkout-session`,
      {
        method: "POST",
        headers: header,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error.message);
    }
  };

  if (!books.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold">
          No books available at the moment.
        </h1>
      </div>
    );
  }
  const email = "fatairasheed829@gmail.com";

  return (
    <>
      <Navbar />
      <div className="py-32 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl lg:text-5xl font-bold text-center">
          All Books are here
        </h2>

        <div className="my-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayedData.map((book) => (
            <Card className="max-w-xs" key={book._id}>
              <Link to={`/book/${book._id}`}>
                <img src={book.imageURL} className="h-[340px] w-[300px]" />
                <h5 className="text-lg md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {book.title}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400 line-clamp-4">
                  {book.description}
                </p>
              </Link>

              <button
                onClick={makePayment}
                className="bg-primary text-white font-semibold text-center py-2 rounded"
              >
                Buy Now
              </button>
              <Link
                target="_blank"
                to={`mailto:${email}.com?subject=Request for a copy of ${book.title}&body=Hello, I would like to request for a copy of ${book.title}. Thank you.`}
                className="bg-white text-primary hover:bg-primary hover:text-white border border-solid border-primary font-semibold text-center py-2 rounded mt-1"
              >
                Request for a copy
              </Link>
            </Card>
          ))}
        </div>
        <ReactPaginate
          previousLabel={""}
          nextLabel={""}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={handlePageChange}
          pageClassName="block border hover:bg-primary/80 hover:text-white border-primary rounded-lg p-3"
          containerClassName="flex justify-center items-center font-medium mt-12 gap-5"
          activeClassName="bg-primary border border-primary text-white"
        />
      </div>
      <div className="bg-primary text-white py-4">
        <p className="text-center">@Rasheed Fatai - University of Sunderland</p>
      </div>
    </>
  );
}

export default Shop;
