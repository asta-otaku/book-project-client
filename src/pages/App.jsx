import { useEffect, useState } from "react";
import Banner from "../components/home/Banner";
import Navbar from "../components/Navbar";
import BookCards from "../components/home/BookCards";
import { CONSTANT } from "../util";

function App() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetch(`${CONSTANT.BASE_URL}/all-books`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
      });
  }, []);
  return (
    <>
      <Navbar />
      <Banner setSearch={setSearch} />
      <BookCards
        books={books
          .filter(
            (book) =>
              book?.title?.toLowerCase().includes(search.toLowerCase()) ||
              book?.authorName?.toLowerCase().includes(search.toLowerCase()) ||
              book?.ISBN?.toLowerCase().includes(search.toLowerCase())
          )
          .slice(0, 8)}
        headline="Best Seller Books"
      />
      <div className="bg-primary text-white py-4">
        <p className="text-center">@Rasheed Fatai - University of Sunderland</p>
      </div>
    </>
  );
}

export default App;
