import React from "react";
import { View, Image, TouchableOpacity, StyleSheet, Text, useColorScheme, Appearance } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { ExtendedTheme } from "@/constants/CustomTheme";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { shortToast } from "@/utils/Toast";

const HeaderComponent = () => {
  const notificationCount = 5;
  const colorScheme = useColorScheme();
  const { colors } = useTheme();
  const { top, bottom } = useSafeAreaInsets()
  const styles = createStyles(colors);
  const onNotificationPress = () => {
    shortToast("Nothing to show!!!")
  }

  const handleProfile = () => {
    router.push("/authenticated/(tabs)/profile")
  }


  const handleChagneTheme = () => {
    Appearance.setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <View style={[styles.container, { paddingTop: top + 10 }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={handleProfile}>
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
        <TouchableOpacity onPress={handleChagneTheme} hitSlop={10} style={[styles.headerButton, { marginRight: 10, }]}>
          <View >
            {colorScheme === 'dark' ?
              <Feather name='moon' size={25} color={colors.text} /> :
              <Feather name='sun' size={25} color={colors.text} />
            }
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onNotificationPress} style={[styles.headerButton]}>
          <View style={styles.cartIconContainer}>
            <Ionicons name="notifications-outline" size={24} color={colors.text} />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {notificationCount.toString()}
              </Text>
            </View>
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
    headerButton: {
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
