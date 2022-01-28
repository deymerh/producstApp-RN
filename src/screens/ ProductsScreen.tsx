import React, { useContext } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ProductsContext } from '../context/ProductsContext';

export const ProductsScreen = () => {
  const { products } = useContext(ProductsContext);
  console.log('-------PRODUCTS: ', products)
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, marginHorizontal: 20 }}>
      <FlatList
        data={products}
        keyExtractor={(p) => p._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.5}
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