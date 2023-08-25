import { Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";
import Animated, {
  ZoomIn,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { theme } from "../assets/colours";
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
  const progress = useDerivedValue(() => {
    return withTiming(warn ? 1 : 0, { duration: 300 });
  });
  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [pageTheme.fg, "red"]
    );

    return {
      backgroundColor,
    };
  });

  if (warn) setTimeout(() => setWarn(false), 300);

  return (
    <Animated.View tw="w-11/12 rounded-lg max-h-40" style={[animatedStyle]}>
      <ScrollView tw="w-full my-2">
        <View tw="h-full w-full absolute " />
        <View tw="flex-row flex-wrap justify-center">
          {players.length === 0 && (
            <Animated.View tw="px-2 m-1">
              <TouchableOpacity onPress={() => setIsAdd(true)}>
                <Text tw="text-4xl font-bold text-white">Add a Player</Text>
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
                  tw="text-4xl font-bold text-white py-2"
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
    </Animated.View>
  );
}
