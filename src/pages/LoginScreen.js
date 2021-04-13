import { StatusBar } from "expo-status-bar";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { StyleSheet, Text, SafeAreaView, TextInput, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import colors from '../../assets/colors/colors';
import User from "../services/users";

export default function App() {
  
  // declaração do useNavigation para "andar" pelas telas do App
  const navigation = useNavigation();
  
  /* Usado o React-Hook-Forms.
  Declaração das funções do Hook, onde através delas fica mais fácil receber os dados digitados no Form,
  tratar os erros de digitação e utilização de Máscaras de preenchimento */
  const { control, handleSubmit, formState: { errors }} = useForm();

  /* Função de verificação do Login. Recebe os dados do Form. (usuário e senha) e envia o objeto para o Banco
  efetuar a consulta.
  Caso exista, através do React-Navigation o usuário é direcionado para tela de Usuários.
  Caso não exista, É retornado um Alert do Android para o usuário */
  const handleVerifyLogin = async (data) => {
    User.login(data)
      .then(() => {
        navigation.navigate("Users");
      })
      .catch(() => {
        alert("Usuário Inválido");
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Image source={require("../../assets/logo.png")} style={{ width: 150, height: 200 }} resizeMode="contain" />
      
      <Text style={styles.title}> Área do Cliente </Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.textInput}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder="Digite seu Usuário de Acesso"
          />
        )}
        name="usuario"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.usuario && (
        <Text style={styles.inputError}>Campo obrigatório preenchimento</Text>
      )}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.textInput}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder="Digite sua Senha de Acesso"
            secureTextEntry={true}
          />
        )}
        name="password"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.password && (
        <Text style={styles.inputError}>Campo obrigatório preenchimento</Text>
      )}

      <TouchableOpacity style={styles.buttonLogin} onPress={handleSubmit(handleVerifyLogin)}>
        <Text style={styles.textButtonLogin}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonRegister}
        onPress={() => {
          navigation.navigate("Register");
        }}
      >
        <Text style={styles.textButtonRegister}>Registrar-se</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F1F1",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    padding: 10,
    fontWeight: "bold",
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 5,
    padding: 10,
    width: "80%",
    margin: 5,
  },
  inputError: {
    color: colors.error,
    fontSize: 12,
    marginBottom: 20,
  },
  buttonLogin: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    padding: 15,
    marginTop: 10,
    backgroundColor: colors.button
  },
  buttonRegister: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    padding: 15,
    marginTop: 10,
    backgroundColor: "#FFFFFF",
  },
  textButtonLogin: {
    color: colors.textButton,
    fontWeight: "bold",
  },
  textButtonRegister: {
    color: "#000000",
    fontWeight: "bold",
  },
});
