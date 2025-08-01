import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/cartSlice";
import { NavLink } from "react-router-dom";
const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("medium");

  useEffect(() => {
    fetch(`https://asaliyaa.minnaminnie.com/get_product_by_id.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setSelectedSize("medium");
        setMainImage(data.image_medium); // Default image on load
      });
  }, [id]);

  const getPrice = (size) => {
    switch (size) {
      case "small":
        return product.price_small;
      case "large":
        return product.price_large;
      default:
        return product.price_medium;
    }
  };

  const handleImageClick = (size) => {
    setSelectedSize(size);
    if (size === "small") setMainImage(product.image_small);
    if (size === "medium") setMainImage(product.image_medium);
    if (size === "large") setMainImage(product.image_large);
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        description: product.description,
        price: getPrice(selectedSize),
        image: mainImage,
        quantity: quantity,
        selectedSize: selectedSize,
      })
    );
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 mt-28 md:flex gap-10">
      {/* Images */}
      <div className="flex flex-col items-center md:w-1/2">
        <img
          src={mainImage}
          alt="Main"
          className="w-full max-w-md border rounded-xl mb-4"
        />
        <div className="flex gap-3">
          <img
            src={product.image_small}
            alt="Small"
            onClick={() => handleImageClick("small")}
            className={`w-20 h-20 border rounded-md cursor-pointer hover:border-green-600 ${
              selectedSize === "small" ? "border-green-600" : ""
            }`}
          />
          <img
            src={product.image_medium}
            alt="Medium"
            onClick={() => handleImageClick("medium")}
            className={`w-20 h-20 border rounded-md cursor-pointer hover:border-green-600 ${
              selectedSize === "medium" ? "border-green-600" : ""
            }`}
          />
          <img
            src={product.image_large}
            alt="Large"
            onClick={() => handleImageClick("large")}
            className={`w-20 h-20 border rounded-md cursor-pointer hover:border-green-600 ${
              selectedSize === "large" ? "border-green-600" : ""
            }`}
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="md:w-1/2 space-y-4">
        <h2 className="text-2xl text-black font-bold">{product.title}</h2>
        <p className="text-gray-600">{product.description}</p>

        <div>
          <h4 className="font-bold text-xl text-black">Features:</h4>
          <ul className="list-disc list-inside text-gray-700">
            {product.features
              ?.split("\n")
              .filter((line) => line.trim() !== "")
              .map((feature, index) => (
                <li key={index}>{feature.trim()}</li>
              ))}
          </ul>
        </div>

        {/* Selected Size Display */}
        <div className="mt-4 text-lg text-black">
          <strong>Selected Size:</strong>{" "}
          {selectedSize.charAt(0).toUpperCase() + selectedSize.slice(1)} — Rs{" "}
          {getPrice(selectedSize)}
        </div>

        {/* Quantity + Buttons */}
        <div className="flex items-center gap-4 mt-6">
          <div className="flex items-center border rounded px-2">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="text-xl px-2"
            >
              -
            </button>
            <span className="px-2">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="text-xl px-2"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
          >
            Add to Cart
          </button>
  <NavLink to="/cart"><button className="bg-black text-white px-5 py-2 rounded hover:bg-gray-800">
            Buy Now
          </button></NavLink>
          
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
