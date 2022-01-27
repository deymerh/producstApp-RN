import 'react-native-gesture-handler';

import React from 'react';

import { Navigator } from './src/navigator/Navigator';
import { AuthProvider } from './src/context/AuthContext';

interface AppStateProps {
  children: JSX.Element | JSX.Element[];
}

const AppState = ({ children }: AppStateProps) => {
  return (
    <AuthProvider>
      {children}
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
