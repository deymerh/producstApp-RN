import React, { useContext, useEffect } from 'react';
import { Button, StyleSheet, Text, TextInput, View, ScrollView, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { Picker } from '@react-native-picker/picker';

import { ProductsStackParams } from '../navigator/ProductsNavigator';
import { useCategories } from '../hooks/useCategories';
import { useForm } from '../hooks/useForm';
import { ProductsContext } from '../context/ProductsContext';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'> { };

export const ProductScreen = ({ route, navigation }: Props) => {
  const { loadProductById, addProduct, updateProduct } = useContext(ProductsContext);
  const { categories, isLoading } = useCategories();
  const { id, name } = route.params;
  const { _id, categoriaId, nombre, img, form, onChange, setFormValue } = useForm({
    _id: id,
    categoriaId: '',
    nombre: name,
    img: ''
  });
  useEffect(() => {
    navigation.setOptions({
      title: (nombre) ? (nombre) : 'Agrega el nombre del producto'
    })
  }, [nombre]);
  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    if (id?.length === 0) return;
    const product = await loadProductById(id!);
    console.log(product)
    setFormValue({
      _id: id,
      categoriaId: product.categoria._id,
      img: product.img || '',
      nombre
    })
  }
  const saveOrUpdate = async () => {
    if (id?.length! > 0) {
      console.log('Estoy actualizando');
      updateProduct(categoriaId, nombre!, id!)
    } else {
      console.log('Estoy guardando');
      const tempCategoryId = categoriaId || categories[0]._id;
      const newProduct = await addProduct(tempCategoryId, nombre!)
      onChange(newProduct._id, '_id');
    }
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Nombre del producto:</Text>
        <TextInput
          placeholder='Nombre del producto'
          style={styles.input}
          value={nombre}
          onChangeText={(value) => onChange(value, 'nombre')}
          placeholderTextColor='rgba(0,0,0,0.2)'
        />
        <Text style={styles.label}>Categoría:</Text>
        <Picker
          selectedValue={categoriaId}
          onValueChange={(value) => onChange(value, 'categoriaId')}
          style={{
            color: 'black',
            marginVertical: 10,
          }}
          dropdownIconColor='black'
          dropdownIconRippleColor='black'
        >
          {
            categories.map((category) => (
              <Picker.Item key={category._id} label={category.nombre} value={category._id} />
            ))
          }
        </Picker>
        <Button
          title='Guardar'
          onPress={saveOrUpdate}
          color='#5856d6'
        />
        {
          (_id?.length! > 0) && (
            <View
              style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, }}
            >
              <View style={{ width: 10 }} />
              <Button
                title='Galeria'
                onPress={() => { }}
                color='#5856d6'
              />
              <View style={{ width: 10 }} />
              <Button
                title='Camara'
                onPress={() => { }}
                color='#5856d6'
              />
            </View>
          )
        }
        {
          (img.length) > 0 &&
          (<Image
            source={{ uri: img }}
            style={{
              width: '100%',
              height: 300
            }}
          />)
        }
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
    color: 'black',
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderColor: 'rgba(0,0,0,0.2)',
    marginTop: 5,
    marginBottom: 15,
    color: 'black'
  }
});