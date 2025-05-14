// features/item/itemSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Item {
  itemId: number;
  userId: string;
  itemName: string;
  description: string;
  dateReported: string;           // ISO date string
  location: string;
  imagePath: string;
  itemType: 'Lost' | 'Found';
  status: 'Pending' | 'Claimed' | 'Returned';

  // user info
  profilePictureUrl: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}



export interface ItemState {
  items: Item[];
  loading: boolean;
  error: string | null;
}

const initialState: ItemState = {
  items: [],
  loading: false,
  error: null,
};

const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Item[]>) => {
      state.items = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setItems, setLoading, setError } = itemSlice.actions;
export default itemSlice.reducer;
