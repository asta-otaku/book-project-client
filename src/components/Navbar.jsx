import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBlog } from "react-icons/fa";
import { FaXmark, FaBarsStaggered } from "react-icons/fa6";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 100);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/shop" },
    { name: "Sell Your Books", link: "/admin/dashboard" },
  ];

  return (
    <header className="w-full bg-transparent fixed left-0 right-0 transition-all ease-in duration-300">
      <nav
        className={`py-4 px-2 bg-primary text-white ${
          isSticky ? "sticky top-0 left-0 right-0" : ""
        }`}
      >
        <div className="flex justify-between items-center text-base gap-8 max-w-7xl mx-auto">
          <Link
            to="/"
            className="text-2xl font-bold text-white flex items-center gap-2"
          >
            <FaBlog className="inline-block" />
            Books
          </Link>

          <ul className="hidden md:flex space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.link}
                  className="block text-base uppercase cursor-pointer hover:text-blue-700"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-primary focus:outline-none"
            >
              {isMenuOpen ? (
                <FaXmark color="white" className="w-5 h-5 text-primary" />
              ) : (
                <FaBarsStaggered
                  color="white"
                  className="w-5 h-5 text-primary"
                />
              )}
            </button>
          </div>
        </div>

        <div
          className={`space-y-4 px-4 mt-16 py-7 bg-primary ${
            isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"
          }`}
        >
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="block text-base text-white uppercase cursor-pointer"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
