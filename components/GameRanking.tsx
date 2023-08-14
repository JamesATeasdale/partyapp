import { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Alert,
  ImageBackground,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { theme } from "../assets/colors";

export default function GameRanking({ players, setPlayers }) {
  const images = [
    require("../assets/gold.jpg"),
    require("../assets/silver.jpg"),
    require("../assets/brown.jpg"),
  ];

  const route = useRoute();
  const pageTheme = theme(route.name);

  function confirm(playername) {
    Alert.alert("Delete " + playername + "?", "", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Confirm",
        onPress: () =>
          setPlayers(
            [...players].filter((player) => player.name !== playername)
          ),
      },
    ]);
  }
  return (
    <View
      tw="h-32 w-11/12 self-center items-center rounded-b-xl"
      style={{ backgroundColor: pageTheme.fg }}>
      <View tw="py-3 rounded-xl flex-row">
        {players
          .sort((a, b) => b.score - a.score)
          .slice(0, 3)
          .map((player = { name: "", score: 0, color: "" }, index = 0) => {
            let colour = "brown";
            index === 0
              ? (colour = "gold")
              : index === 1
              ? (colour = "silver")
              : (colour = "brown");

            return (
              <TouchableOpacity
                onPress={() => confirm(player.name)}
                key={player.name}
                style={{
                  borderColor: player.color,
                }}
                tw="basis-1/3 h-12">
                <ImageBackground
                  key={player.name}
                  style={{
                    borderColor: colour,
                    backgroundColor: player.color,
                  }}
                  tw="border-8 rounded-md mx-1 "
                  resizeMethod="scale"
                  source={images[index]}>
                  <Text tw="text-2xl font-extrabold">{player.name}</Text>
                  <Text
                    tw="absolute -bottom-4 -right-2 rounded-2xl font-black text-2xl self-center text-center px-2"
                    style={{ backgroundColor: colour }}>
                    {player.score}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            );
          })}
      </View>
      <ScrollView horizontal={true}>
        {players
          .slice(3)
          .map((player = { name: "", colour: "", score: 0 }, index = 0) => (
            <TouchableOpacity
              onPress={() => confirm(player.name)}
              key={player.name}
              tw="mx-1 items-center px-2 rounded-lg flex-row w-44 h-10"
              style={{
                backgroundColor: player.colour,
              }}>
              <Text tw="text-2xl font-extrabold ">{player.name}</Text>
              <Text tw="p-1 text-center right-0 absolute px-2 h-10 font-black text-xl rounded-r-md bg-white border-black ">
                {player.score}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
}
