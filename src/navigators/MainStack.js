import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const MainStack = createStackNavigator();

// Importação das Telas para ser usada no Stack
import LoginScreen from '../pages/LoginScreen';
import UsersScreen from '../pages/UsersScreen';
import RegisterScreen from '../pages/RegisterScreen';
import DetailsScreen from '../pages/DetailsScreen';

export default () => {
   return (
     
    // Criação do Stack de Telas do React-Navigation
     <MainStack.Navigator>
       <MainStack.Screen
         name="Login"
         component={LoginScreen}
         options={{headerShown: false}}
       />
       <MainStack.Screen
         name="Users"
         component={UsersScreen}
         options={{headerShown: true, title: 'Usuários Cadastrados'}}
       />
       <MainStack.Screen
         name="Register"
         component={RegisterScreen}
         options={{headerShown: true, title: 'Registrar Usuários'}}
       />
       <MainStack.Screen
         name="Details"
         component={DetailsScreen}
         options={{headerShown: true, title: 'Detalhes'}}
       />
     </MainStack.Navigator>
   );
}