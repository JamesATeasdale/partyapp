import { Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";
import Animated, {
  ZoomIn,
  interpolate,
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
  setPlayerForm,
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
    const opacity = interpolate(progress.value, [0, 1], [0.3, 1]);

    return {
      backgroundColor,
      opacity,
    };
  });

  if (warn) setTimeout(() => setWarn(false), 300);

  return (
    <View tw="w-full h-2/5 items-center">
      <Animated.View
        tw="w-11/12 h-full absolute justify-center items-center rounded-lg max-h-40"
        style={[animatedStyle]}
      />
      <ScrollView horizontal={false} tw="w-11/12">
        <View tw="flex-row flex-wrap justify-center py-2">
          {players.length === 0 && (
            <Animated.View tw="px-2 m-1">
              <TouchableOpacity onPress={() => setPlayerForm(true)}>
                <Text
                  tw="text-4xl text-white"
                  style={{
                    fontFamily: "header",
                  }}>
                  Add a Player
                </Text>
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
                  tw="text-5xl text-white "
                  style={{
                    color: player.colour,
                    fontFamily: "text",
                  }}>
                  {player.name}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
