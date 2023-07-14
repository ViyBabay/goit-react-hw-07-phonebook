import React, { useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { useDispatch } from 'react-redux';
import { fetchContactThunk } from 'redux/operetions';

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContactThunk());
  }, [dispatch]);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ContactForm />
      <Filter />
      <ContactList />
    </div>
  );
};
