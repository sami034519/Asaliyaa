// Header.jsx
import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/asaliyalogom.png";
import { ShoppingCart, Search } from "lucide-react";
import { FaBars, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navScrollRef = useRef(null);

  const navLinks = [
    "Honey",
    "Saffron",
    "Massage Oils",
    "Cooking Oils",
    "Slagit",
    "Herbal Tea",
    "Desi Ghee",
    "Achhar",
  ];

  const products = [
    "🍯 Pure Honey – 100% Organic & Natural",
    "🌸 Premium Saffron – Rich Aroma & Taste",
    "💆 Massage Oils – Relax & Rejuvenate",
    "🥘 Cooking Oils – Heart-Healthy Blends",
    "🔥 Slagit – Herbal Energy Booster",
    "🍵 Herbal Tea – Detox & Refresh",
    "🧈 Desi Ghee – Farm Fresh & Pure",
    "🥒 Achhar – Homemade & Authentic",
    "🎉 Flat 10% OFF on First Purchase!",
    "🚚 Free Shipping on Orders Above Rs. 2000",
  ];

  const scrollNav = (direction) => {
    if (navScrollRef.current) {
      const scrollAmount = 120;
      navScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Top Info Bar */}
      <div className="w-full bg-secondary py-1 text-white overflow-hidden border-b fixed top-0 left-0 z-50">
        <div className="whitespace-nowrap animate-marquee flex">
          {products.concat(products).map((product, index) => (
            <span key={index} className="mx-8 text-lg font-medium">
              {product}
            </span>
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="w-full bg-white fixed top-8 md:top-[30px] left-0 shadow-md z-50">
        {/* Mobile Top Row */}
        <div className="flex md:hidden items-center justify-between px-4 py-3">
          <button onClick={() => setMenuOpen(true)} className="text-2xl">
            <FaBars />
          </button>
          <NavLink to="/">
            <img className="max-w-[100px]" src={logo} alt="Logo" />
          </NavLink>
          <div className="flex items-center gap-4">
            <Search className="text-gray-600" size={22} />
            <div className="relative">
              <ShoppingCart size={24} className="text-secondary" />
              <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full px-1.5">
                2
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Horizontal Nav Links with Arrows */}
        <div className="relative md:hidden flex items-center">
          {/* Left Arrow */}
          <button
            onClick={() => scrollNav("left")}
            className="absolute left-0 z-10 px-2 bg-white"
          >
            <FaChevronLeft className="text-secondary" />
          </button>

          {/* Scrollable Nav */}
          <div
            ref={navScrollRef}
            className="overflow-x-auto whitespace-nowrap flex gap-6 px-8 py-2 scrollbar-hide scroll-smooth w-full"
          >
            {navLinks.map((link, index) => (
              <NavLink
                key={index}
                to={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `inline-block pb-1 border-b-2 transition-all min-w-max ${
                    isActive
                      ? "border-secondary text-secondary font-semibold"
                      : "border-transparent text-gray-800 hover:text-secondary"
                  }`
                }
              >
                {link}
              </NavLink>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scrollNav("right")}
            className="absolute right-0 z-10 px-2 bg-white"
          >
            <FaChevronRight className="text-secondary" />
          </button>
        </div>

        {/* Desktop Top Row */}
        <div className="hidden md:flex items-center justify-around px-8 py-3">
          <NavLink to="/">
            <img className="max-w-[120px]" src={logo} alt="Logo" />
          </NavLink>
          <div className="relative flex w-[600px]">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full rounded-full border border-secondary bg-yellow-50 px-4 py-2 pr-10 focus:border-secondary focus:outline-none"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer" size={20} />
          </div>
          <div className="relative cursor-pointer">
            <ShoppingCart size={28} className="text-secondary" />
            <span className="absolute -top-2 -right-2 rounded-full bg-secondary px-2 text-xs text-white">
              2
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:flex justify-center w-full lg:mt-1">
          <div className="h-[1px] w-[90%] bg-gray-500" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-row justify-around items-center pt-2 pb-5 px-8">
          <ul className="flex flex-wrap items-center gap-6 uppercase font-medium text-base">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                  className={({ isActive }) =>
                    `pb-2 transition-colors ${
                      isActive
                        ? "border-b-2 border-secondary text-secondary"
                        : "hover:text-secondary hover:border-secondary"
                    }`
                  }
                >
                  {link}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="text-base text-primary font-medium">
            📞 +92 123 4567890 | ✉️ info@example.com
          </div>
        </nav>

        {/* Mobile Slide-in Menu */}
        {menuOpen && (
          <div className="fixed inset-0 bg-white z-50" onClick={() => setMenuOpen(false)}>
            <div
              className="fixed top-0 left-0 h-full w-64 bg-primary shadow-lg p-4 z-50 transition-transform duration-300 transform translate-x-0"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setMenuOpen(false)} className="text-xl text-red-600 bg-secondary rounded-full p-1 mb-4">
                <FaTimes />
              </button>
              <ul className="flex flex-col gap-4 font-medium text-white">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <NavLink
                      to={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `block transition-colors ${
                          isActive
                            ? "text-secondary bg-white px-2 py-1 rounded"
                            : "hover:text-secondary border-b-2"
                        }`
                      }
                    >
                      {link}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </header>

      {/* Padding */}
      <div className="pt-[170px] md:pt-[205px]" />
    </>
  );
};

export default Header;
