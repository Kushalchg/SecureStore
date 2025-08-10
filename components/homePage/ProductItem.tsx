import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { addToCart, Product } from "@/lib/redux/productSlice";
import { CustomButton } from "../custom/CustomButton";
import { ExtendedTheme } from "@/constants/CustomTheme";

interface Props {
  product: Product;
  onAddToCart?: () => void;
}

const ProductItem: React.FC<Props> = ({ product, onAddToCart }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.productImage} />

      <View style={styles.details}>
        <Text style={styles.productTitle} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.productCategory}>{product.category}</Text>

        <View style={styles.ratingRow}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>
            {product.rating.rate} ({product.rating.count})
          </Text>
        </View>

        <Text style={styles.productPrice}>NPR {product.price}</Text>

        <CustomButton style={{ paddingVertical: 8, }} onPress={onAddToCart}>
          <Ionicons name="cart-outline" size={18} color={colors.blue} />
          <Text style={styles.cartButtonText}>Add to Cart</Text>
        </CustomButton>
      </View>
    </View>
  );
};

const createStyles = (colors: ExtendedTheme['colors']) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      // overflow: "hidden",
      margin: 6,
      paddingTop: 4,
      paddingHorizontal: 4,
      flex: 1,
    },
    productImage: {
      width: "100%",
      height: 150,
      resizeMode: "contain",
    },
    details: {
      padding: 10,
    },
    productTitle: {
      fontSize: 14,
      fontFamily: 'MontserratMedium',
      color: colors.text,
    },
    productCategory: {
      fontSize: 12,
      color: colors.text,
      opacity: 0.6,
      marginBottom: 5,
    },
    ratingRow: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 4,
    },
    ratingText: {
      fontSize: 12,
      fontFamily: "Grotesk",
      color: colors.text,
      marginLeft: 4,
    },
    productPrice: {
      fontSize: 16,
      fontFamily: "GroteskBold",
      color: colors.blue,
      marginVertical: 5,
    },
    cartButtonText: {
      color: colors.blue,
      fontSize: 12,
      fontFamily: "GroteskBold",
      marginLeft: 5,
    },
  });

export default ProductItem;
