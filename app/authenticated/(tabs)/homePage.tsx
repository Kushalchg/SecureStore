import React, { useEffect, } from "react";
import { View, Text, FlatList, StyleSheet, BackHandler, Alert } from "react-native";
import { useTheme } from "@react-navigation/native";
import { ExtendedTheme } from "@/constants/CustomTheme";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { addToCart, fetchProducts, Product } from "@/lib/redux/productSlice";
import ProductItem from "@/components/homePage/ProductItem";
import ProductSkeleton from "@/components/Skeleton";
import NoProducts from "@/components/homePage/NoProduct";
import { StatusBar } from "expo-status-bar";
import { shortToast } from "@/utils/Toast";
import { CustomButton } from "@/components/custom/CustomButton";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  const dispatch = useAppDispatch()
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { products, loading, error } = useAppSelector(state => state.products)



  useEffect(() => {
    dispatch(fetchProducts())

    // to prevent user accidental back button press(confirm to exit app)
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      Alert.alert(
        'Exit App',
        'Are you sure you want to exit the app?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Exit',
            style: 'destructive',
            onPress: () => BackHandler.exitApp(),
          },
        ],
        { cancelable: true }
      );
      return true;
    });

    return () => {
      backHandler.remove();
    };
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
          keyExtractor={(_, index) => index.toString()}
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
          //component that will show when there is no product available
          <NoProducts message="No product are currently available to show."
            children={
              (
                <CustomButton style={{ paddingVertical: 8, }} onPress={onRefresh}>
                  <Ionicons name="refresh" size={18} color={colors.blue} />
                  <Text style={styles.refreshButtonText}>Refresh</Text>
                </CustomButton>
              )
            }
          />
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
    refreshButtonText: {
      color: colors.blue,
      fontSize: 12,
      fontFamily: "GroteskBold",
      marginLeft: 5,
    },
  });

export default HomeScreen;
