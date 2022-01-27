import React, { useContext } from 'react';
import { Button, Text, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export const ProtectedScreen = () => {
  const { user, token, logOut } = useContext(AuthContext);
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <Text style={{ color: 'black' }}>ProtectedScreen</Text>
      <Button
        title='logout'
        color='#5856d6'
        onPress={logOut}
      />
      <Text style={{ color: 'black' }}>
        Usuario {JSON.stringify(user, null, 2)}
      </Text>
      <Text style={{ color: 'black', paddingHorizontal: 20 }}>
        Token: {JSON.stringify(token, null, 2)}
      </Text>
    </View>
  )
};
