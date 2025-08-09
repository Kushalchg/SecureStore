import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import { useTheme } from "@react-navigation/native";

const { height, width } = Dimensions.get("window");


const ProductSkeleton = () => {
  const { colors } = useTheme();
  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 1000 }), -1, true);
  }, []);

  const shimmerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0, 1], [0.3, 1])
    return { opacity };
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.card,
          { backgroundColor: colors.card },
          shimmerStyle,
        ]}
      >
        <View
          style={[
            styles.imagePlaceholder,
            { backgroundColor: colors.border },
          ]}
        />
        <View
          style={[
            styles.textPlaceholder,
            { backgroundColor: colors.muted },
          ]}
        />
        <View
          style={[
            styles.smallTextPlaceholder,
            { backgroundColor: colors.border },
          ]}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    margin: 6,
  },
  card: {
    width: width / 2 - 20,
    height: height / 4,
    padding: 10,
    marginBottom: 15,
  },
  imagePlaceholder: {
    width: "100%",
    height: 120,
    marginBottom: 10,
  },
  textPlaceholder: {
    height: 16,
    marginBottom: 6,
  },
  smallTextPlaceholder: {
    height: 12,
    width: "70%",
  },
});

export default ProductSkeleton;
