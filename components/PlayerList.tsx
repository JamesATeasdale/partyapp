import { Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";
import Animated, { ZoomIn } from "react-native-reanimated";
import { theme } from "../assets/colors";
import { useRoute } from "@react-navigation/native";

export default function PlayerList({
  warn,
  setWarn,
  setIsAdd,
  setPlayers,
  players,
}) {
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

  if (warn) setTimeout(() => setWarn(false), 300);

  return (
    <ScrollView tw="w-11/12 max-h-40">
      <View
        tw="h-full w-full absolute "
        style={{ backgroundColor: pageTheme.fg, opacity: 0.5 }}
      />
      <View tw="flex-row flex-wrap justify-center">
        {players.length === 0 && (
          <Animated.View tw="px-2 m-1">
            <TouchableOpacity onPress={() => setIsAdd(true)}>
              <Text tw="text-2xl font-bold text-white p-2">Add a Player</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
        {players.map((player = { name: "", colour: "" }) => (
          <Animated.View
            key={player.name}
            entering={ZoomIn.duration(Math.floor(Math.random() * 1200))}>
            <TouchableOpacity tw="px-2" onPress={() => confirm(player.name)}>
              <Text
                numberOfLines={1}
                tw="text-5xl font-bold text-white"
                style={{
                  color: player.colour,
                }}>
                {player.name}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </ScrollView>
  );
}
