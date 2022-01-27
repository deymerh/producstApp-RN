import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { WhiteLogo } from '../components/WhiteLogo';
import { useForm } from '../hooks/useForm';
import { loginStyles } from '../theme/loginTheme';

interface Props extends StackScreenProps<any, any> { };

export const RegisterScreen = ({ navigation }: Props) => {
  const { singUp, errorMessage, removeError } = useContext(AuthContext);
  const { email, password, onChange, name } = useForm({
    name: '',
    email: '',
    password: ''
  });
  const register = () => {
    Keyboard.dismiss();
    singUp({ correo: email, nombre: name, password });
  }
  useEffect(() => {
    if (errorMessage.length === 0) return;
    Alert.alert('Registro incorrecto', errorMessage, [{ text: 'Ok', onPress: removeError }])
  }, [errorMessage]);
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: '#5856d6', }}
        behavior={(Platform.OS === 'ios' ? 'padding' : 'height')}
      >
        <View style={loginStyles.fonmContainer}>
          <WhiteLogo />
          <Text style={loginStyles.title}>Registro</Text>
          <Text style={loginStyles.label}>Nombre</Text>
          <TextInput
            placeholder='Ingrese su nombre:'
            placeholderTextColor='rgba(255, 255, 255, 0.4)'
            keyboardType='email-address'
            underlineColorAndroid='white'
            selectionColor='white'
            autoCapitalize='none'
            autoCorrect={false}
            style={[
              loginStyles.inputField,
              (Platform.OS === 'ios') && loginStyles.inputFiledIOS
            ]}
            onChangeText={(value) => onChange(value, 'name')}
            value={name}
            onSubmitEditing={register}
          />
          <Text style={loginStyles.label}>Email</Text>
          <TextInput
            placeholder='Ingrese su correo:'
            placeholderTextColor='rgba(255, 255, 255, 0.4)'
            keyboardType='email-address'
            underlineColorAndroid='white'
            selectionColor='white'
            autoCapitalize='none'
            autoCorrect={false}
            style={[
              loginStyles.inputField,
              (Platform.OS === 'ios') && loginStyles.inputFiledIOS
            ]}
            onChangeText={(value) => onChange(value, 'email')}
            value={email}
            onSubmitEditing={register}
          />
          <Text style={loginStyles.label}>Contraseña</Text>
          <TextInput
            placeholder='*********'
            placeholderTextColor='rgba(255, 255, 255, 0.4)'
            underlineColorAndroid='white'
            selectionColor='white'
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry
            style={[
              loginStyles.inputField,
              (Platform.OS === 'ios') && loginStyles.inputFiledIOS
            ]}
            onChangeText={(value) => onChange(value, 'password')}
            value={password}
            onSubmitEditing={register}
          />
          <View style={loginStyles.btnContainer}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={loginStyles.button}
              onPress={register}
            >
              <Text style={loginStyles.buttonText}>Crear cuenta</Text>
            </TouchableOpacity>
          </View>
          <View style={loginStyles.btnNewUserContainer}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.replace('LoginScreen')}
            >
              <Text style={loginStyles.buttonNewUserText}>Iniciar sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  )
};
