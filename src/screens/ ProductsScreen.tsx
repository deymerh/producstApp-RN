import React, { useContext, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ProductsContext } from '../context/ProductsContext';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigator/ProductsNavigator';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductsScreen'> { };

export const ProductsScreen = ({ navigation }: Props) => {
  const { products } = useContext(ProductsContext);
  console.log('-------PRODUCTS: ', products)
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity activeOpacity={0.5} style={{ marginRight: 10 }}>
          <Text style={{ color: 'black' }}>Agregar</Text>
        </TouchableOpacity>
      )
    })
  }, []);

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, marginHorizontal: 20 }}>
      <FlatList
        data={products}
        keyExtractor={(p) => p._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('ProductScreen', {
              id: item._id,
              name: item.nombre
            })}
          >
            <Text style={styles.productName}>{item.nombre}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => (
          <View style={styles.itemSeparator} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  productName: {
    fontSize: 20,
    color: 'black'
  },
  itemSeparator: {
    borderBottomWidth: 2,
    marginVertical: 5,
    borderBottomColor: 'rgba(0,0,0,0.5)'
  }
});