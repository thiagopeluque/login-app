import React from 'react';
import {  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import MainStack from './src/navigators/MainStack';

export default function App() {

  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}