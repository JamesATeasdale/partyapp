import { TouchableOpacity, View, Text, ScrollView, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { theme } from "../assets/colours";
import { useEffect, useState } from "react";
import WinnerScreen from "./WinnerScreen";
import AddPlayerForm from "./AddPlayerForm";

export default function GameRanking({ setOk, players, setPlayers }) {
  const route = useRoute();
  const pageTheme = theme(route.name);

  const [chosen, setChosen] = useState({ name: "" });

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
    <View tw="w-full items-center">
      <View tw="w-full justify-center flex-row basis-3/6">
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
                onPress={() => confirm(player.name)}
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
                    (!index ? 4 : index === 1 ? 5 : 3) +
                    "/6 w-full justify-end "
                  }>
                  <Text
                    style={{ color: pageTheme.text, fontFamily: "header" }}
                    tw="text-5xl text-center pt-2">
                    {player.score}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }
        )}
      </View>
      <ScrollView horizontal={true} tw="w-full bg-gray-200">
        {players
          .slice(3)
          .map((player = { name: "", colour: "", score: 0 }, index = 0) => (
            <TouchableOpacity
              onPress={() => setOk(player)}
              key={player.name}
              tw="px-2 h-full flex-row justify-center">
              <Text
                tw="text-4xl pr-2"
                style={{
                  color: player.colour,
                  fontFamily: "text",
                }}>
                {player.name}
              </Text>
              <Text
                tw="text-4xl"
                style={{ color: pageTheme.text, fontFamily: "header" }}>
                {player.score}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
}
