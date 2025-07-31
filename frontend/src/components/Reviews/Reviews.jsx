import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const reviews = [
  {
    title: "Pure Honey",
    content:
      "ASALIYAA Honey is 100% natural and unadulterated. Its golden color and smooth texture are simply delightful. It’s perfect with warm water or as a sweetener for tea.",
    author: "Ayesha Khan",
    rating: 5,
  },
  {
    title: "Saffron",
    content:
      "The saffron from ASALIYAA is aromatic and rich in color. It elevates every dish with a luxurious touch. A must-have for cooking and health benefits.",
    author: "Mohammad Ali",
    rating: 5,
  },
  {
    title: "Massage Oils",
    content:
      "ASALIYAA Massage Oils are perfect for relaxation. The natural blend is soothing and leaves the skin feeling nourished.",
    author: "Nadia Hussain",
    rating: 4,
  },
  {
    title: "Cooking Oils",
    content:
      "The Cooking Oils from ASALIYAA have a premium quality. I love how they bring out the natural flavors in my recipes while being healthy.",
    author: "Sameer Ahmed",
    rating: 5,
  },
  {
    title: "Slagit",
    content:
      "Slagit is one of the best herbal products I’ve tried. It’s completely natural and highly effective for boosting energy.",
    author: "Sara Noor",
    rating: 4,
  },
  {
    title: "Herbal Tea",
    content:
      "ASALIYAA Herbal Tea is refreshing and packed with natural goodness. The aroma itself is enough to calm my senses.",
    author: "Hamza Iqbal",
    rating: 5,
  },
  {
    title: "Desi Ghee",
    content:
      "The Desi Ghee by ASALIYAA tastes like homemade ghee. It’s pure, aromatic, and adds an amazing flavor to food.",
    author: "Bushra Fatima",
    rating: 5,
  },
  {
    title: "Achhar",
    content:
      "ASALIYAA Achhar has the perfect balance of spices and tanginess. It reminds me of traditional homemade recipes.",
    author: "Rashid Mehmood",
    rating: 5,
  },
];

const ReviewCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(4); // Default: Desktop view

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: false });

    updateItemsPerSlide(); // Set initial items per slide
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  // Dynamically set how many items to show per slide
  const updateItemsPerSlide = () => {
    if (window.innerWidth < 640) {
      setItemsPerSlide(1); // Mobile: 1 card
    } else if (window.innerWidth < 1024) {
      setItemsPerSlide(2); // Tablet: 2 cards
    } else {
      setItemsPerSlide(4); // Desktop: 4 cards
    }
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? Math.max(reviews.length - itemsPerSlide, 0)
        : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerSlide >= reviews.length
        ? 0
        : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full bg-yellow-50 py-10" data-aos="fade-in">
      <div className="max-w-7xl mx-auto overflow-hidden relative">
        {/* Heading */}
        <h1
          className="text-2xl lg:ml-0 ml-2 mb-4 font-bold text-gray-800 flex items-center gap-3"
          data-aos="fade-up"
        >
          WHAT OUR CLIENTS SAY
          <FaArrowRight className="text-secondary text-2xl" />
        </h1>

        {/* Cards Container */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerSlide)}%)`,
          }}
        >
          {reviews.map((review, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 lg:w-1/4 flex-shrink-0 px-4"
              data-aos="zoom-in"
              data-aos-delay={index * 100} // Stagger effect
            >
              <div className="bg-white rounded-lg shadow-md p-6 h-full text-center">
                {/* Stars */}
                <div className="flex justify-center mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500 text-xl" />
                  ))}
                </div>
                {/* Title */}
                <h3 className="text-lg font-bold mb-3">{review.title}</h3>
                {/* Content */}
                <p className="text-gray-600 text-sm mb-4">{review.content}</p>
                {/* Author */}
                <p className="font-semibold text-black">- {review.author}</p>
                <p className="text-xs text-gray-500">ASALIYAA Customer</p>
              </div>
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-2 text-white md:left-4 top-1/2 transform -translate-y-1/2 bg-primary p-2 rounded-full shadow hover:bg-secondary"
          data-aos="fade-right"
        >
          <FaArrowLeft />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-2 text-white md:right-4 top-1/2 transform -translate-y-1/2 bg-primary p-2 rounded-full shadow hover:bg-secondary"
          data-aos="fade-left"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default ReviewCarousel;
