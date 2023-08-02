import {
  TouchableOpacity,
  View,
  Text,
  Image,
  ScrollView,
  Alert,
} from "react-native";

export default function GameRanking({ players, setPlayers }) {
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
      <View tw="h-4/6 p-2 rounded-xl flex-row">
        {players
          .sort((a, b) => b.score - a.score)
          .filter((place, index) => index < 3)
          .map((player = { name: "" }, index = 0) => {
            let colour;
            index === 0
              ? (colour = "gold")
              : index === 1
              ? (colour = "silver")
              : (colour = "brown");
            return (
              <TouchableOpacity
                key={player.name}
                style={{ borderColor: colour, backgroundColor: colour }}
                tw="w-1/3 mx-1 items-center justify-center border-8 rounded-t-2xl">
                <Image
                  source={require("../assets/Balloon_arch.jpg")}
                  tw="w-full h-full absolute rounded-t-xl"
                />
                <Text tw="font-black text-white text-2xl ">{player.name}</Text>
              </TouchableOpacity>
            );
          })}
      </View>
      <View tw="w-full pb-2 h-2/6 flex-row bg-[#2c935f]">
        <ScrollView horizontal={true}>
          {players.map((player = { name: "", color: "" }, index = 0) => (
            <TouchableOpacity
              onPress={() => confirm(player.name)}
              key={player.name}
              style={{ backgroundColor: player.color }}
              tw="mx-1 p-2 rounded-xl border-4 border-white">
              <Text tw="text-md font-extrabold">{player.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
