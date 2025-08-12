import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/cartSlice';
import achaarbanmob from '../../images/achaarbannermobile.png';
import achaarbandesktop from '../../images/achaarbannerdesktop.png';
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function Acharr() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const category = "Achhar";

  // ✅ Preload banner images so they show instantly on route change
  useEffect(() => {
    [achaarbanmob, achaarbandesktop].forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    fetch(`https://asaliyaa.minnaminnie.com/get_products_by_category.php?category=${category}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          setProducts(data.data);
        }
      })
      .catch((err) => console.error("Failed to fetch:", err));
  }, []);

  const handleAddToCart = (product) => {
    const selectedSize = 'Small';
    let price;

    if (selectedSize === 'Small') price = product.price_small;
    else if (selectedSize === 'Medium') price = product.price_medium;
    else price = product.price_large;

    dispatch(addToCart({
      id: product.id,
      title: product.title,
      quantity: 1,
      selectedSize,
      image: product.image_small,
      price,
      price_small: product.price_small,
      price_medium: product.price_medium,
      price_large: product.price_large,
    }));
  };

  return (
    <>
      {/* Banner - now using <picture> so mobile/desktop only load what's needed */}
      <div className="w-full mt-10 overflow-hidden">
        <picture>
          <source srcSet={achaarbanmob} media="(max-width: 768px)" />
          <source srcSet={achaarbandesktop} media="(min-width: 769px)" />
          <img
            src={achaarbandesktop}
            alt="Achhar Banner"
            className="w-full h-full object-cover"
          />
        </picture>
      </div>

      {/* Products Grid */}
      <div className="py-10 px-4 sm:px-6 mb-10 lg:px-20">
        <h1 className="text-2xl lg:ml-0 ml-2 mb-4 font-bold text-gray-800 flex items-center gap-3" data-aos="fade-up">
          ACHHAR
          <FaArrowRight className="text-secondary text-2xl" />
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden relative"
              data-aos="zoom-in"
            >
              {/* Product Link */}
              <Link to={`/product/${product.id}`}>
                <div className="relative p-2 bg-gray-100 h-48 sm:h-56 md:h-64 overflow-hidden">
                  {/* ✅ Lazy load with blur */}
                  <LazyLoadImage
                    src={product.image_medium}
                    alt={product.title}
                    effect="blur"
                    className="w-full h-full object-contain hover:opacity-0 transition duration-300"
                  />
                  <LazyLoadImage
                    src={product.image_medium}
                    alt={product.title}
                    effect="blur"
                    className="w-full h-full object-cover absolute top-0 left-0 opacity-0 hover:opacity-100 transition duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-md font-semibold text-black">{product.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Rs. {product.price_small} | {product.price_medium} | {product.price_large}
                  </p>
                </div>
              </Link>

              {/* Add to Cart */}
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
      </div>
    </>
  );
}

export default Acharr;
