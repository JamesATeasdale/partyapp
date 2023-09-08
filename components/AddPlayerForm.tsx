import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useState } from "react";
import { multi, theme } from "../assets/colours";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function playerForm({
  setErr,
  players,
  setPlayers,
  changePlayer,
  isAdd,
  setPlayerForm,
}) {
  const navigation = useNavigation();
  const [player, setPlayer] = useState(
    !isAdd
      ? { ...changePlayer }
      : {
          name: "",
          colour: multi[Math.floor(Math.random() * multi.length)],
          score: 0,
          tod: "na",
          fastQ: 0,
          quiz: ["General"],
        }
  );
  const route = useRoute();
  const pageTheme = theme(route.name);
  const quizCats = [
    "General",
    "Movies & TV",
    "Science",
    "Geography",
    "Animals",
    "Music",
    "Gaming",
  ];

  function confirm(playername) {
    Alert.alert("Delete " + playername + "?", "", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Confirm",
        onPress: () => {
          navigation.navigate("Party Box");
          setPlayers(
            [...players].filter((player) => player.name !== playername)
          );
          setPlayerForm(false);
        },
      },
    ]);
  }

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
      tw="h-full w-full absolute justify-center items-center">
      <Animated.View tw="w-full h-full absolute bg-black opacity-70" />
      <View
        tw=" w-11/12 absolute items-center  space-y-4  py-4 rounded-lg"
        style={{ backgroundColor: pageTheme.bg }}>
        <View
          tw="p-1 flex-row w-11/12 rounded-sm "
          style={{
            backgroundColor: pageTheme.fg,
          }}>
          <Text
            style={{
              fontFamily: "header",
              color: pageTheme.text,
            }}
            tw="text-4xl pr-2">
            Name:
          </Text>
          {isAdd ? (
            <TextInput
              style={{
                fontFamily: "text",
                color: player.colour,
              }}
              maxLength={12}
              value={player.name}
              autoFocus={true}
              tw="bg-purple-300 rounded-r-sm grow text-3xl"
              onChangeText={(text) => setPlayer({ ...player, name: text })}
            />
          ) : (
            <View tw="grow items-center">
              <Text
                tw=" text-4xl"
                numberOfLines={1}
                style={{
                  fontFamily: "header",
                  color: player.colour,
                }}>
                {player.name}
              </Text>
            </View>
          )}
        </View>
        <View
          tw="flex-row items-center w-11/12 justify-between"
          style={{
            backgroundColor: pageTheme.bg,
          }}>
          {todCat.map((cat) => (
            <TouchableOpacity
              key={cat}
              tw={
                "items-center basis-1/3 grow p-2 " +
                (cat === "na"
                  ? "rounded-l-sm"
                  : cat === "explicit" && "rounded-r-sm")
              }
              onPress={() => setPlayer({ ...player, tod: cat })}
              style={
                player.tod === cat
                  ? { backgroundColor: "red" }
                  : { backgroundColor: pageTheme.fg }
              }>
              <Text tw="text-3xl">
                {cat === "na" ? "😇" : cat === "explicit" ? "😈" : "😏"}
              </Text>
              <Text
                tw="text-2xl text-white pt-1"
                style={{ fontFamily: "header", color: pageTheme.text }}>
                {cat === "na" ? "SFW" : cat === "explicit" ? "NSFW" : "ANY"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View tw="flex-row flex-wrap w-full justify-center">
          {quizCats.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() =>
                player.quiz.includes(category) && player.quiz.length > 1
                  ? setPlayer({
                      ...player,
                      quiz: [...player.quiz.filter((cat) => category !== cat)],
                    })
                  : !player.quiz.includes(category) &&
                    setPlayer({
                      ...player,
                      quiz: [...player.quiz, category],
                    })
              }>
              <Text
                style={
                  player.quiz.includes(category)
                    ? {
                        fontFamily: "text",
                        backgroundColor: quizCatsBG[quizCats.indexOf(category)],
                      }
                    : { fontFamily: "text" }
                }
                tw="p-2 text-3xl text-white rounded-sm bg-gray-400 m-1">
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity onPress={() => confirm(player.name)}>
          {!isAdd && (
            <Text
              style={{ fontFamily: "header" }}
              tw="bg-red-600 text-4xl py-2 px-3 rounded-sm text-white">
              DELETE
            </Text>
          )}
        </TouchableOpacity>
        <View tw="flex-row w-11/12 justify-between rounded-sm">
          <TouchableOpacity
            tw="basis-2/5 justify-center"
            onPress={() => setPlayerForm(false)}>
            <Text
              tw="mx-1 py-2 text-center text-4xl rounded-sm"
              style={{
                fontFamily: "header",
                color: pageTheme.text,
                backgroundColor: pageTheme.fg,
              }}>
              Exit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            tw="basis-2/5 rounded-sm justify-center"
            onPress={() => {
              if (players.find((playr) => playr.name === player.name) && isAdd)
                setErr("Player already exists");
              else if (
                players.find((playr) => playr.name === player.name) &&
                !isAdd
              ) {
                setPlayers(
                  [...players].map((playr) =>
                    playr.name === player.name ? player : playr
                  )
                );
                setPlayerForm(false);
              } else if (players.length > 16) setErr("Too Many Players");
              else if (player.name.length < 3) setErr("Too Short");
              else {
                setPlayers([...players, player]);
                setErr("");
                setPlayerForm(false);
              }
            }}>
            <Text
              tw="mx-1 py-2 text-center text-4xl rounded-sm"
              style={{
                fontFamily: "header",
                color: pageTheme.text,
                backgroundColor: pageTheme.fg,
              }}>
              {isAdd ? "Add" : "OK"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}
