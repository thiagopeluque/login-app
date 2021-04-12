import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import User from "../services/users";

export default function App() {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleVerifyLogin = async (data) => {
    User.findByName(data)
      .then(() => {
        navigation.navigate("Users");
      })
      .catch(() => {
        alert("Usuário Inválido");
        console.log(data);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
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
    borderWidth: 1,
    borderColor: "#C9C9C9",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#FFFFFF",
    width: "80%",
    margin: 5,
  },
  inputError: {
    color: "red",
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
    backgroundColor: "#034694",
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
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  textButtonRegister: {
    color: "#000000",
    fontWeight: "bold",
  },
});
