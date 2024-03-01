import React, { createContext, useContext, useState } from 'react';

const AddContactContext = createContext();

export const AddContactProvider = ({ children }) => {
    const [contacts, setContacts] = useState([]);

    const addContact = (newContact) => {
        setContacts([...contacts, newContact]);
    };

    const updateContact = (updatedContact) => {
        const updatedContacts = contacts.map(contact =>
            contact === updatedContact ? updatedContact : contact
        );
        setContacts(updatedContacts);
    };

    const deleteContact = (contactToDelete) => {
        setContacts(contacts.filter(contact => contact !== contactToDelete));
    };

    return (
        <AddContactContext.Provider value={{ contacts, addContact, updateContact, deleteContact }}>
            {children}
        </AddContactContext.Provider>
    );
};

export const useAddContact = () => useContext(AddContactContext);
