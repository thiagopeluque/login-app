import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import User from '../services/users';

export default function Users() {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers([]);
    User.all()
      .then((resolve) => setUsers(resolve))
  }, [])

  const handleDelete = (data) => {
    Alert.alert(
      "Exclusão de Usuários",
      `Deseja realmente excluir esse Usuário?`,
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { text: "Excluir", onPress: () => {
          User.remove(data)
          .then((resolve)=>{
            alert(`Usuário com excluído com Sucesso`);
            navigation.reset({
              index: 0,
              routes: [{ name: 'Users' }],
            });
          })
        }}
      ]
    );
  }

  const handleUpdate = (data) => {
    User.find(data)
    .then((resolve)=> {
      navigation.navigate('Details', {usuario: resolve});
    })
  }
  

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark"/>
        <StatusBar style="dark" />
            <TouchableOpacity
                style={styles.buttonRegister}
                onPress={() => {
                navigation.navigate("Register");
            }}
            >
            <Text style={styles.textButtonRegister}>Registrar Novos Usuários</Text>
        </TouchableOpacity>
      
        <FlatList
          style={styles.userList}
          data={users}
          renderItem={({item}) => {
            return(
              <SafeAreaView style={styles.buttonUser}>
                <TouchableOpacity onPress={()=>handleUpdate(item.id)}>
                  <Text style={styles.userName}>{item.nome}</Text>
                  <Text style={styles.userAddress}>{item.endereco} - {item.cidade}</Text>
                  <Text style={styles.userAddress}>Email : {item.email}</Text>
                  <Text style={styles.userAddress}>Usuário : {item.usuario}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>handleDelete(item.id)}>
                  <Text style={styles.deleteButton}>X</Text>
                </TouchableOpacity>
              </SafeAreaView>
            )
          }}
          keyExtractor={(item) => item.id.toString()}
       />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#F1F1F1',
  },
  userList:{
    flex: 1,
    width: '90%',
  },
  buttonUser: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: 'row',
    width: "100%",
    borderRadius: 5,
    padding: 15,
    marginTop: 10,
    backgroundColor: "#FFF",
  },
  deleteButton:{
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: '#FF2149',
    width:30,
    height: 30,
    color: '#FFFFFF',
    borderRadius: 10,
    fontSize: 18,
    fontWeight: 'bold',

  },
  userName:{
    fontWeight: "bold",
    fontSize: 18,
  },
  userAddress:{
    fontSize: 13
  },
  buttonRegister: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    padding: 15,
    marginTop: 10,
    backgroundColor: "#A5A5A5",
  },
  textButtonRegister: {
    color: "#000000",
    fontWeight: "bold",
  },
});
