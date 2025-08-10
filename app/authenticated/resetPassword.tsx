import { useTheme } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as Yup from 'yup';
import { CustomButton } from '@/components/custom/CustomButton';
import CustomTextInput from '@/components/custom/UserInput';
import { ExtendedTheme } from '@/constants/CustomTheme';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { shortToast } from '@/utils/Toast';

const ResetPasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(6, 'Old password must be at least 6 characters')
    .required('Old password is required'),
  newPassword: Yup.string()
    .min(6, 'New password must be at least 6 characters')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
});

const ResetPasswordScreen = () => {
  const { colors } = useTheme();
  const { top, bottom } = useSafeAreaInsets();
  const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);

  useEffect(() => {
    const updateHeight = () => {
      setScreenHeight(Dimensions.get('window').height);
    };

    const dimensionsListener = Dimensions.addEventListener('change', updateHeight);
    return () => dimensionsListener.remove();
  }, []);

  return (
    <View style={styles(colors).container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? top + 20 : 0}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={[
            styles(colors).scrollContainer,
            {
              minHeight: screenHeight - top - bottom - 40,
              paddingBottom: 40
            }
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          <View style={styles(colors).contentContainer}>
            <View style={{ marginBottom: 90 }}>
              <Text style={styles(colors).title}>Reset Password</Text>
              <Text style={styles(colors).subtitle}>
                Enter your old password and create a new secure password
              </Text>
            </View>
            <Formik
              initialValues={{
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
              }}
              validationSchema={ResetPasswordSchema}
              onSubmit={(values, { resetForm }) => {
                new Promise((resolve) => setTimeout(resolve, 2000))
                  .then(() => {
                    shortToast('Password changed successfully');
                    resetForm();
                  });
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={styles(colors).formContainer}>
                  <CustomTextInput
                    label="Old Password"
                    value={values.oldPassword}
                    onChangeText={handleChange('oldPassword')}
                    onBlur={handleBlur('oldPassword')}
                    error={touched.oldPassword && errors.oldPassword ? errors.oldPassword : undefined}
                    isPassword
                    placeholder="Enter old password"
                  />
                  <CustomTextInput
                    label="New Password"
                    value={values.newPassword}
                    onChangeText={handleChange('newPassword')}
                    onBlur={handleBlur('newPassword')}
                    error={touched.newPassword && errors.newPassword ? errors.newPassword : undefined}
                    isPassword
                    placeholder="Enter new password"
                  />
                  <CustomTextInput
                    label="Confirm Password"
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    error={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
                    isPassword
                    placeholder="Confirm new password"
                  />
                  <CustomButton
                    onPress={handleSubmit}
                    style={{ marginTop: 20, }}
                  >
                    <Text style={styles(colors).buttonText}>Reset Password</Text>
                  </CustomButton>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ResetPasswordScreen;

const styles = (colors: ExtendedTheme['colors']) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: "GroteskBold",
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Grotesk",
    color: colors.muted,
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  buttonContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  button: {
    width: '100%',
    maxWidth: 300,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: colors.blue,
    fontSize: 16,
    fontFamily: "GroteskBold",
    textAlign: 'center',
  },
});
