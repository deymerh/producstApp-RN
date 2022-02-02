import React, { useContext, useEffect, useState } from 'react';
import { FlatList, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ProductsContext } from '../context/ProductsContext';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigator/ProductsNavigator';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductsScreen'> { };

export const ProductsScreen = ({ navigation }: Props) => {
  const { products, loadProducts } = useContext(ProductsContext);
  const [refresing, setRefresing] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.5}
          style={{ marginRight: 10 }}
          onPress={() => navigation.navigate('ProductScreen', {})}
        >
          <Text style={{ color: 'black' }}>Agregar</Text>
        </TouchableOpacity>
      )
    })
  }, []);
  const loadProductsFromBacked = async () => {
    console.log('Cargando...');
    setRefresing(true);
    await loadProducts();
    setRefresing(false);
    console.log('Carga terminada...');
  }
  return (
    <View style={{ flex: 1, marginHorizontal: 20 }}>
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
        refreshControl={
          <RefreshControl
            refreshing={refresing}
            onRefresh={loadProductsFromBacked}
          // progressViewOffset={10}
          // progressBackgroundColor={'rgba(0,0,0,0.2)'}
          // colors={['white', '#5856d6']}
          // tintColor={'black'} // Solo para IOS
          // title='Refresing...'
          // titleColor={'black'}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  productName: {
    fontSize: 18,
    color: 'black'
  },
  itemSeparator: {
    borderBottomWidth: 1,
    marginVertical: 5,
    borderBottomColor: 'rgba(0,0,0,0.5)'
  }
});