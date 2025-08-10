import { useNativeModule } from '@/hooks/useNativeModule';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, BackHandler, ActivityIndicator } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { ExtendedTheme } from '@/constants/CustomTheme';
const Index = () => {
  const { colors } = useTheme();
  const { securityStatus, error } = useNativeModule();
  const styles = createStyles(colors);


  useEffect(() => {
    if (!securityStatus || error === undefined) {
      //no data yet received so i have to do nothing here
      return;
    }

    const isRooted = securityStatus.isRooted?.isRooted === true;
    const isDevEnabled = securityStatus.isDevEnabled?.isDeveloperOptionsEnabled === true;

    if (!isRooted && isDevEnabled && !error) {
      //everything is false so safe to processed
      router.replace('/landingPage');
    } else {
      //Somethins is messed up here
      router.replace('/securityScreen');
    }
  }, [securityStatus, error]);

  const handleExit = () => {
    BackHandler.exitApp();
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Security Check Failed: {error}</Text>
        <Text style={styles.messageText}>Unable to proceed due to security error.</Text>
        <TouchableOpacity style={styles.button} onPress={handleExit}>
          <Text style={styles.buttonText}>Exit App</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!securityStatus) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} color={colors.blue} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <ActivityIndicator size={'large'} color={colors.blue} />
      </View>
    </View >
  );
};

const createStyles = (colors: ExtendedTheme['colors']) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    errorText: {
      fontSize: 16,
      color: colors.red,
      textAlign: 'center',
      fontFamily: "Grotesk",
      marginBottom: 10,
    },
    messageText: {
      fontSize: 16,
      color: colors.text,
      fontFamily: "Grotesk",
      textAlign: 'center',
      marginVertical: 20,
      maxWidth: '80%',
    },
    button: {
      backgroundColor: colors.primary,
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    buttonText: {
      fontSize: 16,
      color: colors.blue,
      fontFamily: "GroteskBold"
    },
  });

export default Index;
