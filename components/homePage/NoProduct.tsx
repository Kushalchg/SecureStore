import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { ExtendedTheme } from "@/constants/CustomTheme";


const NoProducts = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <MaterialIcons name="production-quantity-limits" size={48} color={colors.text} />
      <Text style={styles.message}>Opps, No Product to see!!</Text>
    </View>
  );
};

const createStyles = (colors: ExtendedTheme['colors']) =>
  StyleSheet.create({
    container: {
      height: 500,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    message: {
      marginTop: 10,
      fontSize: 16,
      color: colors.text,
      textAlign: "center",
    },
  });

export default NoProducts;
