import React, { useState } from "react";
import {
  Button,
  Label,
  Select,
  TextInput,
  Textarea,
  Spinner,
} from "flowbite-react";
import axios from "axios";
import { CONSTANT } from "../../util";
import toast, { Toaster } from "react-hot-toast";

function UploadBook() {
  const bookCategories = [
    "Fiction",
    "Non-Fiction",
    "Science Fiction",
    "Fantasy",
    "Mystery",
    "Horror",
    "Biography",
    "Autobiography",
    "Self-Help",
    "Health",
    "Romance",
    "Cookbooks",
    "History",
    "Travel",
    "Children's",
    "Young Adult",
    "Religion",
    "Science",
    "Art",
    "Music",
    "Photography",
    "Poetry",
    "Comics",
    "Graphic Novels",
    "Crafts",
    "Hobbies",
    "Gardening",
    "Business",
    "Investing",
    "Management",
    "Leadership",
    "Economics",
    "Finance",
    "Marketing",
    "Sales",
    "Personal Finance",
    "Real Estate",
    "Computers",
    "Technology",
    "Programming",
    "Web Design",
    "Mobile",
    "Software",
    "Engineering",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Astronomy",
    "Psychology",
    "Philosophy",
    "Sociology",
    "Political Science",
    "Government",
    "Law",
    "Education",
    "Teaching",
    "Academic",
    "Reference",
    "Dictionaries",
    "Thesauruses",
    "Encyclopedias",
    "Writing",
    "Essays",
    "Children's Books",
    "Miscellaneous",
  ];

  const [loading, setLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(
    bookCategories[0]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const form = e.target;
    const title = form.title.value;
    const authorName = form.authorName.value;
    const imageURL = form.imageURL.value;
    const category = form.category.value;
    const ISBN = form.ISBN.value;
    const pdfURL = form.pdfURL.value;
    const description = form.description.value;

    const bookData = {
      title,
      authorName,
      imageURL,
      category,
      ISBN,
      pdfURL,
      description,
    };

    setLoading(true);
    try {
      const res = await axios.post(
        `${CONSTANT.BASE_URL}/upload-book`,
        bookData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success("Book uploaded successfully");
        form.reset();
      } else {
        toast.error("Failed to upload book");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="px-4 my-12">
      <Toaster />
      <h2 className="mb-8 text-3xl font-bold">Upload A book</h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col flex-wrap gap-3 lg:w-[800px] mx-auto"
      >
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="title" value="Book Title" />
            </div>
            <TextInput
              id="title"
              name="title"
              type="text"
              placeholder="Book Name"
              required
            />
          </div>
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="authorName" value="Author Name" />
            </div>
            <TextInput
              id="authorName"
              name="authorName"
              type="text"
              placeholder="Author Name"
              required
            />
          </div>
        </div>
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="imageURL" value="Book Image URL" />
            </div>
            <TextInput
              id="imageURL"
              name="imageURL"
              type="text"
              placeholder="Book Image URL"
              required
            />
          </div>
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="category" value="Category" />
            </div>
            <Select
              id="category"
              name="category"
              value={selectedCategories}
              onChange={(e) => setSelectedCategories(e.target.value)}
              className="w-full rounded"
            >
              {bookCategories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="ISBN" value="ISBN Number" />
            </div>
            <TextInput
              id="ISBN"
              name="ISBN"
              type="text"
              placeholder="ISBN Number"
              required
            />
          </div>
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="pdfURL" value="Book Link" />
            </div>
            <TextInput
              id="pdfURL"
              name="pdfURL"
              type="text"
              placeholder="Book Link"
              required
            />
          </div>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="description" value="Book Description" />
          </div>
          <Textarea
            rows={6}
            id="description"
            name="description"
            type="text"
            placeholder="Book Description"
            className="w-full"
            required
          />
        </div>

        <Button disabled={loading} type="submit" className="mt-12">
          {loading ? <Spinner /> : "Upload Book"}
        </Button>
      </form>
    </div>
  );
}

export default UploadBook;
