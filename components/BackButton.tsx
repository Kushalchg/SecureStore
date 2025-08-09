
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from '@react-navigation/native';

interface BackNavigaitonType {
  title?: string
  onPress?: () => void;
}
const BackButton = ({ title, onPress = () => router.back() }: BackNavigaitonType) => {
  const { colors } = useTheme()
  return (
    <View style={style.container}>
      <Pressable style={{ backgroundColor: colors.card, padding: 16, borderRadius: 40 }} onPress={onPress}>
        <Ionicons name="arrow-back-outline" size={24} color={colors.text} />
      </Pressable>
      <Text style={{ marginLeft: 20 }} numberOfLines={1}>
        {title}
      </Text>

    </View>
  )
}

export default BackButton

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  }

})
