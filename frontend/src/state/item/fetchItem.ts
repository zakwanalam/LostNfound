// features/item/itemActions.ts
import axios from 'axios';
import { setItems, setLoading, setError } from './itemslice';
import { AppDispatch } from '../store';


export const fetchItems = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true)); // Start loading
  try {
    const response = await axios.get('http://localhost:5086/api/item/getItems', {
      withCredentials: true,
    });
    dispatch(setItems(response.data)); // Set fetched items
  } catch (err: any) {
    dispatch(setError('Failed to fetch items')); // Handle error
    console.error('Fetch items error:', err);
  } finally {
    dispatch(setLoading(false)); // End loading
  }
};
