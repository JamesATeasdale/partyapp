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

export default function GameRanking({ players, setPlayers }) {
  const route = useRoute();
  const pageTheme = theme(route.name);
  const placeImage = [
    require("../assets/crown.png"),
    require("../assets/swords.png"),
    require("../assets/jesterhat.png"),
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
    <View
      tw="w-11/12 h-40 self-center items-center rounded-b-lg"
      style={{ backgroundColor: pageTheme.fg }}>
      <View tw="mt-1 rounded-lg flex-row ">
        {players
          .sort((a, b) => b.score - a.score)
          .slice(0, 3)
          .map((player = { name: "", score: 0, colour: "" }, index = 0) => {
            let colour = "red";
            index === 0
              ? (colour = "#D4AF37")
              : index === 1
              ? (colour = "#C0C0C0")
              : (colour = "#CD7F32");

            return (
              <TouchableOpacity // <- problem
                onPress={() => confirm(player.name)}
                key={player.name}
                style={{
                  borderColor: colour,
                }}
                tw="basis-1/3 items-center">
                <Image source={placeImage[index]} tw="w-4/6 h-16" />
                <Text
                  tw="text-2xl font-extrabold rounded-md w-full text-center text-white"
                  style={{
                    backgroundColor: player.colour,
                  }}>
                  {player.name}
                </Text>
                <Text
                  tw="rounded-2xl font-black text-2xl self-center text-center px-2 top-5 absolute"
                  style={{ backgroundColor: colour }}>
                  {player.score}
                </Text>
              </TouchableOpacity>
            );
          })}
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
