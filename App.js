import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux'
import Store from './app/shared/store/Store';
import Router from './router';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </Provider>
  );
}
