import { View, Text, TextInput, TouchableOpacity } from "react-native";
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
    quiz: ["na"],
  });
  const route = useRoute();
  const pageTheme = theme(route.name);
  const quizCats = [
    "General",
    "Movies & TV",
    "Science",
    "Geography",
    "Technology",
    "Animals",
    "Music",
  ];

  const quizCatsReal = [
    "na",
    "moviesandtv",
    "science",
    "geography",
    "technology",
    "animals",
    "music",
  ];

  const quizCatsBG = [
    "red",
    "blue",
    "green",
    "purple",
    "orange",
    "brown",
    "black",
  ];
  const todCat = ["na", "", "explicit"];

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      tw="h-full w-full absolute justify-center items-center rounded-">
      <Animated.View tw="w-full h-full absolute bg-black opacity-70" />
      <View
        tw=" w-11/12 absolute items-center  space-y-4  py-4 rounded-lg"
        style={{ backgroundColor: pageTheme.fg }}>
        <View tw="flex-row w-11/12">
          <Text
            style={{
              fontFamily: "Itim-Regular",
            }}
            tw="text-3xl basis-2/6 font-extrabold text-white">
            Name:
          </Text>
          <TextInput
            maxLength={12}
            autoFocus={true}
            tw="bg-white grow text-3xl font-extrabold"
            onChangeText={(text) => setAddPlayer({ ...addPlayer, name: text })}
          />
        </View>
        <View
          tw="flex-row items-center w-11/12 justify-between rounded-lg"
          style={{
            backgroundColor: pageTheme.bg,
          }}>
          {todCat.map((cat) => (
            <TouchableOpacity
              tw={
                "items-center basis-1/3 grow p-2 " +
                (cat === "na"
                  ? "rounded-l-lg"
                  : cat === "explicit" && "rounded-r-lg")
              }
              onPress={() => setAddPlayer({ ...addPlayer, tod: cat })}
              style={addPlayer.tod === cat && { backgroundColor: "red" }}>
              <Text tw="text-3xl">
                {cat === "na" ? "😇" : cat === "explicit" ? "😈" : "😏"}
              </Text>
              <Text tw="text-xl text-white font-extrabold">
                {cat === "na" ? "SFW" : cat === "explicit" ? "NSFW" : "ANY"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View tw="flex-row flex-wrap w-full justify-center">
          {quizCatsReal.map((category, i) => (
            <TouchableOpacity
              onPress={() =>
                addPlayer.quiz.includes(category) && addPlayer.quiz.length > 1
                  ? setAddPlayer({
                      ...addPlayer,
                      quiz: [
                        ...addPlayer.quiz.filter((cat) => category !== cat),
                      ],
                    })
                  : !addPlayer.quiz.includes(category) &&
                    setAddPlayer({
                      ...addPlayer,
                      quiz: [...addPlayer.quiz, category],
                    })
              }>
              <Text
                style={
                  addPlayer.quiz.includes(category) && {
                    backgroundColor: quizCatsBG[i],
                  }
                }
                tw="p-2 text-2xl text-white bg-gray-400 font-extrabold m-1">
                {quizCats[i]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View tw="flex-row w-11/12 justify-between rounded-md">
          <TouchableOpacity
            tw=" bg-white pt-2 px-6 rounded-md"
            onPress={() => setIsAdd(false)}>
            <Text
              tw="font-bold p-2 text-5xl"
              style={{
                fontFamily: "Itim-Regular",
              }}>
              Exit
            </Text>
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
            <Text
              tw="font-bold p-2 text-5xl"
              style={{
                fontFamily: "Itim-Regular",
              }}>
              Add
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}
