import { useEffect, useMemo } from "react"
import { Dimensions, StyleSheet, View } from "react-native"
import { useTheme } from "@react-navigation/native"
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from "react-native-reanimated"
import { ExtendedTheme } from "@/constants/CustomTheme"
const { width } = Dimensions.get('screen')
const VerticalLine = ({ angle = 0, animation = false, GAP = 50 }: { angle?: number, animation?: boolean, GAP?: number }) => {
  const xtranslate = useSharedValue(0)
  const ytranslate = useSharedValue(0)

  const { colors } = useTheme()
  const LINENUMBER = Math.ceil(width / GAP) + 1 + angle
  const arr = Array.from({ length: LINENUMBER })
  const animatedLine = useAnimatedStyle(() => ({
    transform: [{ translateX: xtranslate.value }, { translateY: ytranslate.value }]
  }))

  useEffect(() => {
    xtranslate.value = withRepeat(
      withSequence(
        withTiming(GAP, { duration: 3000, easing: Easing.linear }),
        withTiming(0, { duration: 0 }),
      ), -1, true)


  }, [])


  const VLine = useMemo(() => {
    return (
      <View style={[styles(colors).container, { width }]} >
        {arr.map((_, index) => {
          return (
            <Animated.View key={index} style={[{ left: index * GAP }, animation ? animatedLine : null]}>
              <View style={styles(colors).line} />
            </Animated.View>
          )
        })}
      </View>
    )
  }, [arr])

  return VLine
}
export default VerticalLine

const styles = (colors: ExtendedTheme['colors']) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.2,
    height: '100%',
  },
  line: {
    width: 1,
    height: '200%',
    backgroundColor: colors.muted,
  }
})
