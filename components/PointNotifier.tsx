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
  const LottieRef = useRef(null);

  useEffect(() => {
    value > 0 && setDelayValue(value);
  }, [value > 0]);
  useEffect(() => LottieRef.current?.play(), [LottieRef]);

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
      tw="w-full h-full justify-end items-center"
      style={[animatedStyles]}>
      <LottieView
        ref={LottieRef}
        source={require("../assets/singlepartypopper.json")}
        tw="h-full w-full absolute"
        loop={false}
        speed={1}
      />
      <View tw="h-full" />
      <Text
        tw="text-9xl text-white pt-2"
        style={{
          fontFamily: "Caprasimo-Regular",
        }}>
        +{delayValue}
      </Text>
    </Animated.View>
  );
}
