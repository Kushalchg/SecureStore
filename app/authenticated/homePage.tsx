import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { ExtendedTheme } from "@/constants/CustomTheme";
import { CustomButton } from "@/components/custom/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchProducts, Product } from "@/lib/redux/productSlice";
import ProductItem from "@/components/homePage/ProductItem";
import ProductSkeleton from "@/components/Skeleton";
import NoProducts from "@/components/homePage/NoProduct";
import { StatusBar } from "expo-status-bar";

interface DummyProductType {
  id: string;
  name: string;
  price: string;
  image: string;
}


const dummyProducts: DummyProductType[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: "$120",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: "$95",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "3",
    name: "Gaming Mouse",
    price: "$45",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "4",
    name: "Laptop Bag",
    price: "$65",
    image: "https://via.placeholder.com/150",
  },
];

const HomeScreen = () => {
  const dispatch = useAppDispatch()
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { products, cart, loading, error } = useAppSelector(state => state.products)


  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  console.log({ products })

  const handleAddToCart = (product: Product) => {
    console.log("Added to cart:", product);
  };

  const onRefresh = () => {
    dispatch(fetchProducts())
  }



  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.background,
        }}
      >
        <Text style={{ color: colors.text, fontSize: 16 }}>{error}</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <FlatList
          data={[1, 1, 1, 1, 1, 1, 1, 1, 1]}
          renderItem={() => <ProductSkeleton />}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={styles.productList}
          showsVerticalScrollIndicator={false}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        data={products}
        refreshing={loading}
        onRefresh={onRefresh}
        renderItem={({ item }) => (
          <ProductItem product={item} onAddToCart={() => handleAddToCart(item)} />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() =>
          <NoProducts />
        }
      />
    </View>
  );
};

const createStyles = (colors: ExtendedTheme['colors']) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 10,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 15,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text,
    },
    productList: {
      marginTop: 10,
      paddingBottom: 20,
    },
  });

export default HomeScreen;
