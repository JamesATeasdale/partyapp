import { createRef, useRef, useState } from "react";
import {
  FlatList,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

export default function TruthOrDare({ setPage, players, setPlayers }) {
  return (
    <View tw="h-full">
      <TouchableOpacity
        onPress={() => setPage("")}
        tw="mt-4 bg-[#00adf0] p-6 border-2 rounded-xl">
        <Text tw="font-white font-4xl">Truth Or Dare</Text>
      </TouchableOpacity>
      <View tw="h-1/6 w-full self-center justify-center p-2 m-4 bg-[#341651] ">
        <View tw="w-full h-5/6 p-2 rounded-xl flex-row self-center justify-center">
          {players
            .sort((a, b) => b.score - a.score)
            .filter((place, index) => index < 3)
            .map((player, index) => {
              let colour;
              index === 0
                ? (colour = "gold")
                : index === 1
                ? (colour = "silver")
                : (colour = "brown");
              return (
                <View
                  style={{ borderColor: colour, backgroundColor: colour }}
                  tw="basis-1/3 mx-2 items-center justify-center border-8 rounded-t-2xl">
                  <Image
                    source={require("../assets/Balloon_arch.jpg")}
                    tw="w-full h-full absolute rounded-t-xl"
                  />
                  <Text tw="font-black text-gray-100 text-2xl ">
                    {player.name}
                  </Text>
                </View>
              );
            })}
        </View>
        <View tw="flex-row">
          <ScrollView tw="" horizontal={true}>
            {players.map((player = { name: "", color: "" }, index = 0) => (
              <TouchableOpacity
                key={player.name}
                style={{ backgroundColor: player.color }}
                tw="m-1 p-1 px-2 rounded-xl">
                <Text>{player.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
