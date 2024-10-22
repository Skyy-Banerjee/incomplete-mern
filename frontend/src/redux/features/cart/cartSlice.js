import { createSlice } from "@reduxjs/toolkit";

// Initial state for the cart
const initialState = {
  products: [], // Array to store products in the cart
  selectedItems: 0, // Number of selected items
  totalPrice: 0, // Total price of all items in the cart
  tax: 0, // Calculated tax based on total price
  taxRate: 0.05, // Constant tax rate (5%)
  grandTotal: 0, // Total amount including tax
};

// Creating the cart slice using createSlice from Redux Toolkit
const cartSlice = createSlice({
  name: "cart", // Name of the slice
  initialState, // Initial state for the cart
  reducers: {
    // Action to add an item to the cart
    addToCart: (state, action) => {
      // Check if the item already exists in the cart
      const isExist = state.products.find(
        (product) => product.id === action.payload.id
      );

      // If the item does not exist, add it to the cart
      if (!isExist) {
        state.products.push({ ...action.payload, quantity: 1 }); // Add product with quantity 1
      } else {
        console.log("Item already added!"); // Message for duplicate items
      }

      // Recalculate state values after adding an item
      state.selectedItems = setSelectedItems(state); // Update number of selected items
      state.totalPrice = setTotalPrice(state); // Update total price
      state.tax = setTax(state); // Update tax
      state.grandTotal = setGrandTotal(state); // Update grand total
    },

    // Action to update the quantity of a product in the cart
    updateQuantity: (state, action) => {
      // Find the product in the cart by its ID
      const product = state.products.find(
        (product) => product.id === action.payload.id
      );

      // If the product is found, update its quantity
      if (product) {
        if (action.payload.type === "increment") {
          product.quantity += 1; // Increase quantity
        } else if (
          action.payload.type === "decrement" &&
          product.quantity > 1
        ) {
          product.quantity -= 1; // Decrease quantity (but not below 1)
        }
      }

      // Recalculate state values after modifying quantity
      state.selectedItems = setSelectedItems(state); // Update number of selected items
      state.totalPrice = setTotalPrice(state); // Update total price
      state.tax = setTax(state); // Update tax
      state.grandTotal = setGrandTotal(state); // Update grand total
    },
    removeFromCart: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
      state.selectedItems = setSelectedItems(state); // Update number of selected items
      state.totalPrice = setTotalPrice(state); // Update total price
      state.tax = setTax(state); // Update tax
      state.grandTotal = setGrandTotal(state); // Update grand total
    },
    clearCart: (state) => {
      state.products = []; // Clear the cart
      state.selectedItems = 0; // Reset number of selected items
      state.totalPrice = 0; // Reset total price
      state.tax = 0; // Reset tax
      state.grandTotal = 0; // Reset grand total
    },
  },
});

// Utility function to calculate the number of selected items in the cart
export function setSelectedItems(state) {
  return state.products.reduce((total, product) => {
    return total + product.quantity; // Add up the quantity of each product
  }, 0); // Initial value set to 0
}

// Utility function to calculate the total price of the cart
export function setTotalPrice(state) {
  return state.products.reduce((total, product) => {
    return total + product.quantity * product.price; // Multiply quantity by price for each product
  }, 0); // Initial value set to 0
}

// Utility function to calculate the tax based on the total price
export function setTax(state) {
  return setTotalPrice(state) * state.taxRate; // Multiply total price by tax rate
}

// Utility function to calculate the grand total (total price + tax)
export function setGrandTotal(state) {
  return setTotalPrice(state) + setTax(state); // Add total price and tax
}

// Exporting the actions to use in other parts of the app
export const { addToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice.actions;

// Exporting the reducer to include in the Redux store
export default cartSlice.reducer;
