import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { theme } from "../assets/colors";
import { useEffect } from "react";

export default function GameRanking({ players, setPlayers }) {
  const route = useRoute();
  const pageTheme = theme(route.name);
  const placeImage = [
    require("../assets/crown.png"),
    require("../assets/swords.png"),
    require("../assets/jesterhat.png"),
  ];
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

  const rearrange = (arr = []) => [arr[1], arr[0], arr[2]];

  return (
    <View tw="w-full items-center rounded-lg ">
      <View tw="w-full justify-center flex-row h-4/6">
        {rearrange(players.slice(0, 3)).map(
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
                  tw={"text-4xl font-extrabold rounded-md text-center "}
                  style={{
                    color: player.colour,
                  }}>
                  {player.name}
                </Text>
                <View
                  style={{ backgroundColor: colour }}
                  tw={
                    "border-2 " +
                    "h-" +
                    (!index ? 3 : index === 1 ? 4 : 2) +
                    "/6 w-full justify-end"
                  }>
                  <Text tw="font-black text-4xl text-center">
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
              tw="mx-1 items-center pl-1 rounded-lg flex-row my-2 justify-center h-9"
              style={{
                backgroundColor: player.colour,
              }}>
              <Text tw="text-2xl text-white font-extrabold pr-6 h-full">
                {player.name}
              </Text>
              <Text tw="px-2 h-full font-black text-2xl rounded-r-md bg-white border-black">
                {player.score}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
}
