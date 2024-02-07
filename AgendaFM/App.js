import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, FlatList, StyleSheet, Alert, StatusBar } from 'react-native';

// Importe suas imagens locais aqui
import imagemArnold from './img/Arnold.png';
import imagemObama from './img/Obama.png';
import imagemDean from './img/Dean.png';
import imagemEriqui from './img/Eriqui.png';
import imagemJoaoPedro from './img/JP.png';
import imagemJoaoVictor from './img/JV.png';
import imagemMaiqui from './img/Maiqui.png';
import imagemPedro from './img/Pedro.png';


const Contatos = [
  { nome: 'Arnold Schwarzenegger', imagem: imagemArnold },
  { nome: 'Barack Obama', imagem: imagemObama },
  { nome: 'Dean Winchester', imagem: imagemDean },
  { nome: 'Eriqui', imagem: imagemEriqui },
  { nome: 'João Pedro', imagem: imagemJoaoPedro },
  { nome: 'João Victor', imagem: imagemJoaoVictor },
  { nome: 'Maiqui', imagem: imagemMaiqui },
  { nome: 'Pedro', imagem: imagemPedro },
];

export default function App() {
  const [search, setSearch] = useState('');

  // Função para lidar com o clique no contato
  const handleContactClick = (nome) => {
    Alert.alert(`Você clicou no contato ${nome}`);
  };

  // Filtrar contatos com base na pesquisa
  const filteredContacts = Contatos.filter(contact =>
    contact.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar/>
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
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>...</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <FlatList
        data={filteredContacts.slice(0)} // Ignorar o primeiro contato (perfil do usuário)
        keyExtractor={(item) => item.nome}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleContactClick(item.nome)}>
            <View style={styles.contactItem}>
              <Image source={item.imagem} style={styles.profilePic} />
              <Text style={styles.contactName}>{item.nome}</Text>
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
    justifyContent: 'center', // Alterado para 'center'
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 30,
    marginBottom: 10, // Adicionado para separar o texto dos botões
  },
  headerButtons: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#000',
    marginHorizontal: 10,
    padding: 15, // Aumentado para 15
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
    justifyContent: 'center', // Alterado para 'center'
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
});
