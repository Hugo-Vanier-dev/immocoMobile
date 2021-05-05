import React from 'react';
import { Provider } from 'react-redux'
import store from './app/store/store';
import Router from './router'; 

export default function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}
