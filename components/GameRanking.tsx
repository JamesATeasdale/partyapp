import { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  ScrollView,
  Alert,
  ImageBackground,
} from "react-native";

export default function GameRanking({ players, setPlayers }) {
  const images = [
    require("../assets/gold.jpg"),
    require("../assets/silver.jpg"),
    require("../assets/brown.jpg"),
  ];
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
    <View tw="h-1/5 w-full self-center items-center bg-[#2c935f]">
      <View tw=" p-2 rounded-xl flex-row">
        {players
          .sort((a, b) => b.score - a.score)
          .slice(0, 3)
          .map((player = { name: "", score: 0, color: "" }, index = 0) => {
            let colour = "gold";
            index === 0
              ? (colour = "gold")
              : index === 1
              ? (colour = "silver")
              : (colour = "brown");

            return (
              <ImageBackground
                key={player.name}
                style={{
                  borderColor: colour,
                }}
                tw="basis-1/3 border-4 rounded-t-2xl mx-1 items-center justify-center flex-col"
                resizeMethod="scale"
                source={images[index]}>
                <Text tw="font-black text-black text-3xl w-full text-center">
                  {index === 0
                    ? index + 1 + "ST"
                    : index === 1
                    ? index + 1 + "ND"
                    : index + 1 + "RD"}
                </Text>
                <TouchableOpacity
                  onPress={() => confirm(player.name)}
                  key={player.name}
                  style={{ backgroundColor: player.color }}
                  tw="items-center pl-1 border-white flex-row w-full">
                  <Text tw="text-xl font-extrabold">{player.name}</Text>
                  <View
                    tw="bg-white px-2 items-center right-0 absolute"
                    style={{}}>
                    <Text tw="font-black text-lg">{player.score}</Text>
                  </View>
                </TouchableOpacity>
              </ImageBackground>
            );
          })}
      </View>
      <View tw="w-full pb-2 flex-row bg-[#2c935f]">
        <ScrollView horizontal={true}>
          {players
            .slice(3)
            .map((player = { name: "", color: "", score: 0 }, index = 0) => (
              <TouchableOpacity
                onPress={() => confirm(player.name)}
                key={player.name}
                style={{ backgroundColor: player.color }}
                tw="mx-1 items-center px-2 rounded-xl border-4 border-white flex-row w-36 h-10">
                <Text tw="text-lg font-extrabold break-keep">
                  {player.name}
                </Text>
                <View tw="bg-white p-2  items-center -my-4 -mr-2 rounded-r-2xl right-0 absolute px-3">
                  <Text tw="font-black text-lg">{player.score}</Text>
                </View>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
    </View>
  );
}
