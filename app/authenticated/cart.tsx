import React, { useMemo } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useAppSelector } from "@/hooks/reduxHooks";
import CartItemComponent from "@/components/cart/CartItem";
import { ExtendedTheme } from "@/constants/CustomTheme";
import { CustomButton } from "@/components/custom/CustomButton";
import NoProducts from "@/components/homePage/NoProduct";


const CartScreen = () => {
  const { cart } = useAppSelector(state => state.products)
  console.log({ cart })
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const totalAmount = useMemo(() => {
    return cart.reduce((acc, item) => {
      acc = acc + (item.quantity * item.price)
      return acc
    }, 0)
  }, [cart])

  const totalQuantity = useMemo(() => {
    return cart.reduce((acc, item) => {
      acc = acc + item.quantity
      return acc
    }, 0)
  }, [cart])

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        renderItem={({ item }) => <CartItemComponent item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<NoProducts message={"Currently you didn't have any product on cart."} />}
      />
      {cart.length > 0 ?
        <View style={styles.footer}>
          <View style={styles.row}>
            <Text style={styles.title}>Total</Text>
            <Text style={styles.value}>NPR {totalAmount.toFixed(2)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Quantity</Text>
            <Text style={styles.value}>{totalQuantity} Items</Text>
          </View>
          <CustomButton style={{ marginTop: 10 }}>
            <Text style={styles.checkoutText}>Processed To Checkout</Text>
          </CustomButton>
        </View> : null}
    </View>
  );
};

const createStyles = (colors: ExtendedTheme['colors']) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    list: {
      paddingBottom: 20,
    },
    footer: {
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingHorizontal: 10,
      paddingVertical: 10,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 10,
      alignItems: 'center',
    },
    title: {
      fontSize: 16,
      fontFamily: 'MontserratMedium',
      color: colors.notification,
    },
    value: {
      fontSize: 16,
      fontFamily: 'MontserratBold',
      color: colors.text,
    },
    checkoutButton: {
      backgroundColor: colors.primary,
      padding: 12,
      borderRadius: 8,
      alignItems: "center",
    },
    checkoutText: {
      fontFamily: "GroteskBold",
      color: colors.blue,
      fontSize: 16,
    },
  });

export default CartScreen;
