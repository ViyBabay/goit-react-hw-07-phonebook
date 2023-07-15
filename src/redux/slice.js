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
  state.loading = false;
  state.error = action.payload;
};
const pending = (state, action) => {
  state.loading = true;
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
      .addCase(fetchContactThunk.fulfilled, (state, action) => {
        state.contacts = action.payload;
        state.loading = false;
      })
      .addCase(deleteContactThunk.fulfilled, (state, { payload }) => {
        state.contacts = state.contacts.items.filter(
          contact => contact.id !== payload.id
        );
        state.loading = false;
      })
      .addCase(addContactThunk.fulfilled, (state, action) => {
        state.contacts.items.push(action.payload);
        state.loading = false;
      })
      .addMatcher(action => action.type.endsWith('/pending'), pending)
      .addMatcher(action => action.type.endsWith('/rejected'), rejected);
  },
});

export const { addContact, deleteContact, filterContact } =
  contactSlice.actions;
export const contactReducer = contactSlice.reducer;

export const selectContacts = state => state.contacts.items;
export const selectFilter = state => state.filter;
export const selectLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;
