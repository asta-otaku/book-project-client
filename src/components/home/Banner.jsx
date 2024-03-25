import BannerCard from "./BannerCard";
import React from "react";
import cover from "./cover.jpg";

function Banner({ setSearch }) {
  return (
    <div
      style={{ backgroundImage: `url(${cover})` }}
      className="bg-cover bg-center bg-no-repeat w-full"
    >
      <div className="bg-[#150100c2] h-full text-white px-4 py-32">
        <div className="flex flex-col md:flex-row justify-between gap-20 items-center max-w-6xl mx-auto w-full">
          <div className="flex w-full flex-col md:flex-row justify-between items-center gap-12">
            <div className="md:w-1/2 h-full space-y-8">
              <h2 className="text-3xl lg:text-5xl lg:leading-snug font-bold">
                Buy and Sell Your Books{" "}
                <span className="text-blue-700 font-bold">
                  for the Best Prices
                </span>
              </h2>
              <p className="md:w-4/5 text-justify">
                Welcome to our cozy book nook, where stories come alive and
                imaginations flourish. Explore our curated collection spanning
                genres from timeless classics to contemporary bestsellers, and
                let our friendly staff guide you on your literary journey.
              </p>
              <div>
                <input
                  type="search"
                  name="search"
                  id="search"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search a book"
                  className="p-2 rounded-s-lg outline-none border-none text-primary"
                />
                <button
                  onClick={() =>
                    window.scrollTo({
                      top: 800,
                      behavior: "smooth",
                    })
                  }
                  className="bg-blue-700 px-6 py-2 text-white font-medium rounded-e-lg hover:bg-black transition-all ease-in duration-200"
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <BannerCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
