import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAddContact } from './page_4';

const EditContactScreen = () => {
    const { updateContact } = useAddContact();
    const navigation = useNavigation();
    const route = useRoute();
    const { contact } = route.params;

    const [name, setName] = useState(contact ? contact.nome : '');
    const [phone, setPhone] = useState(contact ? contact.telefone : '');
    const [email, setEmail] = useState(contact ? contact.email : '');
    const [group, setGroup] = useState(contact ? contact.grupos : '');
    const [color, setColor] = useState(contact ? contact.imagem : 'gray');

    const saveContact = () => {
        // Verifica se o contato existe
        if (!contact) {
            return;
        }

        // Atualiza o contato existente com os novos dados
        const updatedContact = {
            ...contact,
            nome: name,
            telefone: phone,
            email: email,
            grupos: group,
            imagem: color
        };
        updateContact(updatedContact);
        navigation.goBack();
    };

    const handleCancel = () => {
        navigation.goBack();
    };

    const colors = ['white', 'red', 'green', 'blue', 'pink', 'lime', 'gray', 'yellow'];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Editar Contato</Text>
            <Input
                placeholder='Nome'
                placeholderTextColor='white'
                inputStyle={{ color: 'white' }}
                leftIcon={{ type: 'font-awesome', name: 'user', color: 'white' }}
                value={name}
                onChangeText={setName}
            />
            <Input
                placeholder='Telefone'
                placeholderTextColor='white'
                inputStyle={{ color: 'white' }}
                leftIcon={{ type: 'font-awesome', name: 'phone', color: 'white' }}
                value={phone}
                onChangeText={setPhone}
            />
            <Input
                placeholder='E-mail'
                placeholderTextColor='white'
                inputStyle={{ color: 'white' }}
                leftIcon={{ type: 'font-awesome', name: 'envelope', color: 'white' }}
                value={email}
                onChangeText={setEmail}
            />
            <Input
                placeholder='Grupos'
                placeholderTextColor='white'
                inputStyle={{ color: 'white' }}
                leftIcon={{ type: 'font-awesome', name: 'users', color: 'white' }}
                value={group}
                onChangeText={setGroup}
            />
            <Text style={styles.label}>Cor do Perfil</Text>
            <View style={styles.colorsContainer}>
                {colors.map((colorOption, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.colorOption, { backgroundColor: colorOption, borderWidth: color === colorOption ? 2 : 0, borderColor: 'white' }]}
                        onPress={() => setColor(colorOption)}
                    />
                ))}
            </View>
            <Button title="Cancelar" type="outline" titleStyle={{ color: 'white' }} onPress={handleCancel} buttonStyle={styles.button} containerStyle={styles.buttonContainer} />
            <Button title="Salvar" titleStyle={{ color: 'white' }} onPress={saveContact} buttonStyle={styles.button} containerStyle={styles.buttonContainer} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    colorsContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    colorOption: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginHorizontal: 5,
    },
    button: {
        width: '100%',
        borderRadius: 50,
    },
    buttonContainer: {
        width: '80%',
        marginTop: 10,
    },
});

export default EditContactScreen;
