import React from 'react';
import { AppLoading } from 'expo'
import { StatusBar } from 'react-native';

import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto'
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu'

import Routes from './src/routes';

export default function App() {

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold
  });

  if(!fontsLoaded){
    return <AppLoading />
  }

  return (
    <>
      <StatusBar
        // Forçando a cor na status bar. Este atributo também recebe ligth-content" deixando branco
        barStyle="dark-content"
        // Funciona apenas para o androide deixando transparente
        backgroundColor="transparent"
        // Funciona apenas no androide. Deixa por cima do conteúdo.
        translucent
      />
      <Routes />
    </>
  );
}
