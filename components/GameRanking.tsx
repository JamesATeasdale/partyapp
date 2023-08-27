import { TouchableOpacity, View, Text, ScrollView, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { theme } from "../assets/colours";
import { useEffect } from "react";

export default function GameRanking({ players, setPlayers }) {
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
                tw="justify-end basis-1/3">
                <Text
                  numberOfLines={1}
                  tw={"text-3xl font-extrabold rounded-t-md text-center"}
                  style={{
                    color: player.colour,
                    backgroundColor: colour,
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
                    style={{ color: pageTheme.text }}
                    tw={
                      "font-black text-5xl text-center pt-2"
                      // "font-black text-white text-2xl text-center bg-blue-900 " +
                      // (!index
                      //   ? "border-r-2"
                      //   : index === 2
                      //   ? "border-l-2"
                      //   : "border-x-2")
                    }>
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
              onPress={() => confirm(player.name)}
              key={player.name}
              tw="px-2 h-full flex-row justify-center">
              <Text
                tw="text-3xl font-extrabold pr-2"
                style={{
                  color: player.colour,
                }}>
                {player.name}
              </Text>
              <Text
                tw="font-extrabold text-4xl"
                style={{ color: pageTheme.text }}>
                {player.score}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
}
