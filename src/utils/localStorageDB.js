// ============================================================
//  localStorageDB.js
//  This file is your "database".
//  Every read/write to localStorage goes through here.
//  Think of each function as a database query.
// ============================================================

import seedData from "../data/db.json";

// ── Keys used in localStorage ────────────────────────────────
const KEYS = {
  products: "lsdb_products",
  users: "lsdb_users",
  seeded: "lsdb_seeded",      // flag so we only seed once
  currentUser: "user",        // logged-in user session
};

// ── Seed (runs ONCE on first app load) ───────────────────────
// Copies products and users from db.json into localStorage.
// After the first visit this is skipped — localStorage has the real data.
export const seedIfNeeded = () => {
  if (localStorage.getItem(KEYS.seeded)) return; // already seeded
  localStorage.setItem(KEYS.products, JSON.stringify(seedData.products));
  localStorage.setItem(KEYS.users, JSON.stringify(seedData.users));
  localStorage.setItem(KEYS.seeded, "true");
  console.log("✅ LocalStorage seeded from db.json");
};

// ════════════════════════════════════════════════════════════
//  PRODUCTS
// ════════════════════════════════════════════════════════════

export const getProducts = () => {
  return JSON.parse(localStorage.getItem(KEYS.products) || "[]");
};

export const saveProducts = (products) => {
  localStorage.setItem(KEYS.products, JSON.stringify(products));
};

export const addProduct = (product) => {
  const products = getProducts();
  const updated = [...products, product];
  saveProducts(updated);
  return updated;
};

export const updateProduct = (updatedProduct) => {
  const products = getProducts();
  const updated = products.map((p) =>
    p.id === updatedProduct.id ? updatedProduct : p
  );
  saveProducts(updated);
  return updated;
};

export const deleteProduct = (id) => {
  const products = getProducts();
  const updated = products.filter((p) => p.id !== id);
  saveProducts(updated);
  return updated;
};

// ════════════════════════════════════════════════════════════
//  USERS
// ════════════════════════════════════════════════════════════

export const getUsers = () => {
  return JSON.parse(localStorage.getItem(KEYS.users) || "[]");
};

export const saveUsers = (users) => {
  localStorage.setItem(KEYS.users, JSON.stringify(users));
};

export const findUserByEmail = (email) => {
  return getUsers().find((u) => u.email === email) || null;
};

export const findUserByCredentials = (email, password) => {
  return getUsers().find(
    (u) => u.email === email && u.password === password
  ) || null;
};

export const addUser = (user) => {
  const users = getUsers();
  const updated = [...users, user];
  saveUsers(updated);
  return user;
};

export const updateUser = (id, updatedUser) => {
  const users = getUsers();
  const updated = users.map((u) => (u.id === id ? updatedUser : u));
  saveUsers(updated);
  // Also update the current session if it's the same user
  const session = getCurrentUser();
  if (session && session.id === id) {
    setCurrentUser(updatedUser);
  }
  return updatedUser;
};

export const deleteUser = (id) => {
  const users = getUsers();
  const updated = users.filter((u) => u.id !== id);
  saveUsers(updated);
};

// ════════════════════════════════════════════════════════════
//  CURRENT USER SESSION
// ════════════════════════════════════════════════════════════

export const getCurrentUser = () => {
  const stored = localStorage.getItem(KEYS.currentUser);
  return stored ? JSON.parse(stored) : null;
};

export const setCurrentUser = (user) => {
  localStorage.setItem(KEYS.currentUser, JSON.stringify(user));
};

export const clearCurrentUser = () => {
  localStorage.removeItem(KEYS.currentUser);
};
