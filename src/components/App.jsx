import React, { useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContactThunk } from 'redux/operations';
import { selectError } from 'redux/slice';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export const App = () => {
  const dispatch = useDispatch();
  const isError = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContactThunk());
  }, [dispatch]);
  const dataError = () => {
    toast.error(isError);
    return <p>'Data error! Please try again'</p>;
  };

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
      {isError ? dataError : <ContactList />}
      <ToastContainer />
    </div>
  );
};
