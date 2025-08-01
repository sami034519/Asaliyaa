import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/cartSlice";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function HerbalTeaAtHome() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const category = "Herbal Tea";

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
        console.error("Failed to fetch:", err);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    const selectedSize = "Small";
    const price = product.price_small;

    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        quantity: 1,
        selectedSize,
        image: product.image_small,
        price,
        price_small: product.price_small,
        price_medium: product.price_medium,
        price_large: product.price_large,
      })
    );
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-20 mt-10 mb-10">
      <h1
        className="text-2xl lg:ml-0 ml-2 mb-6 font-bold text-gray-800 flex items-center gap-3"
        data-aos="fade-up"
      >
        HERBAL TEA
        <FaArrowRight className="text-secondary text-2xl" />
      </h1>

      {loading ? (
        <div className="text-center py-10 text-gray-600 text-lg">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-10 text-gray-600 text-lg">No products found.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <div
                className="relative p-2 bg-gray-100 h-48 sm:h-56 md:h-64 overflow-hidden cursor-pointer"
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
  );
}

export default HerbalTeaAtHome;
