import { TouchableOpacity, View, Text, ScrollView, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { theme } from "../assets/colours";
import { useEffect, useRef, useState } from "react";
import LottieView from "lottie-react-native";

export default function GameRanking({
  setChangePlayer,
  players,
  setPlayerForm,
}) {
  const route = useRoute();
  const pageTheme = theme(route.name);
  const [topPlayer, setTopPlayer] = useState("");
  const LottieRef = useRef(null);

  useEffect(() => {
    if (players[0].name !== topPlayer) {
      setTopPlayer(players[0].name);
      LottieRef.current?.play();
    }
  });

  return (
    <View tw="w-full h-40">
      <View tw="w-full justify-center flex-row basis-4/6 ">
        {[players[1], players[0], players[2]].map(
          (player = { name: "", score: 0, colour: "" }, index = 0) => {
            let colour = "red";
            index === 1
              ? (colour = "#D4AF37")
              : !index
              ? (colour = "#C0C0C0")
              : (colour = "#CD7F32");

            return (
              <TouchableOpacity
                onPress={() => {
                  setPlayerForm(true);
                  setChangePlayer(player);
                }}
                key={index}
                tw="justify-end basis-1/3 rounded-t-sm">
                <Text
                  numberOfLines={1}
                  tw="text-3xl text-center"
                  style={{
                    color: player.colour,
                    backgroundColor: colour,
                    fontFamily: "text",
                  }}>
                  {player.name}
                </Text>
                <View
                  style={{ backgroundColor: colour }}
                  tw={
                    "h-" +
                    (!index ? 3 : index === 1 ? 5 : 4) +
                    "/6 w-full justify-end"
                  }>
                  <Text
                    style={{ color: pageTheme.text, fontFamily: "header" }}
                    tw="text-3xl text-center">
                    {player.score}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }
        )}
      </View>
      <View tw="w-full">
        <ScrollView
          horizontal={true}
          tw="w-full"
          style={{ backgroundColor: pageTheme.fg }}>
          {players
            .slice(3)
            .map((player = { name: "", colour: "", score: 0 }, index = 0) => (
              <TouchableOpacity
                onPress={() => {
                  setPlayerForm(true);
                  setChangePlayer(player);
                }}
                key={player.name}
                tw="px-2 h-full flex-row justify-center">
                <Text
                  tw="text-3xl pr-1"
                  numberOfLines={1}
                  style={{
                    color: player.colour,
                    fontFamily: "header",
                  }}>
                  {player.name}
                </Text>
                <Text
                  tw="text-3xl"
                  style={{ color: pageTheme.text, fontFamily: "header" }}>
                  {player.score}
                </Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
      <View pointerEvents="none" tw="h-full w-full absolute">
        <LottieView
          style={{ pointerEvents: "none" }}
          tw="h-full w-full absolute"
          ref={LottieRef}
          source={require("../assets/Lottie/fireworks2.json")}
          loop={false}
        />
      </View>
    </View>
  );
}
