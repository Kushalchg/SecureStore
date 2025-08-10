import { useNativeModule } from '@/hooks/useNativeModule';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, BackHandler } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { ExtendedTheme } from '@/constants/CustomTheme';
import { CustomButton } from '@/components/custom/CustomButton';

const SecurityScreen = () => {
  const { colors } = useTheme();
  const { securityStatus, error } = useNativeModule();
  const styles = createStyles(colors);

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
        <Text style={styles.messageText}>Checking device security...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Device Security Check</Text>
      <View style={styles.statusItem}>
        <Text style={styles.statusLabel}>Device Rooted: </Text>
        <Text style={securityStatus.isRooted.isRooted ? styles.danger : styles.safe}>
          {securityStatus?.isRooted?.isRooted.toString()}
        </Text>
      </View>
      <View style={styles.statusItem}>
        <Text style={styles.statusLabel}>Developer Options: </Text>
        <Text style={securityStatus.isDevEnabled.isDeveloperOptionsEnabled ? styles.warning : styles.safe}>
          {securityStatus?.isDevEnabled?.isDeveloperOptionsEnabled.toString()}
        </Text>
      </View>
      {(securityStatus.isRooted.isRooted || securityStatus.isDevEnabled.isDeveloperOptionsEnabled) && (
        <>
          <Text style={styles.messageText}>
            Unable to proceed: Device is insecure due to rooting or enabled developer options.
          </Text>
          <CustomButton style={{ paddingHorizontal: 40, paddingVertical: 10, }} onPress={handleExit}>
            <Text style={styles.buttonText}>Exit App</Text>
          </CustomButton>

        </>
      )}
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
    title: {
      fontSize: 24,
      fontFamily: "GroteskBold",
      color: colors.text,
      marginBottom: 20,
      textAlign: 'center',
    },
    statusItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    statusLabel: {
      fontSize: 16,
      fontFamily: "Grotesk",
      color: colors.text,
    },
    safe: {
      fontSize: 16,
      fontFamily: "GroteskBold",
      color: colors.profit,
    },
    warning: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.highlight,
    },
    danger: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.red,
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

export default SecurityScreen;
