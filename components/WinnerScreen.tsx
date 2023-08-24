import LottieView from "lottie-react-native";
import { useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";

export default function WinnerScreen({ winner, ok, setOk }) {
  const LottieRef = useRef(null);

  return (
    <Animated.View tw="h-full w-full absolute justify-end">
      <Text
        tw="text-5xl text-center absolute h-4/6 w-full"
        style={{ color: winner.colour }}>
        {winner.name}
      </Text>
      <LottieView
        ref={LottieRef}
        tw="w-full h-full absolute"
        source={require("../assets/streamers.json")}
        loop={false}
        speed={2}
      />
      <TouchableOpacity
        tw="opacity-40 bg-black w-full h-full"
        onPress={() => setOk(false)}
      />
    </Animated.View>
  );
}
