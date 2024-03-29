import LottieView from "lottie-react-native";
import { useEffect, useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeOut } from "react-native-reanimated";

export default function playersScreen({ players, setWinners }) {
  const LottieRef = useRef(null);
  useEffect(() => LottieRef.current?.play(), [players]);

  return (
    <Animated.View
      tw="h-full w-full absolute items-center justify-center"
      exiting={FadeOut}>
      <View tw="opacity-40 bg-black w-full h-full absolute" />
      <Text
        tw="text-6xl font-black text-white p-2"
        style={{
          fontFamily: "Caprasimo-Regular",
        }}>
        WINNER!
      </Text>
      <LottieView
        ref={LottieRef}
        tw="w-full h-full absolute"
        source={require("../assets/Lottie/fireworks.json")}
        loop={false}
        speed={1}
      />
      {players
        .filter((player) => player.score === players[0].score && player)
        .map((player) => (
          <View tw="w-5/6 py-2 justify-between" key={player.name}>
            <View tw="absolute h-full w-full bg-black opacity-80 rounded-lg" />
            <Text
              tw="text-6xl pt-2 font-black text-center"
              style={{
                fontFamily: "Caprasimo-Regular",
                color: player.colour,
              }}>
              {player.name}
            </Text>
            <Text
              style={{
                fontFamily: "Caprasimo-Regular",
              }}
              tw="text-center pt-2 text-9xl font-black text-white">
              {player.score}
            </Text>
          </View>
        ))}
      <TouchableOpacity
        tw="w-full h-full absolute"
        onPress={() => setWinners(false)}
      />
    </Animated.View>
  );
}
