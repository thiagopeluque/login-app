import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from "react-native";

import User from "../services/users";

export default function Register() {
  
  // declaração do useNavigation para "andar" pelas telas do App
  const navigation = useNavigation();

  // Usado o React-Hook-Forms.
  // Declaração das funções do Hook, onde através delas fica mais fácil receber os dados digitados no Form,
  // tratar os erros de digitação e utilização de Máscaras de preenchimento
  const { control, handleSubmit, formState: { errors } } = useForm();

  // Função para tratar receber os dados do Form de Registro de Novos Usuário e enviar para o banco Inserir
  // Após o sucesso da inclusão, retornamos para a tela de Usuários Cadastrados. Em caso de erro, recemos um Alert
  const handleRegister = async (data) => {
	User.create(data)
	.then(() => {
      alert('Usuário Cadastrado com Sucesso');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Users' }],
      });
    })
	.catch(() => { alert("Usuário não foi Cadastrado") })
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>

        <Text>Nome Completo</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.textInput}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="nome"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.nome && <Text style={styles.inputError}>Campo obrigatório preenchimento</Text>}

        <Text>Email</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.textInput}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="email"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.email && <Text style={styles.inputError}>Campo obrigatório preenchimento</Text>}

        <Text>Telefone</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.textInput}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="telefone"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.telefone && <Text style={styles.inputError}>Campo obrigatório preenchimento</Text>}

        <Text>Endereço</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.textInput}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="endereco"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.endereco && <Text style={styles.inputError}>Campo obrigatório preenchimento</Text>}
        
        <Text>Cidade</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.textInput}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="cidade"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.cidade && <Text style={styles.inputError}>Campo obrigatório preenchimento</Text>}

        <Text>Data de Nascimento</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.textInput}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="nascimento"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.nascimento && <Text style={styles.inputError}>Campo obrigatório preenchimento</Text>}

        <Text>Sexo</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.textInput}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="sexo"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.sexo && <Text style={styles.inputError}>Campo obrigatório preenchimento</Text>}

        <Text>CPF</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.textInput}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="cpf"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.cpf && <Text style={styles.inputError}>Campo obrigatório preenchimento</Text>}
        
		  <Text>Usuário</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.textInput}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="usuario"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.usuario && <Text style={styles.inputError}>Campo obrigatório preenchimento</Text>}
		  
		  <Text>Senha</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.textInput}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              secureTextEntry={true}
            />
          )}
          name="password"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.password && <Text style={styles.inputError}>Campo obrigatório preenchimento</Text>}

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(handleRegister)}
        >
          <Text style={styles.textButton}>Registrar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
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
  inputError:{
	  color: 'red',
	  fontSize: 12,
	  marginBottom: 20,
  },
  button: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    padding: 15,
    marginTop: 10,
    backgroundColor: "#034694",
  },
  textButton: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
