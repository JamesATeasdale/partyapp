import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useState } from "react";
import { multi, theme } from "../assets/colours";
import { useRoute } from "@react-navigation/native";

export default function AddPlayerForm({
  setErr,
  setIsAdd,
  players,
  setPlayers,
}) {
  const [addPlayer, setAddPlayer] = useState({
    name: "",
    colour: multi[Math.floor(Math.random() * multi.length)],
    score: 0,
    tod: "na",
    fastQ: false,
  });
  const route = useRoute();
  const pageTheme = theme(route.name);

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      tw="h-full w-full absolute items-center  justify-center items-center rounded-">
      <Animated.View tw="w-full h-full absolute bg-black opacity-70" />
      <View
        tw=" w-11/12 absolute items-center space-y-8 py-6 rounded-lg"
        style={{ backgroundColor: pageTheme.fg }}>
        <Text tw="text-5xl font-extrabold text-white">Enter a Name:</Text>
        <TextInput
          maxLength={12}
          autoFocus={true}
          tw="bg-white w-5/6"
          onChangeText={(text) => setAddPlayer({ ...addPlayer, name: text })}
        />
        <View
          tw="flex-row items-center w-5/6 justify-center rounded-lg"
          style={{ backgroundColor: pageTheme.bg }}>
          <TouchableOpacity
            tw="items-center basis-1/3 rounded-l-lg py-4 px-2"
            onPress={() => setAddPlayer({ ...addPlayer, tod: "na" })}
            style={addPlayer.tod === "na" && { backgroundColor: "red" }}>
            <Text tw="text-3xl">😇</Text>
            <Text tw="text-2xl text-white font-extrabold">SFW</Text>
          </TouchableOpacity>
          <TouchableOpacity
            tw="items-center basis-1/3 py-4 px-2"
            onPress={() => setAddPlayer({ ...addPlayer, tod: "" })}
            style={addPlayer.tod === "" && { backgroundColor: "red" }}>
            <Text tw="text-3xl">😏</Text>
            <Text tw="text-2xl text-white font-extrabold">Both</Text>
          </TouchableOpacity>
          <TouchableOpacity
            tw="items-center basis-1/3 rounded-r-lg py-4 px-2"
            onPress={() => setAddPlayer({ ...addPlayer, tod: "explicit" })}
            style={addPlayer.tod === "explicit" && { backgroundColor: "red" }}>
            <Text tw="text-3xl">😈</Text>
            <Text tw="text-2xl text-white font-extrabold">NSFW</Text>
          </TouchableOpacity>
        </View>
        <View tw="flex-row space-x-16 mt-4 rounded-md">
          <TouchableOpacity
            tw=" bg-white pt-2 px-6 rounded-md"
            onPress={() => setIsAdd(false)}>
            <Text tw="font-bold text-5xl">Exit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            tw="bg-white pt-2 px-6 rounded-md"
            onPress={() => {
              if (players.find((player) => player.name === addPlayer.name))
                setErr("Player already exists");
              else if (players.length > 16) setErr("Too Many Players");
              else if (addPlayer.name.length < 3) setErr("Too Short");
              else {
                setPlayers([...players, addPlayer]);
                setErr("");
                setIsAdd(false);
              }
            }}>
            <Text tw="font-bold text-5xl">Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}
