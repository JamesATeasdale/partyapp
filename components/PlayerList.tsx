import { Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";
import Animated, { PinwheelIn, ZoomIn, ZoomOut } from "react-native-reanimated";

export default function PlayerList({ setIsAdd, setPlayers, players }) {
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
    <View tw="bg-[#341651] w-11/12 max-h-2/6 rounded-xl">
      <ScrollView>
        <View tw="flex-row flex-wrap justify-center pb-8">
          {players.map((player = { name: "", color: "" }, index = 0) => (
            <Animated.View
              key={player.name}
              entering={ZoomIn.duration(Math.floor(Math.random() * 1200))}>
              <TouchableOpacity
                key={player.name}
                style={{ backgroundColor: player.color }}
                tw="px-2 m-1 rounded-xl border-white border-4"
                onPress={() => confirm(player.name)}>
                <Text tw="text-2xl font-bold">{player.name}</Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => setIsAdd(true)}
        tw="bottom-1 right-1 absolute h-12 w-12 bg-[#ee1b24] justify-center rounded-xl border-white border-2">
        <Text tw="text-center text-4xl">+</Text>
      </TouchableOpacity>
    </View>
  );
}
