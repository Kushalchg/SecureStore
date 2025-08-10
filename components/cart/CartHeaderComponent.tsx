import React from "react";
import { View, TouchableOpacity, StyleSheet, Text, Alert } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { ExtendedTheme } from "@/constants/CustomTheme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { clearCart } from "@/lib/redux/productSlice";
import { shortToast } from "@/utils/Toast";


const CartHeaderComponent = () => {
  const dispatch = useAppDispatch()
  const { colors } = useTheme();
  const { top } = useSafeAreaInsets()
  const styles = createStyles(colors);
  const { cart } = useAppSelector(state => state.products)
  const onCartClear = () => {
    if (cart.length > 0) {

      Alert.alert(
        "Clear Cart",
        "Are you sure to clear all items from cart?",
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Ok', style: 'destructive', onPress: () => dispatch(clearCart()) },
        ]

      );
    } else {
      shortToast("Didn't have any item in cart to clear.")
    }
  }

  return (
    <View style={[styles.container, { paddingTop: top + 10 }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => console.log("pressed")}>
        </TouchableOpacity>
        <Text style={styles.titleText}>
          My Cart
        </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>


        <TouchableOpacity onPress={onCartClear} style={[styles.cartButton]}>
          <View style={styles.cartIconContainer}>
            <Feather name="trash-2" size={24} color={colors.text} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const createStyles = (colors: ExtendedTheme["colors"]) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      padding: 10,

    },
    profileImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    titleText: {
      marginLeft: 10,
      fontFamily: "GroteskBold",
      color: colors.text,
      fontSize: 20,
    },
    cartButton: {
      padding: 6,
    },
    cartIconContainer: {
      position: 'relative',
    },
    badge: {
      position: 'absolute',
      top: -8,
      right: -8,
      backgroundColor: colors.blue,
      borderRadius: 10,
      minWidth: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 4,
    },
    badgeText: {
      color: 'white',
      fontSize: 12,
      fontFamily: 'SpaceMono',
      fontWeight: 'bold',
      textAlign: 'center',
    },

  });

export default CartHeaderComponent;
