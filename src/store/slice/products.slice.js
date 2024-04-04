import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    favoriteProducts: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload.map((product) => ({
        ...product,
        is_favorite: false,
        color: "white",
      }));
    },
    updateProduct: (state, action) => {
      const { id, key, value } = action.payload;
      const product = state.products.find((product) => product.id === id);
      if (product) {
        product[key] = value;
        if (key === "is_favorite") {
          product.color = value ? "red" : "white";
        }
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    addFavoriteProduct: (state, action) => {
      const product = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (product && product.is_favorite) {
        const index = state.favoriteProducts.findIndex(
          (favorite) => favorite.id === action.payload.id
        );
        if (index === -1) {
          state.favoriteProducts.push(action.payload);
        }
      }
    },
    removeFavoriteProduct: (state, action) => {
      const product = state.products.find(
        (product) => product.id === action.payload
      );
      if (product && product.is_favorite) {
        state.favoriteProducts = state.favoriteProducts.filter(
          (favorite) => favorite.id !== action.payload
        );
      }
    },
  },
});

export const { setProducts, updateProduct, deleteProduct, addFavoriteProduct, removeFavoriteProduct } = productsSlice.actions;

export default productsSlice.reducer;