import { loadproduct } from "../reducers/productSlice";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../utils/localStorageDB";

// ── Load all products from localStorage ──────────────────────
export const asyncloadproducts = () => (dispatch) => {
  const products = getProducts();
  dispatch(loadproduct(products));
};

// ── Create a new product ──────────────────────────────────────
export const asynccreateproduct = (product) => (dispatch) => {
  addProduct(product);
  dispatch(asyncloadproducts());
};

// ── Update an existing product ────────────────────────────────
export const asyncupdateproduct = (product) => (dispatch) => {
  updateProduct(product);
  dispatch(asyncloadproducts());
};

// ── Delete a product ──────────────────────────────────────────
export const asyncdeleteproduct = (id) => (dispatch) => {
  deleteProduct(id);
  dispatch(asyncloadproducts());
};
