//|> impotando as dependencias.
import React from 'react';
import {AppLoading} from 'expo';
import {StatusBar } from 'react-native';

//|> Importando as rotas.
import Routes from './src/routes';

export default function App() {

  return (
        <>
          <StatusBar barStyle="dark-content" backgroundColor="transparent" />
          <Routes />
        </>
  );
}
