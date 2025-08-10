import React, { ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { ExtendedTheme } from "@/constants/CustomTheme";
import { CustomButton } from "../custom/CustomButton";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { fetchProducts } from "@/lib/redux/productSlice";


const NoProducts = ({ message, children }: { message: string, children?: ReactNode }) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch()
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <MaterialIcons name="production-quantity-limits" size={48} color={colors.text} />
      <Text style={styles.message}>{message}</Text>
      <View style={{ marginTop: 20, }}>
        {children && (
          children
        )}

      </View>
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
      width: '60%',
      color: colors.muted,
      textAlign: "center",
    },
  });

export default NoProducts;
