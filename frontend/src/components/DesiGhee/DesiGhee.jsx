import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/cartSlice';
import desibannermob from '../../images/desigheebannermobile.png';
import desibannerdexk from '../../images/desigheebannerdsktop1.png';
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function DesiGhee() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const category = "Desi Ghee";

  useEffect(() => {
    fetch(`https://asaliyaa.minnaminnie.com/get_products_by_category.php?category=${category}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
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
    dispatch(
      addToCart({
        ...product,
        price: product.price_small || 0,
        image: product.image_medium || product.image_small || "",
        quantity: 1,
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
      <div className="w-full mt-10 overflow-hidden">
        <img
          src={desibannerdexk}
          alt="Hero Banner"
          className="hidden lg:block w-full h-full object-cover"
        />
        <div className="h-auto mt-2 w-full overflow-hidden">
          <img
            src={desibannermob}
            alt="Hero Banner"
            className="block lg:hidden w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Products */}
      <div className="py-10 px-4 sm:px-6 mb-10 lg:px-20">
        <h1 className="text-2xl lg:ml-0 ml-2 mb-4 font-bold text-gray-800 flex items-center gap-3">
          DESI GHEE
          <FaArrowRight className="text-secondary text-2xl" />
        </h1>

        {loading ? (
          <p className="text-gray-600">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-600">No products available.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden cursor-pointer"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
                onClick={() => handleProductClick(product.id)}
              >
                <div className="relative p-2 bg-gray-100 h-48 sm:h-56 md:h-64 overflow-hidden">
                  <img
                    src={product.image_medium}
                    alt={product.title}
                    className="w-full h-full object-contain hover:opacity-0 transition duration-300"
                  />
                  <img
                    src={product.image_large}
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
                    onClick={(e) => {
                      e.stopPropagation(); // prevent triggering product detail route
                      handleAddToCart(product);
                    }}
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

export default DesiGhee;
