import Toast from 'react-native-simple-toast'

export const shortToast = (message: string) => {
  Toast.showWithGravity(message, 10, Toast.BOTTOM)
}

