import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/cartSlice';
import { FaArrowRight } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';

const ProductSlider = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  useEffect(() => {
    fetch('https://asaliyaa.minnaminnie.com/get_products.php')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          setProducts(data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    const selectedSize = "Small"; // Default size
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
    <div className="w-full py-10 px-4 sm:px-6 lg:px-20 relative">
      <h1
        className="text-2xl mb-6 font-bold text-gray-800 flex items-center gap-3"
        data-aos="fade-up"
      >
        FEATURED PRODUCTS
        <FaArrowRight className="text-secondary text-2xl" />
      </h1>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : (
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          breakpoints={{
            320: { slidesPerView: 2 },
            768: { slidesPerView: 4 },
          }}
          onBeforeInit={(swiper) => {
            if (typeof swiper.params.navigation !== 'boolean') {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
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
                <div
                  className="relative p-2 bg-slate-50 cursor-pointer h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden"
                  onClick={() => handleProductClick(product.id)}
                >
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

          {/* Custom Prev Arrow */}
          <div
            ref={prevRef}
            className="custom-prev absolute top-1/2 -left-0 transform -translate-y-1/2 z-50 cursor-pointer"
          >
            <div className="w-10 h-10 bg-green-700 hover:bg-secondary rounded-full flex items-center justify-center shadow-md transition">
              <FaArrowRight className="text-white text-sm rotate-180" />
            </div>
          </div>

          {/* Custom Next Arrow */}
          <div
            ref={nextRef}
            className="custom-next absolute top-1/2 -right-0 transform -translate-y-1/2 z-50 cursor-pointer"
          >
            <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center shadow-md hover:bg-green-800 transition">
              <FaArrowRight className="text-white text-sm" />
            </div>
          </div>
        </Swiper>
      )}
    </div>
  );
};

export default ProductSlider;
