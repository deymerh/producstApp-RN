import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { Picker } from '@react-native-picker/picker';

import { ProductsStackParams } from '../navigator/ProductsNavigator';
import { useCategories } from '../hooks/useCategories';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'> { };

export const ProductScreen = ({ route, navigation }: Props) => {
  const { categories, isLoading } = useCategories();
  const [selectedLanguage, setSelectedLanguage] = useState();
  const { id, name } = route.params;
  useEffect(() => {
    navigation.setOptions({
      title: (name) ? (name) : 'Nuevo producto'
    })
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Nombre del producto:</Text>
        <TextInput
          placeholder='Nombre del producto'
          style={styles.input}
        // value={}
        // onChange={}
        />
        <Text style={styles.label}>Categoría:</Text>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }
          style={{ color: 'black' }}
        >
          {
            categories.map((category) => (
              <Picker.Item key={category._id} label={category.nombre} value={category._id} />
            ))
          }
        </Picker>
        <View
          style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}
        >
          <Button
            title='Guardar'
            onPress={() => { }}
            color='#5856d6'
          />
          <View style={{ width: 10 }} />
          <Button
            title='Galeria'
            onPress={() => { }}
            color='#5856d6'
          />

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1
  },
  label: {
    fontSize: 18,
    color: 'black'
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderColor: 'rgba(0,0,0,0.2)',
    marginTop: 5,
    marginBottom: 15,
  }
});