import LottieView from "lottie-react-native";
import { useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";

export default function playersScreen({ players, ok, setOk }) {
  const winner = players[0];
  const LottieRef = useRef(null);
  LottieRef.current?.play();
  console.log(players);

  return (
    <Animated.View tw="h-full w-full absolute items-center justify-center">
      <View tw="opacity-40 bg-black w-full h-full absolute" />
      <Text tw="text-6xl font-black text-white">WINNER!</Text>
      {players
        .filter((player) => player.score === winner.score && player)
        .map((player) => (
          <View tw="w-5/6 py-2 justify-between">
            <View tw="absolute h-full w-full bg-black opacity-80 rounded-lg" />
            <Text
              tw="text-6xl font-black text-center"
              style={{ color: player.colour }}>
              {player.name}
            </Text>
            <Text tw="text-center text-9xl font-black text-white">
              {player.score}
            </Text>
          </View>
        ))}
      <LottieView
        ref={LottieRef}
        tw="w-full h-full absolute"
        source={require("../assets/streamers.json")}
        loop={false}
        speed={2}
      />
      <TouchableOpacity
        tw="w-full h-full absolute"
        onPress={() => setOk(false)}
      />
    </Animated.View>
  );
}
