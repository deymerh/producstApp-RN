import 'react-native-gesture-handler';

import React from 'react';

import { Navigator } from './src/navigator/Navigator';
import { AuthProvider } from './src/context/AuthContext';
import { ProductsContextProvider } from './src/context/ProductsContext';

interface AppStateProps {
  children: JSX.Element | JSX.Element[];
}

const AppState = ({ children }: AppStateProps) => {
  return (
    <AuthProvider>
      <ProductsContextProvider>
        {children}
      </ProductsContextProvider>
    </AuthProvider>
  )
}

const App = () => {
  return (
    <AppState>
      <Navigator />
    </AppState>
  )
};
export default App
