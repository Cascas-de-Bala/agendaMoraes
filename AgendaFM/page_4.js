import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

// Função para gerar IDs aleatórios simples
const generateId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
};

const AddContactContext = createContext();

export const AddContactProvider = ({ children }) => {
    const [contacts, setContacts] = useState([]);
    const [deletedContacts, setDeletedContacts] = useState([]);

    useEffect(() => {
        // Recuperar contatos do armazenamento interno ao inicializar o contexto
        const loadContacts = async () => {
            try {
                const storedContacts = await AsyncStorage.getItem('contacts');
                if (storedContacts) {
                    setContacts(JSON.parse(storedContacts));
                }
            } catch (error) {
                console.error('Error loading contacts:', error);
            }
        };
        loadContacts();
    }, []);

    useEffect(() => {
        // Salvar contatos excluídos permanentemente no armazenamento interno
        const saveDeletedContacts = async () => {
            try {
                await AsyncStorage.setItem('deletedContacts', JSON.stringify(deletedContacts));
            } catch (error) {
                console.error('Error saving deleted contacts:', error);
            }
        };
        saveDeletedContacts();
    }, [deletedContacts]);

    const saveContacts = async (updatedContacts) => {
        try {
            await AsyncStorage.setItem('contacts', JSON.stringify(updatedContacts));
        } catch (error) {
            console.error('Error saving contacts:', error);
        }
    };

    const addContact = async (newContact) => {
        // Verificar se já existe um contato com o mesmo nome ou número
        const existingContact = contacts.find(contact => contact.nome === newContact.nome || contact.telefone === newContact.telefone);

        if (existingContact) {
            Alert.alert('Erro', 'Já existe um contato com este nome ou número.');
            return;
        }

        const contactWithId = { ...newContact, id: generateId() }; // Adicionar ID único ao novo contato
        const updatedContacts = [...contacts, contactWithId];
        setContacts(updatedContacts);
        saveContacts(updatedContacts);
    };

    const updateContact = async (updatedContact) => {
        const updatedContacts = contacts.map(contact => {
            if (contact.id === updatedContact.id) {
                return updatedContact;
            }
            return contact;
        });
        setContacts(updatedContacts);
        saveContacts(updatedContacts);
    };

    return (
        <AddContactContext.Provider value={{ contacts, addContact, updateContact }}>
            {children}
        </AddContactContext.Provider>
    );
};

export const useAddContact = () => useContext(AddContactContext);
