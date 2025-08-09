import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Pressable,
  ToastAndroid,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ExtendedTheme } from '@/constants/CustomTheme';
import CustomTextInput from '@/components/custom/UserInput';

const { height, width } = Dimensions.get('screen');

interface ForgotPasswordModalProps {
  visible: boolean;
  onClose: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  visible,
  onClose,
}) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!email.trim()) {
      Alert.alert('Invalid Input', 'Please enter your email address');
      return;
    }


    try {
      setIsLoading(true);
      //just to show you loading
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Show success message
      ToastAndroid.showWithGravity(
        `Password reset link sent to ${email}`,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );

      setEmail('');
      onClose();

    } catch (error) {
      Alert.alert('Error', 'Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEmail('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={handleCancel}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
      >
        <Pressable
          onPress={handleCancel}
          style={styles.overlay}
        >
          <Pressable onPress={() => { }} style={styles.modalContainer}>
            <View style={styles.header}>
              <View style={styles.headerContent}>
                <Text style={styles.title}>Forgot Password</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={handleCancel}
                >
                  <Ionicons
                    name="close"
                    size={24}
                    color={colors.text}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.content}>
              <View style={styles.descriptionContainer}>
                <Text style={styles.description}>
                  Enter your email address and we'll send you a link to reset your password.
                </Text>
              </View>

              <View style={styles.inputContainer}>
                <CustomTextInput
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email address"
                  labelStyle={{ fontWeight: "800" }}
                  autoCorrect={false}
                />
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleCancel}
                disabled={isLoading}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,
                  styles.sendButton,
                  (isLoading || !email.trim()) && styles.disabledButton
                ]}
                onPress={handleSend}
                disabled={isLoading || !email.trim()}
              >
                <Text style={[
                  styles.sendButtonText,
                  (isLoading || !email.trim()) && styles.disabledButtonText
                ]}>
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const createStyles = (colors: ExtendedTheme['colors']) => StyleSheet.create({
  overlay: {
    flex: 1,
    width,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: '100%',
    maxWidth: 500,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: colors.blue,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: 'GroteskBold',
    color: colors.text,
  },
  closeButton: {
    padding: 4,
  },
  content: {
    padding: 20,
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Grotesk',
    color: colors.text + '80',
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
    paddingTop: 0,
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  cancelButton: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.newBorder,
  },
  cancelButtonText: {
    fontFamily: 'GroteskBold',
    fontSize: 16,
    fontWeight: '600',
    color: colors.muted,
  },
  sendButton: {
    backgroundColor: colors.blue + "30",
    borderWidth: 1,
    borderColor: colors.blue,
  },
  sendButtonText: {
    fontFamily: 'GroteskBold',
    fontSize: 16,
    color: colors.blue,
  },
  disabledButton: {
    backgroundColor: colors.muted + "30",
    borderColor: colors.newBorder,
  },
  disabledButtonText: {
    fontFamily: 'GroteskBold',
    color: colors.muted,
  },
});

export default ForgotPasswordModal;
