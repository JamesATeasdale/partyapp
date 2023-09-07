import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Text, View } from "react-native";
import LottieView from "lottie-react-native";
import { useEffect } from "react";

export default function pointNotifier({ value }) {
  const offset = useSharedValue(0);

  useEffect(() => {
    offset.value = withSpring(-120);
  }, []);
  const animatedStyles = useAnimatedStyle(() => {
    const opacity = withTiming(interpolate(offset.value, [-120, 0], [0, 1]), {
      duration: 600,
    });
    return {
      transform: [{ translateY: offset.value }],
      opacity,
    };
  });

  return (
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
            fontFamily: "header",
          }}>
          +{value}
        </Text>
      </Animated.View>
    </View>
  );
}
