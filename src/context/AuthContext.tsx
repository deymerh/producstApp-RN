import React, { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import cafeApi from '../api/cafeApi';

import { authReducer, AuthState } from './AuthReducer';
import { Usuario, LoginResponse, LoginData, RegisterData, RegisterResponse } from '../interfaces/appInterfaces';

type AuthContextProsp = {
  errorMessage: string;
  token: string | null;
  user: Usuario | null;
  status: 'checking' | 'autenticated' | 'noAutenticated';
  singIn: (obj: LoginData) => void;
  singUp: (obj: RegisterData) => void;
  logOut: () => void;
  removeError: () => void;
}

const authInitialState: AuthState = {
  errorMessage: '',
  token: null,
  user: null,
  status: 'checking',
}

export const AuthContext = createContext({} as AuthContextProsp);

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  useEffect(() => {
    validateCheckToken();
  }, []);

  const validateCheckToken = async () => {
    const token = await AsyncStorage.getItem('token');
    //No token -  No autenticated
    if (!token) return dispatch({ type: 'noAutenticated' });
    //There is token
    const resp = await cafeApi.get('/auth');
    if (resp.status !== 200) {
      return dispatch({ type: 'noAutenticated' });
    }
    dispatch({
      type: 'singUp',
      payload: {
        token: resp.data.token,
        user: resp.data.usuario
      }
    })
  }

  const singIn = async ({ correo, password }: LoginData) => {
    try {
      const { data } = await cafeApi.post<LoginResponse>('/auth/login', { correo, password });
      dispatch({
        type: 'singUp',
        payload: {
          token: data.token,
          user: data.usuario
        }
      })
      await AsyncStorage.setItem('token', data.token)
    } catch (e: any) {
      console.log('ERROR: ', e);
      dispatch({
        type: 'addError',
        payload: e.response.data.msg || 'Información incorrecta'
      })
    }
  }
  const singUp = async ({ nombre, correo, password }: RegisterData) => {
    try {
      const { data } = await cafeApi.post<RegisterResponse>('/usuarios', { nombre, correo, password });
      dispatch({
        type: 'singUp',
        payload: {
          user: data.usuario,
          token: data.token
        }
      })
      await AsyncStorage.setItem('token', data.token)
    } catch (e: any) {
      console.log('ERROR: ', e);
      dispatch({
        type: 'addError',
        payload: e.response.data.errors[0].msg || 'El correo ya existe'
      })
    }
  }
  const logOut = async () => {
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'logout' })
  }
  const removeError = () => {
    dispatch({ type: 'removeError' });
  }
  return (
    <AuthContext.Provider value={{
      ...state,
      singIn,
      singUp,
      logOut,
      removeError,
    }}>
      {children}
    </AuthContext.Provider>
  );
}