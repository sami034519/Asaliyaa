import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import logo from "../../images/asaliyalogomremovebg.png";
import group from "../../images/Group-35.svg";

const navLinks = [
  { name: "Honey", path: "/honey" },
  { name: "Saffron", path: "/saffron" },
  { name: "Massage Oils", path: "/massage-oils" },
  { name: "Cooking Oils", path: "/cooking-oils" },
  { name: "Slagit", path: "/slagit" },
  { name: "Herbal Tea", path: "/herbal-tea" },
  { name: "Desi Ghee", path: "/desi-ghee" },
  { name: "Achhar", path: "/achhar" },
];

const Footer = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  return (
    <footer className="text-white border-t bg-secondary border-gray-200">
      <div className="px-6 md:px-16 lg:px-24 py-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-10">
          
          {/* Left Section (Logo & Mission) */}
          <div className="lg:w-1/3 space-y-4" data-aos="fade-right">
            <NavLink to="/">
              <img src={logo} alt="Logo" className="h-20 w-auto" />
            </NavLink>
            <p className="text-sm leading-relaxed">
              Where our mission is to provide Healthy, Khalis, Unadulterated and
              Real food to your table. We grow and source herbal, natural & organic
              food products because at <span className="font-semibold">Asaliyaa</span>,
              we care for your and your family's well-being.
            </p>
            <img
              src={group}
              alt="Pakistan Standards"
              className="h-14 w-auto mt-2"
            />
          </div>

          {/* Right Section (Links & Contact) */}
          <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-8">
            
            {/* Categories */}
            <div data-aos="fade-up" data-aos-delay="100">
              <h3 className="text-lg font-bold mb-4">CATEGORIES</h3>
              <ul className="space-y-2">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `transition-colors duration-200 ${
                          isActive
                            ? "text-green-600 font-semibold"
                            : "text-white hover:text-green-600"
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* About Us */}
            <div data-aos="fade-up" data-aos-delay="200">
              <h3 className="text-lg font-bold mb-4">ABOUT US</h3>
              <ul className="space-y-2">
                <li>
                  <NavLink to="/company" className="hover:text-green-600">
                    The Company
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/refund-policy" className="hover:text-green-600">
                    Refund Policy
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/privacy-policy" className="hover:text-green-600">
                    Privacy Policy
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/faqs" className="hover:text-green-600">
                    FAQS
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/corporate-orders" className="hover:text-green-600">
                    Corporate Orders
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Follow Us */}
            <div data-aos="fade-up" data-aos-delay="300">
              <h3 className="text-lg font-bold mb-4">FOLLOW US</h3>
              <div className="flex flex-col gap-y-3 justify-items-center items-start space-x-4 mb-4">
                <a
                  href="https://www.facebook.com/yourpage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 flex pl-3 gap-x-2 justify-center items-center text-lg hover:scale-110 transition"
                >
                  <FaFacebookF />
                  <span className="text-sm font-semibold">FACEBOOK</span>
                </a>
                <a
                  href="https://www.instagram.com/yourpage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 text-lg flex gap-x-2 justify-center items-center hover:scale-110 transition"
                >
                  <FaInstagram />
                  <span className="text-sm font-semibold">INSAGARM</span>
                </a>
                <a
                  href="https://www.youtube.com/yourchannel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 text-lg flex gap-x-2 justify-center items-center hover:scale-110 transition"
                >
                  <FaYoutube />
                  <span className="text-sm font-semibold">YOUTUBE</span>
                </a>
              </div>
            </div>

            {/* Contact Us */}
            <div data-aos="fade-up" data-aos-delay="400">
              <h3 className="text-lg font-bold mb-4">CONTACT US</h3>
              <p className="flex items-center space-x-2 mb-2">
                <FaPhone className="text-green-600" /> <span>+92 301 9700050</span>
              </p>
              <p className="flex items-center space-x-2">
                <FaEnvelope className="text-green-600" /> <span>cs@Asaliyaa.pk</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="text-center text-sm text-white border-t pt-4 pb-4">
        Copyright © ASALIYAA 2025
      </div>
    </footer>
  );
};

export default Footer;
