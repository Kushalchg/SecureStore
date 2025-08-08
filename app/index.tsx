import { useNativeModule } from '@/hooks/useNativeModule';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const SecurityScreen: React.FC = () => {
  const { securityStatus, error, checkSecurity } = useNativeModule();

  useEffect(() => {
    if (securityStatus?.isRooted) {
      router.replace("/landingPage")
    }
  }, [securityStatus])

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Error: {error}</Text>
        <Button title="Retry" onPress={checkSecurity} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Security Status</Text>

      <View style={styles.statusItem}>
        <Text>Device Rooted: </Text>
        <Text style={securityStatus?.isRooted ? styles.danger : styles.safe}>
          {securityStatus?.isRooted ? 'YES' : 'NO'}
        </Text>
      </View>

      <View style={styles.statusItem}>
        <Text>Developer Options: </Text>
        <Text style={securityStatus?.isDevEnabled ? styles.warning : styles.safe}>
          {securityStatus?.isDevEnabled ? 'ENABLED' : 'DISABLED'}
        </Text>
      </View>
      <Button title="Refresh" onPress={checkSecurity} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  statusItem: {
    flexDirection: 'row',
    marginBottom: 10,
    fontSize: 16,
  },
  detail: {
    fontSize: 12,
    color: '#666',
    marginLeft: 10,
    marginBottom: 10,
  },
  safe: {
    color: 'green',
    fontWeight: 'bold',
  },
  warning: {
    color: 'orange',
    fontWeight: 'bold',
  },
  danger: {
    color: 'red',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default SecurityScreen;
