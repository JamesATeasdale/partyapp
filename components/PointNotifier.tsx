import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Text, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import LottieView from "lottie-react-native";

export default function pointNotifier({ value }) {
  const offset = useSharedValue(0);
  const [delayValue, setDelayValue] = useState(0);

  useEffect(() => {
    value > 0 && setDelayValue(value);
  }, [value > 0]);

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
    delayValue > 0 && (
      <View
        tw="w-full h-full justify-end items-center absolute"
        pointerEvents="none">
        <LottieView
          source={require("../assets/Lottie/singlefirework.json")}
          tw="h-2/6 w-full absolute bottom-0"
          loop={false}
          autoPlay={true}
          speed={1}
        />
        <Animated.View style={[animatedStyles]}>
          <Text
            tw="text-9xl text-white pt-2"
            style={{
              fontFamily: "Caprasimo-Regular",
            }}>
            +{delayValue}
          </Text>
        </Animated.View>
      </View>
    )
  );
}
