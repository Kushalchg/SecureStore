import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useAppSelector } from "@/hooks/reduxHooks";
import { Product } from "@/lib/redux/productSlice";



const CartScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { products } = useAppSelector(state => state.products)

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.productImage} />

      <View style={styles.details}>
        <Text style={styles.productName}>{item.title}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
        <Text style={styles.productQuantity}>Qty: 10</Text>
      </View>

      <TouchableOpacity style={styles.removeButton}>
        <Ionicons name="trash-outline" size={20} color={colors.text} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />

      <View style={styles.footer}>
        <Text style={styles.total}>Total: $310</Text>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      fontSize: 22,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 10,
    },
    list: {
      paddingBottom: 20,
    },
    cartItem: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.card,
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 2,
    },
    productImage: {
      width: 60,
      height: 60,
      borderRadius: 8,
    },
    details: {
      flex: 1,
      marginLeft: 10,
    },
    productName: {
      fontSize: 16,
      fontWeight: "500",
      color: colors.text,
    },
    productPrice: {
      fontSize: 14,
      fontWeight: "bold",
      color: colors.primary,
      marginTop: 2,
    },
    productQuantity: {
      fontSize: 12,
      color: colors.text,
      marginTop: 2,
    },
    removeButton: {
      padding: 8,
    },
    footer: {
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingTop: 10,
    },
    total: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 10,
    },
    checkoutButton: {
      backgroundColor: colors.primary,
      padding: 12,
      borderRadius: 8,
      alignItems: "center",
    },
    checkoutText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
    },
  });

export default CartScreen;
