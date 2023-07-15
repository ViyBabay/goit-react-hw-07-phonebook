import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContactThunk } from 'redux/operations';
import { selectContacts, selectFilter } from 'redux/selectors';
import s from './ContactList.module.css';

const getVisibleContacts = (contacts, filter) => {
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
};

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  const visibleContacts = getVisibleContacts(contacts, filter);

  return (
    <ul>
      {visibleContacts.map(contact => (
        <li key={contact.id} className={s.list}>
          {contact.name}: {contact.phone}
          <button
            onClick={() => dispatch(deleteContactThunk(contact.id))}
            className={s.delBtn}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
