import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Text } from "react-native";
import { useEffect, useState } from "react";

export default function pointNotifier({ value }) {
  const offset = useSharedValue(0);
  const [delayValue, setDelayValue] = useState(0);

  useEffect(() => {
    value > 0 && setDelayValue(value);
  }, [value]);

  if (value) offset.value = withSpring(-120);
  const animatedStyles = useAnimatedStyle(() => {
    const opacity = withTiming(interpolate(offset.value, [-120, 0], [0, 1]), {
      duration: 400,
    });
    return {
      transform: [{ translateY: offset.value }],
      opacity,
    };
  });

  return (
    <Animated.View
      tw="w-full h-4/6 absolute justify-end items-center"
      style={[animatedStyles]}>
      <Text
        tw="text-9xl text-white"
        style={{
          fontFamily: "Caprasimo-Regular",
        }}>
        +{delayValue}
      </Text>
    </Animated.View>
  );
}
