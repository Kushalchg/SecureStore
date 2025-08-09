import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
  StyleSheet,
  Dimensions,
  Keyboard,
  Touchable,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import { ExtendedTheme } from '@/constants/CustomTheme';
import { CustomButton } from '@/components/custom/CustomButton';
import HorizontalLine from '@/components/HorizontalLines';
import VerticalLine from '@/components/VerticalLines';
import { Feather } from '@expo/vector-icons';
import CustomTextInput from '@/components/custom/UserInput';
import BackButton from '@/components/BackButton';
import { router } from 'expo-router';
import { Formik } from 'formik';
import * as Yup from 'yup';

interface FormDateInterface {
  email: string;
  password: string;
  confirmPassword: string;
}

// Validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

// Initial form values
const initialValues: FormDateInterface = {
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const { top, bottom } = useSafeAreaInsets()

  const { colors } = useTheme();
  const styles = createStyles(colors);


  const handleRegister = async (values: FormDateInterface) => {
    console.log("values", values)
    setIsLoading(true);

    try {
      // just to show some loading
      await new Promise(resolve => setTimeout(resolve, 1500));

      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => router.replace('/signin') }
      ]);

    } catch (error: any) {
      console.log("error occured  while registering")

    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigate = () => {
    router.replace('/signin')
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <HorizontalLine />
        <VerticalLine />
        <View style={styles.container}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <ScrollView
                contentContainerStyle={[
                  styles.scrollContainer,
                  {
                    height: screenHeight - top - bottom - 40,
                    paddingBottom: 40
                  }
                ]}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                bounces={false}
              >
                <BackButton />
                <View style={styles.header}>
                  <Text style={styles.title}>Create Account</Text>
                  <Text style={styles.subtitle}>Join us and get started</Text>
                </View>

                <View style={styles.form}>
                  <CustomTextInput
                    autoCapitalize="none"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    placeholder="Enter Your Email"
                    labelStyle={{ fontWeight: "800" }}
                    autoCorrect={false}
                    keyboardType="email-address"
                    error={touched.email && errors.email ? errors.email : undefined}
                    helperText={touched.email && errors.email ? errors.email : undefined}
                  />

                  <CustomTextInput
                    isPassword={true}
                    autoCapitalize="none"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    placeholder="Enter Your Password"
                    onBlur={handleBlur('password')}
                    labelStyle={{ fontWeight: "800" }}
                    autoCorrect={false}
                    error={touched.password && errors.password ? errors.password : undefined}
                    helperText={touched.password && errors.password ? errors.password : undefined}
                  />

                  <CustomTextInput
                    placeholder="Confirm Password"
                    autoCapitalize="none"
                    value={values.confirmPassword}
                    autoCorrect={false}
                    labelStyle={{ fontWeight: "800" }}
                    isPassword={true}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    error={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
                    helperText={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
                  />

                  <View style={styles.buttonSpacing} />

                  <CustomButton
                    style={[
                      (isLoading || isSubmitting) && styles.signupButtonDisabled
                    ]}
                    onPress={handleSubmit}
                    disabled={isLoading || isSubmitting}
                  >
                    <Text style={styles.signupButtonText}>
                      {(isLoading || isSubmitting) ? `Creating Account...` : 'Create Account'}
                    </Text>
                  </CustomButton>
                </View>

                <View style={[
                  styles.footer,
                ]}>
                  <Text style={styles.footerText}>
                    Already have an account?{' '}
                  </Text>
                  <TouchableOpacity onPress={handleNavigate}>
                    <Text style={styles.signUpLink}>Sign In</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </Formik>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const createStyles = (colors: ExtendedTheme['colors']) => StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 30,
    justifyContent: 'space-between',
  },
  header: {
    paddingTop: 30,
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontFamily: 'GroteskBold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'MontserratMedium',
    color: colors.text + '80',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonSpacing: {
    height: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.card,
  },
  signupButtonDisabled: {
    opacity: 0.6,
  },
  signupButtonText: {
    fontSize: 16,
    fontFamily: 'GroteskBold',
    color: colors.blue,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 'auto',
  },
  footerFixed: {
    marginTop: 'auto',
  },
  footerText: {
    fontSize: 14,
    color: colors.text + '80',
    fontFamily: 'Grotesk',
  },
  signUpLink: {
    color: colors.blue,
    fontFamily: 'Grotesk',
  },
});

export default SignUpScreen;
