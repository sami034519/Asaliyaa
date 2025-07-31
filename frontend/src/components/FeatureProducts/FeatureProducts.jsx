import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/cartSlice';
import { FaArrowRight } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';

const ProductSlider = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    AOS.init({ duration: 800, once: false }); // initialize AOS
  }, []);

  useEffect(() => {
    fetch('https://asaliyaa.minnaminnie.com/get_products.php')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          setProducts(data.data);
        }
      });
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="w-full py-10 px-10 lg:mt-20 md:px-10 lg:px-20">
      <h1
        className="text-2xl lg:ml-0 ml-2 mb-4 font-bold text-gray-800 flex items-center gap-3"
        data-aos="fade-up"
      >
        FEATURED PRODUCTS
        <FaArrowRight className="text-secondary text-2xl" />
      </h1>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        breakpoints={{
          320: { slidesPerView: 2 },
          768: { slidesPerView: 4 },
        }}
        className="pb-10"
      >
        {products.map((product, index) => (
          <SwiperSlide key={product.id}>
            <div
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <div className="relative p-2 bg-slate-50 cursor-pointer h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
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
              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-center text-md font-semibold text-black">{product.title}</h3>
                <p className="text-sm text-gray-600 text-center">
                  Rs. {product.price_small} | {product.price_medium} | {product.price_large}
                </p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-auto bg-primary hover:bg-secondary text-white py-2 text-sm transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
