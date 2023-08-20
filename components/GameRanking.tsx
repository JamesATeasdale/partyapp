import { TouchableOpacity, View, Text, ScrollView, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { theme } from "../assets/colors";
import { useEffect } from "react";

export default function GameRanking({ players, setPlayers }) {
  const route = useRoute();
  const pageTheme = theme(route.name);
  useEffect(() => {
    players.sort((a, b) => b.score - a.score);
  }, [players]);

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
    <View tw="w-full items-center rounded-lg mt-4">
      <View tw="w-full justify-center flex-row h-4/6">
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
                key={player.name}
                style={{
                  borderColor: colour,
                }}
                tw="justify-end basis-1/3">
                <Text
                  numberOfLines={1}
                  tw={"text-4xl font-extrabold rounded-t-md text-center"}
                  style={{
                    color: player.colour,
                    backgroundColor: "white",
                  }}>
                  {player.name}
                </Text>
                <View
                  style={{ backgroundColor: colour }}
                  tw={
                    "border-2 " +
                    "h-" +
                    (!index ? 4 : index === 1 ? 5 : 3) +
                    "/6 w-full justify-end"
                  }>
                  <Text tw="font-black text-white text-3xl text-center bg-blue-900">
                    {player.score}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }
        )}
      </View>
      <ScrollView horizontal={true} tw="">
        {players
          .slice(3)
          .map((player = { name: "", colour: "", score: 0 }, index = 0) => (
            <TouchableOpacity
              onPress={() => confirm(player.name)}
              key={player.name}
              tw="mx-1  pl-1 rounded-lg flex-row my-2 items-center h-14"
              style={{
                backgroundColor: player.colour,
              }}>
              <Text tw="text-4xl text-white pr-6 font-extrabold">
                {player.name}
              </Text>
              <View tw="px-2 h-full justify-center rounded-r-md bg-white">
                <Text tw="font-black text-4xl">{player.score}</Text>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
}
