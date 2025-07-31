import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../Redux/cartSlice';

const CartPage = () => {
  // Ensure cart is always an array
  const cart = useSelector(state => Array.isArray(state.cart.items) ? state.cart.items : []);

  const dispatch = useDispatch();

  const handleQuantityChange = (id, quantity) => {
    const qty = parseInt(quantity);
    if (qty > 0) {
      dispatch(updateQuantity({ id, quantity: qty }));
    }
  };

  // Safely calculate total
  const total = cart.reduce((sum, item) => {
    const price = parseFloat(item.price_small || 0);
    return sum + (item.quantity * price);
  }, 0);

  return (
    <div className="p-4 mt-20">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="flex  items-center gap-4 mb-3 border-b pb-2">
              <img
                src={item.image_small}
                alt={item.title}
                className="w-20 h-20 object-contain border rounded"
              />
              <div className="flex-1">
                <h4 className="font-semibold">{item.title}</h4>
                <p className="text-sm text-gray-600">Rs. {item.price_small}</p>
              </div>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                className="w-12 border px-1 text-center"
              />
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-4">
            <p className="text-lg font-semibold">Total: Rs. {total.toFixed(2)}</p>
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
  );
};

export default CartPage;
