import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import { ExtendedTheme } from '@/constants/CustomTheme';
import { CustomButton } from '@/components/custom/CustomButton';
import HorizontalLine from '@/components/HorizontalLines';
import VerticalLine from '@/components/VerticalLines';
import CustomTextInput from '@/components/custom/UserInput';
import BackButton from '@/components/BackButton';
import { router } from 'expo-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ForgotPasswordModal from '@/components/modals/ForgotPasswordModal';

interface FormValueInterface {
  email: string;
  password: string;
}

//valildation schema for the form
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

//initial vlaues of form
const initialValues: FormValueInterface = {
  email: '',
  password: '',
};

const SignInScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const { top, bottom } = useSafeAreaInsets();

  const { colors } = useTheme();
  const styles = createStyles(colors);


  const handleSignIn = async (values: FormValueInterface) => {
    setIsLoading(true);
    try {
      console.log(values)
      await new Promise(resolve => setTimeout(resolve, 1500));
      router.replace('/signup')

    } catch (error: any) {
      console.log("Error Occured")
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigate = () => {
    router.replace('/signup');
  };

  const handleForgotPassword = () => {
    setShowForgotPasswordModal(true);
  };
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
            onSubmit={handleSignIn}
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
                  <Text style={styles.title}>Welcome Back</Text>
                  <Text style={styles.subtitle}>Sign in to your account</Text>
                </View>

                <View style={styles.form}>
                  <CustomTextInput
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    placeholder="Enter Your Email"
                    labelStyle={{ fontWeight: "800" }}
                    autoCorrect={false}
                    error={touched.email && errors.email ? errors.email : undefined}
                    helperText={touched.email && errors.email ? errors.email : undefined}
                  />

                  <CustomTextInput
                    placeholder="Enter Your Password"
                    labelStyle={{ fontWeight: "800" }}
                    autoCapitalize="none"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    autoCorrect={false}
                    isPassword={true}
                    error={touched.password && errors.password ? errors.password : undefined}
                    helperText={touched.password && errors.password ? errors.password : undefined}
                  />

                  <TouchableOpacity style={styles.forgotPassword} onPress={handleForgotPassword}>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                  </TouchableOpacity>

                  <CustomButton
                    style={[
                      (isLoading || isSubmitting) && styles.signInButtonDisabled
                    ]}
                    onPress={handleSubmit}
                    disabled={isLoading || isSubmitting}
                  >
                    <Text style={styles.signInButtonText}>
                      {(isLoading || isSubmitting) ? `Signing in...` : 'Sign In'}
                    </Text>
                  </CustomButton>
                </View>

                <View style={[
                  styles.footer,
                ]}>
                  <Text style={styles.footerText}>
                    Don't have an account?{' '}
                  </Text>
                  <TouchableOpacity onPress={handleNavigate}>
                    <Text style={styles.registerLink}>Register</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </Formik>
        </View>
      </KeyboardAvoidingView>
      <ForgotPasswordModal
        visible={showForgotPasswordModal}
        onClose={() => setShowForgotPasswordModal(false)}
      />
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: colors.blue,
    fontFamily: "Grotesk"
  },
  signInButtonDisabled: {
    opacity: 0.6,
  },
  signInButtonText: {
    fontSize: 16,
    fontFamily: 'GroteskBold',
    color: colors.blue,
  },
  footer: {
    marginHorizontal: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerFixed: {
    marginTop: 'auto',
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'Grotesk',
    color: colors.text + '80',
  },
  registerLink: {
    color: colors.blue,
    fontFamily: 'Grotesk',
  },
});

export default SignInScreen;
