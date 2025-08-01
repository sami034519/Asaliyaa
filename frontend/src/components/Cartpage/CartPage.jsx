import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../Redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import cartimage from '../../images/orderbanner1.png';
import AOS from 'aos';
import 'aos/dist/aos.css';

const CartPage = () => {
  const cart = useSelector(state =>
    Array.isArray(state.cart.items) ? state.cart.items : []
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const handleQuantityChange = (id, selectedSize, quantity) => {
    const qty = parseInt(quantity);
    if (qty > 0) {
      dispatch(updateQuantity({ id, selectedSize, quantity: qty }));
    }
  };

  const handleRemove = (id, selectedSize) => {
    dispatch(removeFromCart({ id, selectedSize }));
  };

  const getPriceBySize = (item) => {
    return (
      (item.selectedSize === 'Small' && item.price_small) ||
      (item.selectedSize === 'Medium' && item.price_medium) ||
      (item.selectedSize === 'Large' && item.price_large) ||
      0
    );
  };

  const total = cart.reduce((sum, item) => {
    const price = parseFloat(getPriceBySize(item)) || 0;
    return sum + item.quantity * price;
  }, 0);

  const goToDetailPage = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <>
      {/* Banner Section */}
      <div className='relative'>
        <div className="mt-10 overflow-hidden">
          <img className="w-full h-full object-contain" src={cartimage} alt="Cart Banner" />
        </div>
        {/* <div className='absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
          <h1 className='text-white text-center uppercase font-bold text-4xl px-4'>
            You're just a step away from enjoying your favorite products
          </h1>
        </div> */}
      </div>

      {/* Cart Items */}
      <div className="p-4 lg:mt-20">
        <h2 className="text-2xl text-black font-bold mb-4 uppercase">Your Cart</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item, index) => (
              <div
                key={`${item.id}-${item.selectedSize}-${index}`}
                className="flex items-center gap-4 mb-3 border-b pb-2"
                data-aos="zoom-in"
              >
                <img
                  onClick={() => goToDetailPage(item.id)}
                  src={item.image || item.image_small || '/placeholder.png'}
                  alt={item.title}
                  className="w-20 h-20 object-contain border rounded cursor-pointer hover:scale-105 transition-transform"
                />
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => goToDetailPage(item.id)}
                >
                  <h4 className="font-semibold hover:underline">{item.title}</h4>
                  <p className="text-sm text-gray-600">Size: {item.selectedSize}</p>
                  <p className="text-sm text-gray-600">Rs. {getPriceBySize(item)}</p>
                </div>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, item.selectedSize, e.target.value)
                  }
                  className="w-12 border px-1 text-center"
                />
                <button
                  onClick={() => handleRemove(item.id, item.selectedSize)}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="mt-4">
              <p className="text-lg font-semibold text-black">Total: Rs. {total.toFixed(2)}</p>
              <button
                onClick={() => dispatch(clearCart())}
                className="mt-2 bg-red-500 text-white px-4 py-1 rounded"
              >
                Clear Cart
              </button>
              <button className="ml-4 mt-2 bg-green-600 text-white px-4 py-1 rounded">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartPage;
