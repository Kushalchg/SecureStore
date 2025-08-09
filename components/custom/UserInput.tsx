import { ExtendedTheme } from "@/constants/CustomTheme";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { forwardRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  type TextInputProps,
  type TextStyle,
  TouchableOpacity,
  View,
  type ViewStyle,
} from "react-native";

// Defining custom props other thant he default TextInputProps 
interface CustomTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputContainerStyle?: ViewStyle;
  errorStyle?: TextStyle;
  helperTextStyle?: TextStyle;
  showClearButton?: boolean;
  onClear?: () => void;
  required?: boolean;
  isPassword?: boolean;
}

const CustomTextInput = forwardRef<TextInput, CustomTextInputProps>(
  (
    {
      label,
      error,
      helperText,
      containerStyle,
      labelStyle,
      inputContainerStyle,
      errorStyle,
      helperTextStyle,
      showClearButton = false,
      onClear,
      style,
      value,
      onChangeText,
      required,
      isPassword = false,
      ...restProps
    },
    ref
  ) => {
    const { colors } = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleFocus = (e: any) => {
      setIsFocused(true);
      if (restProps.onFocus) {
        restProps.onFocus(e);
      }
    };

    const handleBlur = (e: any) => {
      setIsFocused(false);
      if (restProps.onBlur) {
        restProps.onBlur(e);
      }
    };

    const handleClear = () => {
      if (onChangeText) {
        onChangeText("");
      }
      if (onClear) {
        onClear();
      }
    };

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <View style={[styles(colors).container, containerStyle]}>

        <View
          style={[
            styles(colors).inputContainer,
            inputContainerStyle,
            isFocused && styles(colors).focusedInput,
            error && styles(colors).errorInput,
          ]}
        >
          <TextInput
            ref={ref}
            style={[styles(colors).input, style]}
            value={value}
            onChangeText={onChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholderTextColor={colors.muted}
            secureTextEntry={isPassword && !showPassword}
            {...restProps}
          />

          {isPassword && (
            <TouchableOpacity
              hitSlop={10}
              onPress={togglePasswordVisibility}
              style={styles(colors).passwordToggle}
            >
              <MaterialIcons
                name={showPassword ? "visibility-off" : "visibility"}
                size={24}
                color={colors.text}
              />
            </TouchableOpacity>
          )}

          {showClearButton && value && value.length > 0 && !isPassword && (
            <TouchableOpacity onPress={handleClear} style={styles(colors).clearButton}>
              <Text style={styles(colors).clearButtonText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {error && <Text style={[styles(colors).errorText, errorStyle]}>{error}</Text>}
        {helperText && !error && (
          <Text style={[styles(colors).helperText, helperTextStyle]}>{helperText}</Text>
        )}
      </View>
    );
  }
);

export default CustomTextInput;

const styles = (colors: ExtendedTheme['colors']) => StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 12,
    fontSize: 16,
    color: colors.text,
  },
  focusedInput: {
    borderColor: colors.muted,
    borderWidth: 2,
  },
  errorInput: {
    borderColor: colors.red,
  },
  errorText: {
    color: colors.red,
    fontSize: 12,
    marginTop: 5,
  },
  helperText: {
    color: "#8E8E93",
    fontSize: 12,
    marginTop: 4,
  },
  clearButton: {
    padding: 8,
    marginRight: 8,
  },
  clearButtonText: {
    color: "#8E8E93",
    fontSize: 16,
  },
  passwordToggle: {
    padding: 8,
    marginRight: 8,
  },
});

