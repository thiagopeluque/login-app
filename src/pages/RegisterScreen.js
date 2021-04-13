import React from "react";
import RadioButton from "radio-buttons-react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from "react-native";

import colors from '../../assets/colors/colors';
import User from "../services/users";

export default function Register() {
  
  // declaração do useNavigation para "andar" pelas telas do App
  const navigation = useNavigation();

  /* Usado o React-Hook-Forms.
  Declaração das funções do Hook, onde através delas fica mais fácil receber os dados digitados no Form,
  tratar os erros de digitação e utilização de Máscaras de preenchimento */
  const { control, handleSubmit, formState: { errors } } = useForm();

  /* Função para tratar receber os dados do Form de Registro de Novos Usuário e enviar para o banco Inserir
  Após o sucesso da inclusão, retornamos para a tela de Usuários Cadastrados. Em caso de erro, recemos um Alert */
  const handleRegister = async (data) => {
    console.log(data);
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

  /*
  Dados para o Input Sexo (usado um componente externo visto que o React Native não possui esse tipo de Input)
  Apenas um Array contendo as informações que deverão aparecer no Radio Input
  */
 const sexoRadio = [
   { label: "Masculino" },{ label: "Feminino" }
 ];

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Nome Completo</Text>
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
        {errors.nome && (
          <Text style={styles.inputError}>
            Por favor, preencha com seu Nome
          </Text>
        )}

        <Text style={styles.title}>Email</Text>
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
        {errors.email && (
          <Text style={styles.inputError}>
            Preencha com seu email Principal
          </Text>
        )}

        <Text style={styles.title}>Telefone</Text>
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
        {errors.telefone && (
          <Text style={styles.inputError}>
            Preencha com um Telefone, preferimos um contato Whatsapp
          </Text>
        )}

        <Text style={styles.title}>Endereço</Text>
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
        {errors.endereco && (
          <Text style={styles.inputError}>
            Preencha seu Endereço Residencial
          </Text>
        )}

        <Text style={styles.title}>Cidade</Text>
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
        {errors.cidade && (
          <Text style={styles.inputError}>
            Preencha com a cidade que mora atualmente
          </Text>
        )}

        <Text style={styles.title}>Data de Nascimento</Text>
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
        {errors.nascimento && (
          <Text style={styles.inputError}>
            Preencha com sua data de Nascimento
          </Text>
        )}

        <Text style={styles.title}>Sexo</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <RadioButton
              data={sexoRadio}
              onBlur={onBlur}
              selectedBtn={(value) => onChange(value)}
              value={value}
            />
          )}
          name="sexo"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.sexo && (
          <Text style={styles.inputError}>Preencha com seu sexo</Text>
        )}

        <Text style={styles.title}>CPF</Text>
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
        {errors.cpf && (
          <Text style={styles.inputError}>
            Preencha o campo com seu numero de CPF
          </Text>
        )}

        <Text style={styles.title}>Usuário</Text>
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
        {errors.usuario && (
          <Text style={styles.inputError}>
            Preencha com o nome de usuário escolhido (sem espaços e em letras
            minúsculas)
          </Text>
        )}

        <Text style={styles.title}>Senha</Text>
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
        {errors.password && (
          <Text style={styles.inputError}>Preencha com uma senha pessoal</Text>
        )}

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
    width: "100%",
    padding: 20
  },
  title:{
    marginTop: 1,
    paddingLeft: 5,
    fontSize: 14,
    fontWeight: "bold",
    width: '100%'
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: "#C9C9C9",
    borderRadius: 5,
    paddingLeft: 5,
    width: "100%",
    marginBottom: 15,
  },
  inputError: {
    color: colors.error,
    fontSize: 12,
    marginBottom: 20,
    lineHeight: 15
  },
  button: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    padding: 15,
    marginTop: 10,
    backgroundColor: colors.button,
  },
  textButton: {
    color: colors.textButton,
    fontWeight: "bold",
  },
});
