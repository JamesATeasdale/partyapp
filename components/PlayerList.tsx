import { Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";
import Animated, {
  ZoomIn,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { theme } from "../assets/colors";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";

export default function PlayerList({
  them,
  setThem,
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
    return withTiming(them ? 1 : 0, { duration: 300 });
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

  if (them) setTimeout(() => setThem(false), 300);

  return (
    <Animated.View
      tw="w-11/12 rounded-lg my-2 min-h-14 max-h-56"
      style={[animatedStyle]}>
      <ScrollView>
        <View tw="flex-row flex-wrap justify-center">
          {players.length === 0 && (
            <Animated.View tw="px-2 m-1 rounded-md">
              <TouchableOpacity onPress={() => setIsAdd(true)}>
                <Text tw="text-2xl font-bold text-white p-2">Add a Player</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
          {players.map((player = { name: "", colour: "" }, index = 0) => (
            <Animated.View
              key={player.name}
              entering={ZoomIn.duration(Math.floor(Math.random() * 1200))}>
              <TouchableOpacity
                key={player.name}
                style={{
                  backgroundColor: player.colour,
                }}
                tw="px-2 m-1 rounded-md"
                onPress={() => confirm(player.name)}>
                <Text tw="text-2xl font-bold text-white p-2">
                  {player.name}
                </Text>
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
    </Animated.View>
  );
}
