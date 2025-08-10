import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ExtendedTheme } from '@/constants/CustomTheme';
import { shortToast } from '@/utils/Toast';

const ProfileScreen = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  //navigate to the resetpassword on reset password press
  const handleReset = () => {
    router.push('/authenticated/resetPassword');
  };

  //to handle logout click
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout",
      [
        { text: 'Cancel', style: "cancel" },
        {
          text: 'Ok',
          style: "destructive",
          onPress: () =>
            new Promise((resolve) => setTimeout(resolve, 2000))
              .then(() => {
                shortToast("logout successful")
                router.replace("/landingPage")
              }
              )

        },
      ])
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Feather name="refresh-cw" size={20} color={colors.highlight} />
        <Text style={styles.buttonText}>Reset Password</Text>
        <Feather name="chevron-right" size={20} color={colors.highlight} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Feather name="log-out" size={20} color={colors.red} />
        <Text style={styles.buttonText}>Logout</Text>
        <Feather name="chevron-right" size={20} color={colors.red} />
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (colors: ExtendedTheme['colors']) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  buttonText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Grotesk',
    color: colors.text,
    marginLeft: 16,
  },
});

export default ProfileScreen;
