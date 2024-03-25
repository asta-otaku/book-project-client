import { Link, useLoaderData } from "react-router-dom";
import Navbar from "../Navbar";

function SingleBook() {
  const { imageURL, title, authorName, category, description, pdfURL, ISBN } =
    useLoaderData();
  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-32">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4">
            <img
              src={imageURL}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:w-3/4 md:pl-8 mt-8 md:mt-0 flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-primary">{title}</h1>
            <p className="text-lg text-primary/50">{authorName}</p>
            <p className="text-lg text-primary/50">{category}</p>
            <p className="text-lg text-primary/50">{ISBN}</p>
            <p className="text-lg text-primary/50 text-justify">
              {description}
            </p>
            <div className="flex gap-4 items-center">
              <Link
                to={pdfURL}
                target="_blank"
                rel="noreferrer"
                className="text-lg text-primary/50"
              >
                Read Book
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary text-white py-4">
        <p className="text-center">@Rasheed Fatai - University of Sunderland</p>
      </div>
    </div>
  );
}

export default SingleBook;
