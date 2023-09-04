import { TouchableOpacity, View, Text, ScrollView, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { theme } from "../assets/colours";

export default function GameRanking({
  setChangePlayer,
  players,
  setPlayerForm,
}) {
  const route = useRoute();
  const pageTheme = theme(route.name);

  return (
    <View tw="w-full  items-center">
      <View tw="w-full justify-center flex-row basis-4/6">
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
    </View>
  );
}
