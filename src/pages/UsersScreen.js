import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, SafeAreaView, FlatList, TouchableOpacity, Alert, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

import colors from '../../assets/colors/colors';
import User from "../services/users";

export default function Users() {
  const navigation = useNavigation();

  // Declaração das States
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  /*  useEffect() é sempre executado no Inicio do Aplicativo. Nesse caso sempre que logado,
  e o campo de Buscar estiver vazio, ele retorna todos os usuários do Banco de Dados.  */ 
  useEffect(() => {
    if (searchTerm == '') {
      setUsers([]);
      allUsers();
    } 
  // Sempre que o conteudo do campo Busca for alterado, ele re-executa a chamada do useEffect
  }, [searchTerm]);

  // Função para Lista todos os Usuários do Banco de Dados
  const allUsers = () => {
    User.all().then((resolve) => setUsers(resolve));
  };

  /* Função que trata o update dos dados dos Usuários
  Faz a busca pelo usuário clicado através do ID e retorna os dados e envia o objeto para
  outra Tela do App através do Route do React-Navigation */
  const handleUpdate = (data) => {
    User.findtoUpdate(data)
    .then((resolve) => {
      navigation.navigate("Details", { usuario: resolve });
    });
  };

  /* Função que trata a alteração do state de Busca de usuários "searchTerm" e seta o valor que
  será usado na busca para criar a listagem já filtrada e exibir na tela */
  const handleSearch = () => {
    User.findByName(searchTerm)
    .then((resolve) => {
      setUsers(resolve);
    })
    .catch((resolve)=>{alert(resolve)})
  };
  
  /* Alert de Exclusão de Usuário, caso deseje excluir 
  faz a chamada da função remove e deleta do Banco de Dados */
  const handleDelete = (data) => {
    Alert.alert(
      "Exclusão de Usuários",
      `Deseja realmente excluir esse Usuário?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          onPress: () => {
            User.remove(data).then((resolve) => {
              alert(`Usuário com excluído com Sucesso`);
              navigation.reset({
                index: 0,
                routes: [{ name: "Users" }],
              });
            });
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <TouchableOpacity
        style={styles.buttonRegister}
        onPress={() => {
          navigation.navigate("Register");
        }}
      >
        <Text style={styles.textButtonRegister}>Registrar Novos Usuários</Text>
      </TouchableOpacity>

      {/* Área de Busca de Usuários */}
      <SafeAreaView style={styles.searchContainer}>
        <TextInput
          placeholder="Buscar"
          style={styles.searchInput}
          onChangeText={(e)=>setSearchTerm(e)}
        />
        <TouchableOpacity
          style={styles.buttonSearch}
          onPress={handleSearch}
        >
          <Text>Buscar</Text>
        </TouchableOpacity>
      </SafeAreaView>  
      {/* Fim Área de Busca de Usuários */}

      {/* Listagem dos Usuários - utiliza a lista criada no State "users" */}
      <FlatList
        style={styles.userList}
        data={users}
        renderItem={({ item }) => {
          return (
            <SafeAreaView style={styles.buttonUser}>
              <TouchableOpacity onPress={() => handleUpdate(item.id)}>
                <Text style={styles.userName}>{item.nome}</Text>
                <Text style={styles.userAddress}>
                  {item.endereco} - {item.cidade}
                </Text>
                <Text style={styles.userAddress}>Email : {item.email}</Text>
                <Text style={styles.userAddress}>Sexo : {item.sexo}</Text>
                <Text style={styles.userAddress}>Usuário : {item.usuario}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={styles.deleteButton}>X</Text>
              </TouchableOpacity>
            </SafeAreaView>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
      />
      {/* Fim da Listagem de Usuários */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
  },
  searchContainer:{
    flexDirection: "row",    
    alignItems: "center",
  },
  userList: {
    flex: 1,
    width: "90%",
  },
  buttonUser: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    borderRadius: 5,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderColor: colors.userBorder,
    padding: 15,
    marginTop: 10,
    backgroundColor: "#FFF",
  },
  buttonSearch: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  },
  deleteButton: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: "#FF2149",
    width: 30,
    height: 30,
    color: "#FFFFFF",
    borderRadius: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  searchInput: {
    borderBottomWidth: 1,
    borderColor: "#C9C9C9",
    borderRadius: 5,
    padding: 10,
    width: "70%",
    margin: 5,
    color: '#000'
  },
  userName: {
    fontWeight: "bold",
    fontSize: 18,
  },
  userAddress: {
    fontSize: 13,
  },
  buttonRegister: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    padding: 15,
    marginTop: 10,
    backgroundColor: colors.button,
  },
  textButtonRegister: {
    color: colors.textButton,
    fontWeight: "bold",
  },
});
