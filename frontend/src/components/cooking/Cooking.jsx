import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/cartSlice";
import cookdesktop from "../../images/cookingoilBANNERdesktop.png";
import cookmob from "../../images/cookBANNERmob.png";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function Cooking() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const category = "Cooking Oils";

  useEffect(() => {
    AOS.init({ duration: 800 });

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
    let price;

    if (selectedSize === "Small") price = product.price_small;
    else if (selectedSize === "Medium") price = product.price_medium;
    else price = product.price_large;

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

  return (
    <>
      {/* Banner */}
      <div className="w-full overflow-hidden">
        <img
          src={cookdesktop}
          alt="Hero Banner"
          className="hidden lg:block w-full h-full object-cover"
        />
        <div className="h-auto mt-10 w-full overflow-hidden">
          <img
            src={cookmob}
            alt="Hero Banner"
            className="block lg:hidden w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Products Section */}
      <div className="py-10 px-4 sm:px-6 mb-10 lg:px-20">
        <h1
          className="text-2xl lg:ml-0 ml-2 mb-4 font-bold text-gray-800 flex items-center gap-3"
          data-aos="zoom-in"
        >
          COOKING OILS
          <FaArrowRight className="text-secondary text-2xl" />
        </h1>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                {/* Image & title wrapped in Link */}
                <Link to={`/product/${product.id}`}>
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
                    <h3 className="text-md font-semibold text-black">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Rs. {product.price_small} | {product.price_medium} | {product.price_large}
                    </p>
                  </div>
                </Link>

                {/* Add to Cart button */}
                <div className="p-4 pt-0 text-center">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-2 bg-primary hover:bg-secondary text-white px-4 py-2 text-sm rounded transition"
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

export default Cooking;
