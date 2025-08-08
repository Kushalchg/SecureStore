import { useEffect, useMemo } from "react"
import { Dimensions, StyleSheet, View } from "react-native"
import { useTheme } from "@react-navigation/native"
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from "react-native-reanimated"
import { ExtendedTheme } from "@/constants/CustomThemt"
const { height } = Dimensions.get('screen')

const HorizontalLine = ({ animation = false, GAP = 50 }: { angle?: number, animation?: boolean, GAP?: number }) => {
  const ytranslate = useSharedValue(0)
  const LINENUMBER = Math.ceil(height / GAP) + 1
  const { colors } = useTheme()
  const arr = Array.from({ length: LINENUMBER })

  const animatedLine = useAnimatedStyle(() => ({
    transform: [{ translateY: ytranslate.value }]
  }))

  useEffect(() => {
    ytranslate.value = withRepeat(
      withSequence(
        withTiming(GAP, { duration: 3000 }),
        withTiming(0, { duration: 0 }),
      ), -1, true)

  }, [])

  const HLine = useMemo(() => {
    return (
      <View style={[styles(colors).container, { height }]}>
        {arr.map((_, index) => {
          return (
            <Animated.View key={index} style={[{ top: index * GAP }, animation ? animatedLine : null]}>
              <View style={styles(colors).line} />
            </Animated.View>
          )
        })}
      </View>
    )
  }, [arr])

  return HLine

}

export default HorizontalLine

const styles = (colors: ExtendedTheme['colors']) => StyleSheet.create({
  container: {
    position: 'absolute',
    opacity: 0.2,
    width: '100%',
  },
  line: {
    height: 1,
    width: '150%',
    backgroundColor: colors.muted,
  }
})
