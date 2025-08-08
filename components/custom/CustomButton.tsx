import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, StyleProp } from 'react-native';

type CustomButtonProps = {
  children: React.ReactNode;
  onPress?: () => void;
  borderColor?: string;
  style?: StyleProp<ViewStyle>;
};

export const CustomButton = ({
  children,
  onPress,
  borderColor = '#007AFF',
  style,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        {
          borderColor,
          backgroundColor: borderColor + "30",
        },
        style,
      ]}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    // borderRadius: 8,
  },
});
