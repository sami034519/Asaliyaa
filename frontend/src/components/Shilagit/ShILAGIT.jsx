import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/cartSlice";
import AOS from "aos";
import "aos/dist/aos.css";

import shilagitbannermob from "../../images/shilagitbannermobile.webp";
import shilagitbannerdesk from "../../images/shilagitbannerdesktop.webp";

function ShILAGIT() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const category = "Slagit"; // Ensure the backend category is exactly this spelling

  useEffect(() => {
    AOS.init({ duration: 1000 });
    fetch(`https://asaliyaa.minnaminnie.com/get_products_by_category.php?category=${category}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setProducts(data.data);
        }
      })
      .catch((err) => console.error("Error fetching shilagit products:", err));
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <>
      {/* Banners */}
      <div className="w-full overflow-hidden">
        <img
          src={shilagitbannerdesk}
          alt="Shilagit Banner Desktop"
          className="hidden lg:block w-full h-full object-cover"
        />
        <div className="h-auto mt-2 w-full overflow-hidden">
          <img
            src={shilagitbannermob}
            alt="Shilagit Banner Mobile"
            className="block lg:hidden w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Products Section */}
      <div className="px-4 sm:px-6 lg:px-20 mt-8">
        <h1
          className="text-2xl mb-4 font-bold text-gray-800 flex items-center gap-3"
          data-aos="fade-up"
        >
          SHILAGIT
          <FaArrowRight className="text-secondary text-2xl" />
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
              data-aos="fade-up"
            >
              <div className="relative p-2 bg-gray-100 h-48 sm:h-56 md:h-64 overflow-hidden">
                <img
                  src={product.image_medium}
                  alt={product.title}
                  className="w-full h-full object-contain hover:opacity-0 transition duration-300"
                />
                <img
                  src={product.image_medium}
                  alt={product.title}
                  className="w-full h-full object-cover absolute top-0 left-0 opacity-0 hover:opacity-100 transition duration-300"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-md font-semibold text-black">{product.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Rs. {product.price_small} | {product.price_medium} | {product.price_large}
                </p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-3 bg-primary hover:bg-secondary text-white px-4 py-2 text-sm rounded transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ShILAGIT;
