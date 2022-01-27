import React, { useContext, useEffect } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { Background } from '../components/Background';
import { WhiteLogo } from '../components/WhiteLogo';
import { loginStyles } from '../theme/loginTheme';
import { useForm } from '../hooks/useForm';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> { };

export const LoginScreen = ({ navigation }: Props) => {
  const { singIn, removeError, errorMessage } = useContext(AuthContext);
  const { email, password, onChange } = useForm({
    email: '',
    password: ''
  });
  const onLogin = () => {
    Keyboard.dismiss();
    singIn({ correo: email, password });
  }
  useEffect(() => {
    if (errorMessage.length === 0) return;
    Alert.alert('Login incorrecto', errorMessage, [{ text: 'Ok', onPress: removeError }])
  }, [errorMessage]);

  return (
    <>
      <Background />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={(Platform.OS === 'ios' ? 'padding' : 'height')}
      >
        <View style={loginStyles.fonmContainer}>
          <WhiteLogo />
          <Text style={loginStyles.title}>Login</Text>
          <Text style={loginStyles.label}>Email</Text>
          <TextInput
            placeholder='Ingrese su Email:'
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
            onSubmitEditing={onLogin}
          />
          <Text style={loginStyles.label}>Contraseña</Text>
          <TextInput
            placeholder='*********'
            placeholderTextColor='rgba(255, 255, 255, 0.4)'
            underlineColorAndroid='white'
            selectionColor='white'
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry={false}
            style={[
              loginStyles.inputField,
              (Platform.OS === 'ios') && loginStyles.inputFiledIOS
            ]}
            onChangeText={(value) => onChange(value, 'password')}
            value={password}
            onSubmitEditing={onLogin}
          />
          <View style={loginStyles.btnContainer}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={loginStyles.button}
              onPress={onLogin}
            >
              <Text style={loginStyles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={loginStyles.btnNewUserContainer}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.replace('RegisterScreen')}
            >
              <Text style={loginStyles.buttonNewUserText}>Nueva cuenta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  )
};
