import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

function BookCards({ books, headline }) {
  return (
    <div className="bg-[#171717]/10">
      <div className="py-6 md:py-12 px-4 max-w-7xl mx-auto">
        <h2 className="font-bold text-3xl lg:text-5xl text-center my-5 text-primary">
          {headline}
        </h2>

        <div className="mt-4 md:mt-12">
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 50,
              },
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper h-full w-full"
          >
            {books.length > 0 ? (
              books.map((book) => (
                <SwiperSlide key={book._id} className="hover:scale-[101%]">
                  <Link to={`/book/${book._id}`}>
                    <div>
                      <img
                        src={book.imageURL}
                        alt=""
                        className="md:w-[300px] md:h-[340px]"
                      />
                    </div>
                    <div className="text-sm text-primary font-medium mb-12">
                      <h3 className="mb-2">{book.title}</h3>
                      <div className="flex flex-wrap justify-between gap-2">
                        <p>{book.authorName}</p>
                        <p>ISBN: {book.ISBN}</p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))
            ) : (
              <p className="text-3xl text-center text-primary font-bold">
                Not in stock
              </p>
            )}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default BookCards;
