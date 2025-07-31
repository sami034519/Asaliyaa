import React, { useState } from "react";

const categories = [
  "Honey",
  "Saffron",
  "Massage Oils",
  "Cooking Oils",
  "Slagit",
  "Herbal Tea",
  "Desi Ghee",
  "Achhar",
];

const DeleteProductManager = ({ onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);

  const fetchProducts = async (category) => {
    try {
      const res = await fetch(
        `https://asaliyaa.minnaminnie.com/get_products_by_category.php?category=${category}`
      );
      const data = await res.json();
      const cleanedProducts = (data.data || []).map((product) => {
        const cleaned = {};
        for (const [key, value] of Object.entries(product)) {
          cleaned[key] =
            typeof value === "string" ? value.replace(/^"(.*)"$/, "$1") : value;
        }
        return cleaned;
      });
      setProducts(cleanedProducts);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    fetchProducts(cat);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const res = await fetch(
        "https://asaliyaa.minnaminnie.com/delete_product.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        }
      );

      const result = await res.json();
      alert(result.message || "Product deleted");
      fetchProducts(selectedCategory); // Refresh product list
    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-white p-4 overflow-y-auto z-50">
      <button
        onClick={onClose}
        className="text-red-600 text-lg font-bold float-right"
      >
        X
      </button>
      {!selectedCategory ? (
        <div>
          <h2 className="text-xl font-bold mb-4">Select Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                className="bg-slate-800 text-white px-4 py-2 rounded"
                onClick={() => handleCategorySelect(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Products in {selectedCategory}
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-slate-100 border p-4 rounded shadow"
              >
                <img
                  src={p.image_small}
                  className="h-32 object-contain mb-2"
                  alt={p.title}
                />
                <h3 className="font-semibold">{p.title}</h3>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-red-600 mt-2 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteProductManager;
