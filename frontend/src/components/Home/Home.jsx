import React from "react";
import homebanner from "../../images/mainbannerdesktop.webp";
import mobilemainbanner from "../../images/mainbannermob2.webp";
import Features from "../Features/Features";
import Certifications from "../Certifications/Certification";
import ReviewCarousel from "../Reviews/Reviews";
import FeaturedProducts from "../FeatureProducts/FeatureProducts";
import CookingHome from "../CookingHome/CokingHome";
import DesiGheehome from "../DesiGheeHome/Desigheehome";
import HerbalTeaAtHome from "../HerbalTea/HerbalTeahome";
import Honeyhome from "../Honey/Honeyhome";
import Massagehome from "../massage/Massagehome";
function Home() {
  return (
    <>
      <div className="relative w-full overflow-hidden">
        {/* Desktop Banner */}
        <img
          src={homebanner}
          alt="Hero Banner"
          className="hidden lg:block w-full h-full object-cover"
        />

        {/* Mobile Banner */}
        <div className="h-auto mt-2 w-full overflow-hidden lg:hidden">
          <img
            src={mobilemainbanner}
            alt="Hero Banner"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h2 className="text-white uppercase py-16 text-xl lg:text-4xl font-bold text-center px-4">
            Pakistan's Best Organic Store
          </h2>
        </div>
      </div>

      <Features />
      <FeaturedProducts />
      <Certifications />
      <CookingHome />
      <Honeyhome />
      <Massagehome />
      <HerbalTeaAtHome />
      <DesiGheehome />

      
      <ReviewCarousel />
    </>
  );
}

export default Home;
