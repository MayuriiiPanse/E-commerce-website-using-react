import { loaduser, removeuser } from "../reducers/userSlice";
import {
  getCurrentUser,
  clearCurrentUser,
  setCurrentUser,
  findUserByCredentials,
  findUserByEmail,
  addUser,
  updateUser,
  deleteUser,
} from "../../utils/localStorageDB";

// ── Restore user session on app start ────────────────────────
export const asynccurrentuser = () => (dispatch) => {
  const user = getCurrentUser();
  if (user) dispatch(loaduser(user));
};

// ── Login ─────────────────────────────────────────────────────
export const asyncloginuser = (credentials) => (dispatch) => {
  const user = findUserByCredentials(credentials.email, credentials.password);
  if (!user) {
    alert("Invalid credentials");
    return;
  }
  setCurrentUser(user);
  dispatch(loaduser(user));
};

// ── Register ──────────────────────────────────────────────────
export const asyncreateruser = (user) => (dispatch) => {
  const exists = findUserByEmail(user.email);
  if (exists) {
    alert("User already exists with this email");
    return;
  }
  const newUser = { ...user, isAdmin: false, cart: [] };
  addUser(newUser);
  setCurrentUser(newUser);
  dispatch(loaduser(newUser));
};

// ── Update user (profile, cart changes) ──────────────────────
export const asyncupdateuser = (id, updatedUser) => (dispatch) => {
  const saved = updateUser(id, updatedUser);   // saves to localStorage
  dispatch(loaduser(saved));
};

// ── Logout ────────────────────────────────────────────────────
export const asynclogoutuser = () => (dispatch) => {
  clearCurrentUser();
  dispatch(removeuser());
};

// ── Delete account ────────────────────────────────────────────
export const asyncdeleteuser = (id) => (dispatch) => {
  deleteUser(id);
  clearCurrentUser();
  dispatch(removeuser());
};
