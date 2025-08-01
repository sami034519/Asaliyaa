import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import AddProduct from "./Addproduct";
import logo from "../../images/asaliyalogomremovebg.png";
import UpdateProductManager from "./UpdateProductManager";
import DeleteProductManager from "./DeleteProducts";
import {
  FaPlus,
  FaSync,
  FaTrash,
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaHome,
  FaSpa,
  FaSeedling,
  FaTint,
  FaOilCan,
  FaMortarPestle,
  FaLeaf,
  FaFireAlt,
  FaPumpSoap,
  FaBreadSlice,
   FaPepperHot,
} from "react-icons/fa";

const categoryConfig = [
  { title: "Honey", icon: <FaTint /> },
  { title: "Saffron", icon: <FaSeedling /> },
  { title: "Massage Oils", icon: <FaSpa /> },
  { title: "Cooking Oils", icon: <FaOilCan /> },
  { title: "Slagit", icon: <FaMortarPestle /> },
  { title: "Herbal Tea", icon: <FaLeaf /> },
  { title: "Desi Ghee", icon: <FaFireAlt /> },
  { title: "Achhar", icon: <FaPumpSoap /> },
   { title: "Sugar Free Flour", icon: <FaBreadSlice /> },
   { title: "Organic Spices", icon: <FaPepperHot /> },
];

const navLinks = [
  { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
  { name: "Add Product", action: "add", icon: <FaPlus /> },
  { name: "Update Product", action: "update", icon: <FaSync /> },
  { name: "Delete Product", action: "delete", icon: <FaTrash /> },
  { name: "Orders", path: "", icon: <FaShoppingCart /> },
];

const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [popup, setPopup] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [products, setProducts] = useState([]);

  const handleNavClick = (link) => {
    setMenuOpen(false);
    setPopup(link.action || null);
  };

  const handleCategoryClick = async (category) => {
    setActiveCategory(category);
    setPopup(null);

    try {
      const response = await fetch(
        `https://asaliyaa.minnaminnie.com/get_products_by_category.php?category=${encodeURIComponent(
          category
        )}`
      );
      const data = await response.json();
      if (data.status === "success") {
        setProducts(data.data);
      } else {
        setProducts([]);
        console.error(data.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleUpdate = (product) => {
    console.log("Update clicked for:", product);
    // open update popup logic here
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await fetch(
          "https://asaliyaa.minnaminnie.com/delete_product.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: productId }),
          }
        );

        const result = await res.json();
        if (result.status === "success") {
          setProducts((prev) => prev.filter((p) => p.id !== productId));
        } else {
          alert("Delete failed: " + result.message);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <>
     {popup === "add" && <AddProduct onClose={() => setPopup(null)} />}
{popup === "update" && (
  <UpdateProductManager onClose={() => setPopup(null)} />
)}
{popup === "delete" && (
  <DeleteProductManager onClose={() => setPopup(null)} />
)}

      <div className="p-6 bg-slate-900 relative min-h-screen">
        <div className="border rounded shadow bg-[#1E1E2F] text-white">
          {/* Mobile Topbar */}
          <div className="md:hidden flex justify-between items-center bg-mypurple px-4 py-3">
            <h2 className="text-xl font-bold">Admin</h2>
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          <div className="flex">
            {/* Sidebar */}
            <aside
              className={`bg-slate-900 w-full md:w-64 p-4 md:block ${
                menuOpen ? "block" : "hidden"
              }`}
            >
              <div className="flex justify-center mb-6">
                <NavLink to="/">
                  <img src={logo} alt="Logo" className="w-32 h-auto" />
                </NavLink>
              </div>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    {link.action ? (
                      <button
                        onClick={() => handleNavClick(link)}
                        className="flex items-center gap-3 w-full px-3 py-2 rounded text-white hover:text-mypink hover:bg-white/10"
                      >
                        <span>{link.icon}</span>
                        {link.name}
                      </button>
                    ) : (
                      <NavLink
                        to={link.path}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2 rounded ${
                            isActive
                              ? "bg-myPink text-white font-semibold"
                              : "text-white hover:text-mypink hover:bg-white/10"
                          }`
                        }
                        onClick={() => setMenuOpen(false)}
                      >
                        <span>{link.icon}</span>
                        {link.name}
                      </NavLink>
                    )}
                  </li>
                ))}
              </ul>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4">
              <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

              {/* Category Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categoryConfig.map((cat) => (
                  <Card
                    key={cat.title}
                    icon={cat.icon}
                    title={cat.title}
                    count="--"
                    onClick={() => handleCategoryClick(cat.title)}
                  />
                ))}
              </div>

              {/* Products Display */}
              {activeCategory && (
                <div className="mt-8 absolute inset-0 bg-white p-6 z-10 overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">
                      Products in {activeCategory}
                    </h2>
                    <button
                      onClick={() => setActiveCategory(null)}
                      className="text-4xl font-bold text-red-500  hover:text-black"
                      aria-label="Close"
                    >
                      &times;
                    </button>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="bg-slate-800 text-white rounded p-4 shadow"
                      >
                        <img
                          src={product.image_small}
                          alt={product.title}
                          className="h-48 w-full object-contain rounded mb-2"
                        />
                        <h3 className="font-bold text-lg">{product.title}</h3>
                       
                        <div className="flex justify-between">
                          <button
                            onClick={() => handleUpdate(product)}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <button
                  onClick={() => setPopup("add")}
                  className="bg-primary hover:bg-secondary p-3 text-white rounded flex items-center justify-center gap-2"
                >
                  <FaPlus /> Add Product
                </button>
                <button
                  onClick={() => setPopup("update")}
                  className="bg-primary hover:bg-secondary p-3 text-white rounded flex items-center justify-center gap-2"
                >
                  <FaSync /> Update
                </button>
                <button
                  onClick={() => setPopup("delete")}
                  className="bg-red-600 hover:bg-red-700 p-3 text-white rounded flex items-center justify-center gap-2"
                >
                  <FaTrash /> Delete
                </button>
              </div>

              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

const Card = ({ icon, title, count, onClick }) => (
  <div
    onClick={onClick}
    className="cursor-pointer p-4 rounded bg-slate-400 hover:bg-primary transition text-white text-center shadow"
  >
    <div className="text-4xl mb-2">{icon}</div>
    <h3 className="text-lg font-bold">{title}</h3>
    <p className="text-sm">{count} Products</p>
  </div>
);

export default Dashboard;
