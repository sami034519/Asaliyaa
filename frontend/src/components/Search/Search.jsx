import { Search, X } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../Redux/cartSlice";

const SearchBar = () => {
  const [category, setCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = () => {
    const url =
      category === "All"
        ? "https://asaliyaa.minnaminnie.com/get_products.php"
        : `https://asaliyaa.minnaminnie.com/get_products_by_category.php?category=${category}`;

    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setProducts(data.data);
          setShowResults(true);
        }
      })
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setLoading(false));
  };

  const handleAddToCart = (product) => {
      dispatch(
        addToCart({
          ...product,
          quantity: 1,
          image: product.image_medium,
          price: product.price_small, // Default to small
          selectedSize: "small",
        })
      );
    };

  const handleClose = () => {
    setShowResults(false);
    setProducts([]);
  };

  const handleNavigate = (id) => {
    navigate(`/product/${id}`);
    handleClose(); // Close popup after navigating
  };

  return (
    <div className="w-full px-4 py-6 relative">
      {/* Search Bar */}
      <div className="relative flex w-full lg:max-w-[600px] items-center mb-6">
        <p className="lg:block hidden border uppercase text-sm font-medium rounded-l border-secondary text-white py-3 px-2 bg-secondary">
          Your Favorites, Just One Search Away
        </p>
        <p className="w-full block lg:hidden border uppercase text-xs font-thin border-secondary text-white py-[10px] px-2 bg-secondary">
          QUICK SEARCH
        </p>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 border border-secondary py-3 rounded-r text-sm focus:outline-none"
        >
          <option value="All">All</option>
          <option value="Honey">Honey</option>
          <option value="Saffron">Saffron</option>
          <option value="Massage Oils">Massage Oils</option>
          <option value="Cooking Oils">Cooking Oils</option>
          <option value="Slagit">Slagit</option>
          <option value="Herbal Tea">Herbal Tea</option>
          <option value="Desi Ghee">Desi Ghee</option>
          <option value="Achhar">Achhar</option>
          <option value="Sugar Free Flour">Sugar Free Flour</option>
          <option value="Organic Spices">Organic Spices</option>
        </select>

        <button
          onClick={handleSearch}
          className="flex items-center justify-center ml-3 rounded bg-primary px-4 py-3 text-white hover:bg-secondary/80 transition"
        >
          <Search size={20} className="mr-1" />
          <span className="text-sm font-medium">Search</span>
        </button>
      </div>

      {/* Results Section */}
      {showResults && (
        <div className="fixed top-32 left-0 w-full h-full bg-white p-4 shadow rounded-lg z-30 overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
          >
            <X size={24} />
          </button>

          {/* Header */}
          <h2 className="text-lg font-semibold mb-4 mt-2 text-center">
            Search Results
          </h2>

          {/* Loading State */}
          {loading ? (
            <p className="text-center text-gray-600 mt-8">Loading...</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4 pb-10">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow p-3 flex flex-col items-center text-center hover:shadow-md transition cursor-pointer"
                >
                  <img
                    src={product.image_small}
                    alt={product.title}
                    className="h-32 w-32 object-contain mb-2"
                    onClick={() => handleNavigate(product.id)}
                  />
                  <h3
                    className="text-sm font-semibold hover:text-primary"
                    onClick={() => handleNavigate(product.id)}
                  >
                    {product.title}
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">
                    Rs. {product.price_small} / {product.price_medium} /{" "}
                    {product.price_large}
                  </p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-primary text-white text-xs px-3 py-1 rounded hover:bg-secondary transition"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
