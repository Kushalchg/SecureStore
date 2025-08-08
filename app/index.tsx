import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { ExtendedTheme } from '@/constants/CustomThemt';


const HomeScreen = () => {
  const { colors } = useTheme();

  const styles = createStyles(colors);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to My App</Text>
      <Text style={styles.description}>
        This is a simple React Native page using theme colors from React Navigation
      </Text>
    </View>
  );
};

export default HomeScreen;

const createStyles = (colors: ExtendedTheme['colors']) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 10,
  },
  buttonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '600',
  },
});
