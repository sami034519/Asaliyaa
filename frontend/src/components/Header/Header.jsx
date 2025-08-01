import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/asaliyalogom.png";
import { ShoppingCart, Search } from "lucide-react";
import { FaBars, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import SearchBar from "../Search/Search";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../Redux/cartSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const navScrollRef = useRef(null);
  const [adminopen ,setadminopen]=useState(false);
  const [adminusername,setadminusername]=useState('');
  const [adminpass, setadminpass]=useState('');
const [error, setError] = useState("");
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart?.items || []);
  const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
 const cartTotal = cartItems.reduce((total, item) => {
  const price = Number(item.price) || 0;
  return total + price * item.quantity;
}, 0);

        console.log(cartItems);
  const navLinks = [
    "Honey", "Saffron", "Massage Oils", "Cooking Oils",
    "Slagit", "Herbal Tea", "Desi Ghee", "Achhar","Organic Flour","Organic Spices"
  ];

  const products = [
    "🍯 Pure Honey – 100% Organic & Natural",
    "🌸 Premium Saffron – Rich Aroma & Taste",
    "💆 Massage Oils – Relax & Rejuvenate",
    "🥘 Cooking Oils – Heart-Healthy Blends",
    "🔥 Slagit – Herbal Energy Booster",
    "🍵 Herbal Tea – Detox & Refresh",
    "🧈 Desi Ghee – Farm Fresh & Pure",
    "🥒 Achhar – Homemade & Authentic",
    "🎉 Flat 10% OFF on First Purchase!",
    "🚚 Free Shipping on Orders Above Rs. 2000",
  ];

  const scrollNav = (direction) => {
    if (navScrollRef.current) {
      const scrollAmount = 120;
      navScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };
const handleadmin=()=>{
setadminopen(true)
}
const handleadminclose=()=>{
  setadminopen(false)
}
const adminfixpass='123456'
const adminfixuser='usman'
const handleloginadmin = () => {
    if (adminusername === adminfixuser && adminpass === adminfixpass) {
      setError(""); // Clear any previous error
      navigate("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };
  return (
    <>
   {adminopen && (
  <div className="fixed inset-0 z-50 bg-white bg-opacity-50 w-full h-full overflow-auto">
    <div className="bg-primary  w-72 flex justify-center items-center py-10 absolute top-[30%] left-[40%]">
      <button className="absolute right-2 top-1 text-2xl hover:text-red-600 text-white"onClick={handleadminclose} >x</button>
      <div className="flex flex-col gap-y-5">

        <h1 className="font-bold text-white text-lg text-center">ADMIN LOGIN</h1>
      <input type="text" onChange={(e)=>{setadminusername(e.target.value)}} placeholder="username" className="p-2" />
      <input type="text" onChange={(e)=>{setadminpass(e.target.value)}} placeholder="password" className="p-2" />
      <button className="bg-white px-3 py-2 hover:bg-secondary" onClick={handleloginadmin}>Submit</button>
      <p><h1 className="text-white">{error}</h1></p>
      </div>
    </div>
  </div>
)}
      {/* Marquee Info Bar */}
      <div className="w-full bg-primary py-1 text-white overflow-hidden border-b fixed top-0 left-0 z-50">
        <div className="whitespace-nowrap animate-marquee flex">
          {products.concat(products).map((product, index) => (
            <span key={index} className="mx-8 text-lg font-medium">{product}</span>
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="w-full bg-white fixed top-8 md:top-[30px] left-0 shadow-md z-50">
        {/* Mobile Header */}
        <div className="flex md:hidden items-center justify-between px-4 py-3">
          <button onClick={() => setMenuOpen(true)} className="text-2xl"><FaBars /></button>
          <NavLink to="/"><img className="max-w-[100px]" src={logo} alt="Logo" /></NavLink>
          <div className="flex items-center gap-4">
            <Search size={22} onClick={() => setSearchOpen(true)} className="text-gray-600 cursor-pointer" />
            <div className="relative cursor-pointer" onClick={() => setCartOpen(true)}>
              <ShoppingCart size={24} className="text-secondary z-50" />
              <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full px-1.5">{cartQuantity}</span>
            </div>
          </div>
        </div>

        {/* Scrollable Nav Mobile */}
        <div className="relative md:hidden flex items-center">
          <button onClick={() => scrollNav("left")} className="absolute left-0 z-10 px-2 bg-white">
            <FaChevronLeft className="text-secondary" />
          </button>
          <div ref={navScrollRef} className="overflow-x-auto whitespace-nowrap flex gap-6 px-8 py-2 scrollbar-hide scroll-smooth w-full">
            {navLinks.map((link, index) => (
              <NavLink
                key={index}
                to={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                className={({ isActive }) =>
                  `inline-block pb-1 border-b-2 transition-all min-w-max ${
                    isActive
                      ? "border-secondary text-secondary font-semibold"
                      : "border-transparent text-gray-800 hover:text-secondary"
                  }`
                }
              >
                {link}
              </NavLink>
            ))}
          </div>
          <button onClick={() => scrollNav("right")} className="absolute right-0 z-10 px-2 bg-white">
            <FaChevronRight className="text-secondary" />
          </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-around px-8 py-3">
          <NavLink to="/"><img className="max-w-[120px]" src={logo} alt="Logo" /></NavLink>
          <div className="relative flex w-[600px]"><SearchBar /></div>
          <div className="flex gap-x-5 justify-center items-center">
          <div className="relative cursor-pointer" onClick={() => setCartOpen(true)}>
            <ShoppingCart size={28} className="text-secondary z-50" />
            <span className="absolute -top-2 -right-2 rounded-full bg-secondary px-2 text-xs text-white">{cartQuantity}</span>
          </div>
          {/* admin button */}
          <div><button className="bg-primary rounded px-3 py-2 text-white text-sm hover:bg-secondary" onClick={handleadmin}>Admin</button></div>
          </div>
        </div>

        <div className="hidden md:flex justify-center w-full lg:mt-1"><div className="h-[1px] w-[90%] bg-gray-500" /></div>

        {/* Nav Links Desktop */}
        <nav className="hidden md:flex flex-row justify-around items-center pt-2 pb-5 px-8">
          <ul className="flex flex-wrap items-center gap-6 uppercase font-medium text-base">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                  className={({ isActive }) =>
                    `pb-2 transition-colors ${
                      isActive
                        ? "border-b-2 border-secondary text-secondary"
                        : "hover:text-secondary hover:border-secondary"
                    }`
                  }
                >
                  {link}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="text-base text-primary font-medium">📞 +92 123 4567890 | ✉️ info@example.com</div>
        </nav>

      {/* Slide-in Cart Panel */}
{cartOpen && (
  <div
    className="fixed inset-0 bg-black bg-opacity-40 z-[60] flex justify-end"
    onClick={() => setCartOpen(false)}
  >
    <div
      className="w-80 max-w-full bg-white h-full p-4 shadow-lg overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h2 className="text-lg font-semibold">Your Cart</h2>
        <button
          onClick={() => setCartOpen(false)}
          className="text-red-500 font-bold text-xl"
        >
          &times;
        </button>
      </div>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={`${item.id}-${item.selectedSize}`} className="flex items-center gap-3 mb-4">
              {/* Delete button in front of product image */}
              <button
                onClick={() =>
                  dispatch(removeFromCart({ id: item.id, selectedSize: item.selectedSize }))
                }
                className="text-red-600 font-bold text-lg hover:text-red-800"
                title="Remove item"
              >
                🗑
              </button>

              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-contain rounded"
              />

              <div className="flex flex-col justify-between">
                <h4 className="font-medium text-sm line-clamp-1">{item.title}</h4>
                <span className="text-sm text-gray-600">Size: {item.selectedSize}</span>
                <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                <span className="font-semibold text-secondary">Rs. {item.price}</span>
              </div>
            </div>
          ))}

          <div className="border-t pt-4 mt-4">
            <p className="text-lg font-semibold text-right">
              Total: Rs. {cartTotal.toFixed(2)}
            </p>
            <NavLink to="/cart">
              <button className="mt-4 w-full bg-secondary text-white py-2 rounded hover:bg-primary" onClick={() => setCartOpen(false)}>
                See Your Cart
              </button>
            </NavLink>
          </div>
        </>
      )}
    </div>
  </div>
)}



        {/* Mobile Search */}
        {searchOpen && (
          <div className="fixed inset-0 z-[60] bg-black bg-opacity-50 p-1 flex justify-center items-start md:hidden">
            <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-4 mt-10 relative">
              <button onClick={() => setSearchOpen(false)} className="absolute top-0 z-40 right-1 font-bold text-red-600">
                &times;
              </button>
              <SearchBar />
            </div>
          </div>
        )}

        {/* Slide-in Menu */}
        {menuOpen && (
          <div className="fixed inset-0 bg-white z-50" onClick={() => setMenuOpen(false)}>
            <div
              className="fixed top-0 left-0 h-full w-64 bg-primary shadow-lg p-4 z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setMenuOpen(false)} className="text-xl text-red-600 bg-secondary rounded-full p-1 mb-4">
                <FaTimes />
              </button>
              <ul className="flex flex-col gap-4 font-medium text-white">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <NavLink
                      to={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `block transition-colors ${
                          isActive ? "text-secondary bg-white px-2 py-1 rounded" : "hover:text-secondary border-b-2"
                        }`
                      }
                    >
                      {link}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </header>

      {/* Spacer for Fixed Header */}
      <div className="pt-[130px] md:pt-[190px]" />
    </>
  );
};

export default Header;
