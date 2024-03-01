import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet, StatusBar, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { useAddContact } from './page_4';

export default function Screen1() {
    const navigation = useNavigation()
    const { addContact, contacts } = useAddContact(); // Obtenha os contatos do contexto
    const [search, setSearch] = useState('');
    const [localContacts, setLocalContacts] = useState(contacts); // Use localContacts para exibir na FlatList

    const route = useRoute();

    const handleAddPress = () => {
        navigation.navigate('addContact');
    };

    useEffect(() => {
        setLocalContacts(contacts); // Atualize localContacts quando os contatos mudarem
    }, [contacts]);

    const handleEditPress = (contact) => {
        navigation.navigate('editContact', { contact });
    };

    const handleDeletePress = (contact) => {
        const updatedContacts = localContacts.filter(c => c !== contact); // Atualize localContacts
        setLocalContacts(updatedContacts);
    }

    const handleUpdateContact = (oldContact, updatedContact) => {
        const updatedContacts = localContacts.map(contact =>
            contact === oldContact ? updatedContact : contact
        );
        setLocalContacts(updatedContacts); // Atualize localContacts
    };

    const filteredContacts = localContacts.filter(contact =>
        contact.nome.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <StatusBar />
            <TextInput
                placeholder="Pesquisar..."
                placeholderTextColor="#fff"
                style={styles.searchBar}
                value={search}
                onChangeText={setSearch}
            />
            {search === '' && (
                <View style={styles.header}>
                    <Text style={styles.headerText}>Contatos</Text>
                    <View style={styles.headerButtons}>
                        <TouchableOpacity style={styles.button} onPress={handleAddPress}>
                            <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            <FlatList
                data={filteredContacts.slice(0)}
                keyExtractor={(item) => item.nome}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('editContact', { contact: item, handleUpdateContact });
                        }}
                    >
                        <View style={styles.contactItem}>
                            <View style={[styles.profilePic, { backgroundColor: item.imagem }]} />
                            <Text style={styles.contactName}>{item.nome}</Text>
                            <View style={styles.icons}>
                                <FontAwesome name="pencil" size={24} color="white" onPress={() => handleEditPress(item)} />
                                <FontAwesome name="trash" size={24} color="white" onPress={() => handleDeletePress(item)} />
                                <FontAwesome name="ellipsis-v" size={24} color="white" onPress={() => {}} />
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
            <View style={styles.navBar}>
                <TouchableOpacity style={styles.navButton}>
                    <Text style={styles.navButtonText}>Recentes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton}>
                    <Text style={styles.navButtonText}>Teclado</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton}>
                    <Text style={styles.navButtonText}>Contatos</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 10,
    },
    searchBar: {
        color: '#fff',
        marginBottom: 10,
        borderRadius: 5,
        padding: 5,
        backgroundColor: '#000',
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    headerText: {
        color: '#fff',
        fontSize: 30,
        marginBottom: 10,
    },
    headerButtons: {
        flexDirection: 'row',
    },
    button: {
        backgroundColor: '#000',
        marginHorizontal: 10,
        padding: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    profilePic: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    contactName: {
        color: '#fff',
        fontSize: 16,
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        bottom: 0,
        width: '100%',
        backgroundColor: '#000',
        padding: 0,
    },
    navButton: {
        backgroundColor: '#000',
        padding: 20,
        borderRadius: 5,
    },
    navButtonText: {
        color: '#fff',
    },
    icons: {
        flexDirection: 'row',
        width: 100,
        justifyContent: 'space-between',
    },
});
