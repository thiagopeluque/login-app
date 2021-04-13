import React from "react";
import RadioButton from "radio-buttons-react-native";
import { useForm, Controller } from "react-hook-form";
import { useRoute, useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from "react-native";

import colors from '../../assets/colors/colors';
import User from "../services/users";

export default function Register() {
  // declaração do useNavigation para "andar" pelas telas do App
  const navigation = useNavigation();

  // Aqui inicializamos o Route (do React-Navigation)
  const route = useRoute();

  // Recebemos os dados vindos da tela UsersScreens e armazenamos na variável "usuarios".
  const usuarios = route.params.usuario;    

  /* Através da variável "usuarios" recebido acima, conseguimos preencher os campos do form.
  Com os campos preenchidos, podemos efetuar alterações nos dados dos usuários cadastrados */
  const loadValues = {
    id: usuarios.id,
    nome: usuarios.nome,
    email: usuarios.email,
    telefone: usuarios.telefone,
    endereco: usuarios.endereco,
    cidade: usuarios.cidade,
    nascimento: usuarios.nascimento,
    sexo: usuarios.sexo,
    cpf: usuarios.cpf,
    usuario: usuarios.usuario,
    password: usuarios.password,
  };

  /* Novamente declaramos as funções do React-Hook-Forms e passamos além delas, os valores
  inciais dos inputs. Sendo assim eles já aparecem preenchidos só necessitando alterar o necessário */
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: loadValues,
  });

  /* Função para tratamento do Update dos dados. A função "handleUpdate" é chamado após clicar no
  botão ATUALIZAR no final do Form. Após a atualização, através do React-Navigation retornamos através
  tela de usuários cadastrados, já com a alteração aplicada. */
  const handleUpdate = async (data) => {
    console.log(data);
    User.update(data).then(() => {
      alert("Usuário Atualizado com Sucesso");
      navigation.reset({
        index: 0,
        routes: [{ name: "Users" }],
      });
    });
  };

  /*
  Dados para o Input Sexo (usado um componente externo visto que o React Native não possui esse tipo de Input)
  Apenas um Array contendo as informações que deverão aparecer no Radio Input
  */
  const sexoRadio = [
    { label: "Masculino" }, { label: "Feminino" }
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
          <Text style={styles.inputError}>Campo obrigatório preenchimento</Text>
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
          <Text style={styles.inputError}>Campo obrigatório preenchimento</Text>
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
          <Text style={styles.inputError}>Campo obrigatório preenchimento</Text>
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
          <Text style={styles.inputError}>Campo obrigatório preenchimento</Text>
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
          <Text style={styles.inputError}>Campo obrigatório preenchimento</Text>
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
          <Text style={styles.inputError}>Campo obrigatório preenchimento</Text>
        )}

        <Text style={styles.title}>Sexo</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <RadioButton
              data={sexoRadio}
              initial={value == 'Masculino' ? 1 : 2}
              onBlur={onBlur}
              selectedBtn={(value) => onChange(value)}
            />
          )}
          name="sexo"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.sexo && (
          <Text style={styles.inputError}>Campo obrigatório preenchimento</Text>
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
          <Text style={styles.inputError}>Campo obrigatório preenchimento</Text>
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
          <Text style={styles.inputError}>Campo obrigatório preenchimento</Text>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(handleUpdate)}
        >
          <Text style={styles.textButton}>Atualizar</Text>
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
    color: "red",
    fontSize: 12,
    marginBottom: 20,
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
