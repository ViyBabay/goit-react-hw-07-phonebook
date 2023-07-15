import { createSlice } from '@reduxjs/toolkit';
import {
  addContactThunk,
  deleteContactThunk,
  fetchContactThunk,
} from './operations';

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};

const rejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};
const pending = (state, action) => {
  state.isLoading = true;
  state.error = '';
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState: initialState,
  reducers: {
    filterContact(state, { payload }) {
      state.filter = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContactThunk.fulfilled, (state, { payload }) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        state.contacts.items = payload;
      })
      .addCase(deleteContactThunk.fulfilled, (state, { payload }) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        const index = state.contacts.items.findIndex(
          task => task.id === payload.id
        );
        state.contacts.items.splice(index, 1);
      })
      .addCase(addContactThunk.fulfilled, (state, { payload }) => {
        state.contacts.items = [...state.contacts.items, payload];
        state.contacts.isLoading = false;
        state.contacts.error = null;
      })
      .addMatcher(action => action.type.endsWith('/pending'), pending)
      .addMatcher(action => action.type.endsWith('/rejected'), rejected);
  },
});

export const { addContact, deleteContact, filterContact } =
  contactSlice.actions;
export const contactReducer = contactSlice.reducer;
