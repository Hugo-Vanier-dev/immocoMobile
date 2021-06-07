import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux'
import Store from './app/shared/store/Store';
import Router from './router';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components'
import { ToastProvider } from 'react-native-styled-toast'
import toasterTheme from './app/shared/theme/toasterTheme';

export default function App() {
  return (
    <ThemeProvider theme={toasterTheme}>
      <ToastProvider>
        <Provider store={Store}>
          <NavigationContainer>
            <Router />
          </NavigationContainer>
        </Provider>
      </ToastProvider>
    </ThemeProvider>
  );
}


