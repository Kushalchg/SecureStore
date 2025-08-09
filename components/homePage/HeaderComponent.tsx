import React from "react";
import { View, Image, TouchableOpacity, StyleSheet, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { ExtendedTheme } from "@/constants/CustomTheme";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HeaderProps {
  profileImage?: string;
  onCartPress?: () => void;
  cartItemCount?: number; // Add cart item count prop
}

const HeaderComponent = ({ cartItemCount = 2 }: HeaderProps) => {
  const { colors } = useTheme();
  const { top, bottom } = useSafeAreaInsets()
  const styles = createStyles(colors);
  const onCartPress = () => {
    router.push("/authenticated/cart")
  }

  return (
    <View style={[styles.container, { paddingTop: top + 10 }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => console.log("pressed")}>
          <Image
            source={{ uri: 'https://picsum.photos/id/237/200/300' }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text style={styles.titleText}>
          Secure Store
        </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>

        <TouchableOpacity onPress={onCartPress} style={[styles.cartButton, { marginRight: 15 }]}>
          <View style={styles.cartIconContainer}>
            <Ionicons name="search" size={24} color={colors.text} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={onCartPress} style={[styles.cartButton]}>
          <View style={styles.cartIconContainer}>
            <Ionicons name="notifications-outline" size={24} color={colors.text} />
            {cartItemCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {cartItemCount > 99 ? '99+' : cartItemCount.toString()}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={onCartPress} style={styles.cartButton}> */}
        {/*   <View style={styles.cartIconContainer}> */}
        {/*     <Ionicons name="notifications-outline" size={24} color={colors.text} /> */}
        {/*     {cartItemCount > 0 && ( */}
        {/*       <View style={styles.badge}> */}
        {/*         <Text style={styles.badgeText}> */}
        {/*           {cartItemCount > 99 ? '99+' : cartItemCount.toString()} */}
        {/*         </Text> */}
        {/*       </View> */}
        {/*     )} */}
        {/*   </View> */}
        {/* </TouchableOpacity> */}
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

export default HeaderComponent;
