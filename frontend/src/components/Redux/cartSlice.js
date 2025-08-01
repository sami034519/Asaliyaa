import { createSlice } from '@reduxjs/toolkit';

const loadCart = () => {
  try {
    const data = localStorage.getItem('cart');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveCart = (cartItems) => {
  localStorage.setItem('cart', JSON.stringify(cartItems));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCart(),
  },
  reducers: {
  addToCart: (state, action) => {
  const item = state.items.find(
    p => p.id === action.payload.id && p.selectedSize === action.payload.selectedSize
  );
  if (item) {
    item.quantity += action.payload.quantity;
  } else {
    state.items.push({ ...action.payload });
  }
  },

   removeFromCart: (state, action) => {
  const { id, selectedSize } = action.payload;
  state.items = state.items.filter(
    (item) => !(item.id === id && item.selectedSize === selectedSize)
  );
  saveCart(state.items); // if using localStorage
},

    clearCart: (state) => {
      state.items = [];
      saveCart([]);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(p => p.id === id);
      if (item) {
        item.quantity = quantity;
        saveCart(state.items);
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
