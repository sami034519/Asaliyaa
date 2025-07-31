import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import card from "../../images/card-2-150x150.png";
import delivery from "../../images/delivery-150x150.png";
import honey from "../../images/honey2-150x150.png";
import support from "../../images/support-150x150.png";

function Features() {
  const features = [
    {
      img: card,
      mainheading: "SECURE PAYMENT",
      text: "COD / Direct Bank Transfer / CC",
    },
    {
      img: delivery,
      mainheading: "FREE SHIPPING",
      text: "Order Rs. 3000 and above",
    },
    {
      img: honey,
      mainheading: "MADE WITH KHALIS",
      text: "No Additives or Preservatives",
    },
    {
      img: support,
      mainheading: "CUSTOMER SUPPORT",
      text: "Professional customer service",
    },
  ];

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  return (
    <div className="w-full flex justify-center">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-2 px-10 rounded-lg py-2 gap-y-5 lg:gap-y-0 lg:gap-x-28">
        {features.map((pics, index) => {
          return (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 200} // Delay each feature for a staggered animation
            >
              <div className="flex flex-col justify-items-center items-center text-center">
                <img className="max-w-[60px]" src={pics.img} alt={pics.mainheading} />
                <h1 className="font-bold text-black text-sm mt-3 mb-1">
                  {pics.mainheading}
                </h1>
                <p className="text-sm font-semibold text-gray-400">{pics.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Features;
