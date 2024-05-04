import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { CONSTANT } from "../../util";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function ManageBooks() {
  const [allBooks, setAllBooks] = useState([]);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`${CONSTANT.BASE_URL}/all-books`);
        setAllBooks(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooks();
  }, []);

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.ceil(allBooks.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  const displayedData = allBooks.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.delete(`${CONSTANT.BASE_URL}/delete-book/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        toast.success("Book deleted successfully");
        const newBooks = allBooks.filter((book) => book._id !== id);
        setAllBooks(newBooks);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (displayedData?.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-4">No results found.</div>
    );
  }

  return (
    <div className="px-4 my-12">
      <Toaster />
      <h1 className="mb-8 text-3xl font-bold">Manage Your Books</h1>

      <div className="overflow-x-auto">
        <Table className="w-full md:min-w-[calc(70vw)]">
          <Table.Head>
            <Table.HeadCell>No.</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Author</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>
              <span>Action</span>
            </Table.HeadCell>
          </Table.Head>
          {displayedData?.map((book, index) => (
            <Table.Body key={book._id} className="divide-y">
              <Table.Row>
                <Table.Cell>
                  {currentPage * itemsPerPage + index + 1}
                </Table.Cell>
                <Table.Cell>{book.title}</Table.Cell>
                <Table.Cell>{book.authorName}</Table.Cell>
                <Table.Cell>{book.category}</Table.Cell>
                <Table.Cell className="flex">
                  <Link
                    to={`/admin/dashboard/edit-books/${book._id}`}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="bg-red-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-sky-600"
                  >
                    Delete
                  </button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>

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
    </div>
  );
}

export default ManageBooks;
