import React, { useEffect, } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import { ExtendedTheme } from "@/constants/CustomTheme";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { addToCart, fetchProducts, Product } from "@/lib/redux/productSlice";
import ProductItem from "@/components/homePage/ProductItem";
import ProductSkeleton from "@/components/Skeleton";
import NoProducts from "@/components/homePage/NoProduct";
import { StatusBar } from "expo-status-bar";
import { shortToast } from "@/utils/Toast";

const HomeScreen = () => {
  const dispatch = useAppDispatch()
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { products, loading, error } = useAppSelector(state => state.products)


  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product))
    shortToast("Successfully added")
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
