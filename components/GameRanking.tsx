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
    <View tw="w-full items-center">
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
                tw="justify-end basis-1/3">
                <View>
                  <View tw=" bg-white opacity-30 w-full h-full absolute rounded-t-md" />
                  <Text
                    numberOfLines={1}
                    tw={"text-4xl font-extrabold rounded-t-md text-center"}
                    style={{
                      color: player.colour,
                    }}>
                    {player.name}
                  </Text>
                </View>
                <View
                  style={{ backgroundColor: colour }}
                  tw={
                    "border-t-2 " +
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
      <ScrollView horizontal={true}>
        <View tw="opacity-30 bg-white absolute h-4/6 w-full" />
        {players
          .slice(3)
          .map((player = { name: "", colour: "", score: 0 }, index = 0) => (
            <TouchableOpacity
              onPress={() => confirm(player.name)}
              key={player.name}
              tw="px-2 h-full flex-row justify-center">
              <Text
                tw="text-4xl text-white font-extrabold pr-2"
                style={{
                  color: player.colour,
                }}>
                {player.name}
              </Text>
              <Text tw="font-extrabold text-white text-4xl">
                {player.score}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
}
