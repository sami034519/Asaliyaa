import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import FDA from '../../images/FDA_1066x_cda063d7-fb86-4b88-b288-509803b2bd72.jpeg'
import halal from  "../../images/Hala_food_1066x_dd296501-e47c-4c89-947a-6d8dcb2efbd3.jpeg"
import pfa from "../../images/Punjab_Food_Authority_logo.png"
import PSQCA from "../../images/PSQC.png"
import iso from "../../images/ISO_1066x_3dc3f62a-9ca0-4db0-9c01-0d20748ac23a.jpeg"
import fs from '../../images/foodsafety.jpg'
import {FaArrowRight } from "react-icons/fa";

const certifications = [
  {
    img: FDA,
    text: "Our products are FDA USA certified, ensuring the highest standards of quality and safety",
    title: "FDA USA",
  },
  {
    img:halal,
    text: "Our products are now Halal certified, ensuring the highest standards of Halal compliance",
    title: "HALAL",
  },
  {
    img: pfa,
    text: "Our products are PFA certified, adhering to the Punjab Food Authority’s high standards.",
    title: "PFA",
  },
  {
    img: PSQCA,
    text: "Our products are PSQCA certified, meeting Pakistan’s stringent quality and safety standards",
    title: "PSQCA",
  },
  {
    img: iso,
    text: "Our products are ISO certified, validating our commitment to international quality standards",
    title: "ISO",
  },
   {
    img: fs,
    text: "Our products are FA PK certified, ensuring the highest standards of quality and safety",
    title: "FS ",
  },
];

const Certifications = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  return (
    <section className="bg-[#fdfdfd] py-10 px-6 md:px-16 lg:px-24">
      {/* Heading */}
      <div className="text-center md:text-left mb-8" data-aos="fade-up">
         <h1 className="text-2xl mb-4 font-bold text-gray-800 flex items-center gap-3">
             OUR CERTIFICATIONS
             <FaArrowRight className="text-secondary text-2xl" /></h1>
        <p className="text-gray-500 max-w-xl">
          We are proud to hold industry-leading certifications that demonstrate
          our commitment to quality, safety, and excellence.
        </p>
      </div>

      {/* Certification Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 gap-6">
        {certifications.map((cert, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg pb-2 max-w-[200px]  text-center hover:shadow-lg transition-shadow duration-300"
            data-aos="fade-up"
            data-aos-delay={index * 200}
          >
            <div className="flex justify-center mb-3">
              <img
                src={cert.img}
                alt={cert.title}
                className=" w-full object-cover"
              />
            </div>
            <p className="text-sm text-gray-600 mb-2">{cert.text}</p>
            <h4 className="font-semibold text-black">{cert.title}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
