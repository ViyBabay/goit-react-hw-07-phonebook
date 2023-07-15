import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContactThunk } from 'redux/operations';
import s from './ContactForm.module.css';
import { selectContacts } from 'redux/selectors';
import { toast } from 'react-toastify';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (existingContact) {
      return toast.warn(`${name} is already in contacts!`);
    }
    dispatch(addContactThunk({ name, phone }));
    setName('');
    setPhone('');
  };

  return (
    <>
      <h1>PhoneBook</h1>
      <form onSubmit={handleSubmit} className={s.form}>
        <label className={s.label}>
          <p className={s.parag}>Name</p>
          <input
            className={s.input}
            type="text"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className={s.label}>
          <p className={s.parag}>Number</p>
          <input
            className={s.input}
            type="tel"
            name="number"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button type="submit" className={s.submit}>
          Add contact
        </button>
      </form>
    </>
  );
};
