import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const AddProduct = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price_small: '',
    price_medium: '',
    price_large: '',
    description: '',
    features: '',
    image_small: null,
    image_medium: null,
    image_large: null,
  });

  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const res = await fetch('https://asaliyaa.minnaminnie.com/add_product.php', {
        method: 'POST',
        body: data,
      });

      const result = await res.text();

      if (res.ok && result.toLowerCase().includes('success')) {
        setStatus('success');
        setTimeout(() => {
          setStatus('idle');
          onClose(); // Close popup after success
        }, 2000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative max-w-4xl mx-auto mt-10 bg-white shadow-xl rounded-xl p-6 w-full">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Product</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="title" placeholder="Product Title" className="input border p-2" onChange={handleChange} required />

          <select name="category" className="input border p-2" onChange={handleChange} required>
            <option value="">Select Category</option>
            <option value="Honey">Honey</option>
            <option value="Saffron">Saffron</option>
            <option value="Massage Oils">Massage Oils</option>
            <option value="Cooking Oils">Cooking Oils</option>
            <option value="Slagit">Slagit</option>
            <option value="Herbal Tea">Herbal Tea</option>
            <option value="Desi Ghee">Desi Ghee</option>
            <option value="Achhar">Achhar</option>
          </select>

          <input type="number" name="price_small" placeholder="Price Small" className="input border p-2" onChange={handleChange} required />
          <input type="number" name="price_medium" placeholder="Price Medium" className="input border p-2" onChange={handleChange} required />
          <input type="number" name="price_large" placeholder="Price Large" className="input border p-2" onChange={handleChange} required />

          <textarea name="description" placeholder="Product Description" rows="3" className="input md:col-span-2 border p-2" onChange={handleChange} required />
          <textarea name="features" placeholder="Product Features (comma-separated)" rows="3" className="input md:col-span-2 border p-2" onChange={handleChange} required />

          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Image Small</label>
              <input type="file" name="image_small" accept="image/*" onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image Medium</label>
              <input type="file" name="image_medium" accept="image/*" onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image Large</label>
              <input type="file" name="image_large" accept="image/*" onChange={handleChange} required />
            </div>
          </div>

          <button
            type="submit"
            className={`md:col-span-2 py-2 px-4 rounded text-white transition ${
              status === 'loading'
                ? 'bg-gray-500 cursor-not-allowed'
                : status === 'success'
                ? 'bg-green-600'
                : 'bg-green-700 hover:bg-green-800'
            }`}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Uploading...
              </span>
            ) : status === 'success' ? (
              'Added Successfully!'
            ) : (
              'Submit Product'
            )}
          </button>
        </form>

        {status === 'error' && (
          <p className="text-center text-red-600 mt-4 font-medium">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
