import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/cartSlice";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom"; // if using detail page navigation

function OrganicFlourHome() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // for navigation to detail page
  const category = "Sugar Free Flour";

  useEffect(() => {
    AOS.init({ duration: 1000 });

    fetch(`https://asaliyaa.minnaminnie.com/get_products_by_category.php?category=${category}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setProducts(data.data);
        }
      })
      .catch((err) => console.error("Failed to fetch:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        image: product.image_medium,
        price: product.price_small, // defaulting to small size
        quantity: 1,
        selectedSize: "small",
      })
    );
  };

  const goToDetail = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-20 mt-8 mb-10">
      <h1
        className="text-2xl lg:ml-0 ml-2 mb-4 font-bold text-gray-800 flex items-center gap-3"
        data-aos="fade-up"
      >
        ORGANIC FLOUR
        <FaArrowRight className="text-secondary text-2xl" />
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading products...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
              data-aos="zoom-in"
            >
              <div
                className="relative p-2 bg-gray-100 h-48 sm:h-56 md:h-64 overflow-hidden cursor-pointer"
                onClick={() => goToDetail(product.id)}
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
  );
}

export default OrganicFlourHome;
