import { Search, X } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/cartSlice"; // Make sure the path is correct

const SearchBar = () => {
  const [category, setCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const dispatch = useDispatch();

  const handleSearch = () => {
    const url =
      category === "All"
        ? "https://asaliyaa.minnaminnie.com/get_products.php"
        : `https://asaliyaa.minnaminnie.com/get_products_by_category.php?category=${category}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setProducts(data.data);
          setShowResults(true);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleClose = () => {
    setShowResults(false);
    setProducts([]);
  };

  return (
    <div className="w-full px-4 py-6 relative">
      {/* Search Bar */}
      <div className="relative flex w-full lg:max-w-[600px] items-center mb-6">
        <p className="lg:block hidden border uppercase text-sm font-medium border-secondary text-white py-3 px-2 bg-secondary">
          Your Favorites, Just One Search Away
        </p>
        <p className="w-full block lg:hidden border uppercase text-xs font-thin border-secondary text-white py-[10px] px-2 bg-secondary">
          QUICK SEARCH
        </p>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 border border-secondary py-3 text-sm focus:outline-none"
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
        </select>

        <button
          onClick={handleSearch}
          className="flex items-center justify-center ml-3 bg-primary px-4 py-3 text-white hover:bg-secondary/80 transition"
        >
          <Search size={20} className="mr-1" />
          <span className="text-sm font-medium">Search</span>
        </button>
      </div>

      {/* Results Section */}
      {showResults && (
  <div className="fixed top-0 left-0 w-full h-full bg-white p-4 shadow rounded-lg z-50 overflow-y-auto">
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

    {/* Product Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4 pb-10">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow p-3 flex flex-col items-center text-center"
        >
          <img
            src={product.image_small}
            alt={product.title}
            className="h-32 w-32 object-contain mb-2"
          />
          <h3 className="text-sm font-semibold">{product.title}</h3>
          <p className="text-xs text-gray-600 mb-2">
            Rs. {product.price_small} / {product.price_medium} / {product.price_large}
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
  </div>
)}

    </div>
  );
};

export default SearchBar;
