import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useState, useRef } from "react";
import { colors } from "../assets/colors";

export default function AddPlayerForm({
  setIsAdd,
  players,
  setPlayers,
  setErr,
}) {
  const [addPlayer, setAddPlayer] = useState({
    name: "",
    color: colors[Math.floor(Math.random() * colors.length)][1],
    score: 0,
  });

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      tw="w-11/12 h-48 bg-[#0f0f0f] top-1/3 absolute items-center rounded-md p-3">
      <Text tw="text-4xl font-extrabold text-white">Enter a Name:</Text>
      <TextInput
        maxLength={12}
        autoFocus={true}
        tw="bg-[#c2c2c2] w-11/12 mt-6"
        onChangeText={(text) =>
          setAddPlayer({ ...addPlayer, name: text })
        }></TextInput>
      <View tw="flex-row space-x-16 bottom-5 w-30 absolute rounded-md">
        <TouchableOpacity
          tw="w-30 bg-[#c2c2c2] h-30 p-1 px-4 rounded-md"
          onPress={() => setIsAdd(false)}>
          <Text tw="font-bold text-2xl">Exit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          tw="w-30 bg-[#c2c2c2] h-30 p-1 px-4 rounded-md"
          onPress={() => {
            const names = [];
            for (let player of players) names.push(player.name);
            if (names.includes(addPlayer.name)) setErr("Player already exists");
            else if (names.length > 16) setErr("Too Many Players");
            else if (addPlayer.name.length !== 0) {
              setPlayers([...players, addPlayer]);
              setErr("");
              setIsAdd(false);
            }
          }}>
          <Text tw="font-bold text-2xl">Add</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
