// UpdateProductManager.jsx
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
  "Sugar Free Flour",
  "Organic Spices"
];

const UpdateProductManager = ({ onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(""); // '', 'updating', 'updated'

  const fetchProducts = async (category) => {
    try {
      const res = await fetch(
        `https://asaliyaa.minnaminnie.com/get_products_by_category.php?category=${category}`
      );
      const data = await res.json();
      console.log("raw data", data);
      console.log("product", data.products);
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

  const handleUpdateClick = (product) => {
    setEditingProduct(product);
    setFormData({ ...product });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("updating");

    const form = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (val) form.append(key, val);
    });

    try {
      const res = await fetch(
        "https://asaliyaa.minnaminnie.com/update_product.php",
        {
          method: "POST",
          body: form,
        }
      );
      const result = await res.json();
      alert(result.message);
      setSubmitStatus("updated");

      // Reset submit button after 2 seconds
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus("");
        setEditingProduct(null);
        fetchProducts(selectedCategory);
      }, 2000);
    } catch (error) {
      alert("Update failed");
      setIsSubmitting(false);
      setSubmitStatus("");
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
      ) : editingProduct ? (
        <div>
          <h2 className="text-xl font-bold mb-4">Update Product</h2>
          <form onSubmit={handleSubmit} className="grid gap-4 max-w-md">
            <input type="hidden" name="id" value={formData.id} />
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              className="border p-2"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="border p-2"
            />
            <input
              name="price_small"
              value={formData.price_small}
              onChange={handleChange}
              placeholder="Price Small"
              className="border p-2"
            />
            <input
              name="price_medium"
              value={formData.price_medium}
              onChange={handleChange}
              placeholder="Price Medium"
              className="border p-2"
            />
            <input
              name="price_large"
              value={formData.price_large}
              onChange={handleChange}
              placeholder="Price Large"
              className="border p-2"
            />
            <textarea
              name="features"
              value={formData.features}
              onChange={handleChange}
              placeholder="Features"
              className="border p-2"
            />
            <input type="file" name="image_small" onChange={handleChange} />
            <input type="file" name="image_medium" onChange={handleChange} />
            <input type="file" name="image_large" onChange={handleChange} />
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 rounded text-white ${
                submitStatus === "updated" ? "bg-green-600" : "bg-blue-600"
              }`}
            >
              {submitStatus === "updating"
                ? "Updating..."
                : submitStatus === "updated"
                ? "Updated"
                : "Submit"}
            </button>

            <button
              type="button"
              onClick={() => setEditingProduct(null)}
              className="text-gray-600"
            >
              Cancel
            </button>
          </form>
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
                  onClick={() => handleUpdateClick(p)}
                  className="bg-blue-500 mt-2 text-white px-3 py-1 rounded"
                >
                  Update
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProductManager;
