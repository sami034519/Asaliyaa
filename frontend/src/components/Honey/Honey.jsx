import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/cartSlice";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

import mainbannerdek from "../../images/honeyBanner.png";
import mainbannermob from "../../images/honeybannermob.webp";

function Honey() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const category = "Honey";

  useEffect(() => {
    AOS.init({ duration: 1000 });

    fetch(`https://asaliyaa.minnaminnie.com/get_products_by_category.php?category=${category}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setProducts(data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch Honey products:", err);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
      dispatch(
        addToCart({
          ...product,
          quantity: 1,
          image: product.image_medium,
          price: product.price_small, // Default to small
          selectedSize: "small",
        })
      );
    };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <>
      {/* Banner */}
      <div className="w-full mt-4 overflow-hidden">
        <img
          src={mainbannerdek}
          alt="Hero Banner"
          className="hidden lg:block w-full h-full object-cover"
        />
        <div className="h-auto mt-2 w-full overflow-hidden">
          <img
            src={mainbannermob}
            alt="Hero Banner"
            className="block lg:hidden w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Heading */}
      <div className="px-4 sm:px-6 lg:px-20 mt-8 mb-10">
        <h1
          className="text-2xl lg:ml-0 ml-2 mb-4 font-bold text-gray-800 flex items-center gap-3"
          data-aos="fade-up"
        >
          HONEY
          <FaArrowRight className="text-secondary text-2xl" />
        </h1>

        {/* Loading Spinner */}
        {loading ? (
          <p className="text-center text-gray-500 text-lg mt-10">Loading products...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden cursor-pointer"
                data-aos="zoom-in"
              >
                <div
                  className="relative p-2 bg-gray-100 h-48 sm:h-56 md:h-64 overflow-hidden"
                  onClick={() => handleProductClick(product.id)}
                >
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
        )}
      </div>
    </>
  );
}

export default Honey;
