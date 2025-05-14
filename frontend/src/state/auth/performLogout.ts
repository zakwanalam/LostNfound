import axios from 'axios';
import { logout } from './loginSlice';
import { AppDispatch } from '../store';

export const performLogout = () => async (dispatch: AppDispatch) => {
  try {
    await axios.post("http://localhost:5086/api/auth/logout", {}, { withCredentials: true });
  } catch (err) {
    console.error("Logout API failed:", err);
  } finally {
    dispatch(logout());
    localStorage.removeItem("userData");
  }
};