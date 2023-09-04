import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useState } from "react";
import { multi, theme } from "../assets/colours";
import { useRoute } from "@react-navigation/native";

export default function playerForm({
  setErr,
  setOk,
  players,
  setPlayers,
  ok,
  isAdd,
}) {
  const [player, setPlayer] = useState(
    !isAdd
      ? { ...ok }
      : {
          name: "",
          colour: multi[Math.floor(Math.random() * multi.length)],
          score: 0,
          tod: "na",
          fastQ: false,
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
  ];

  const quizCatsBG = ["red", "blue", "green", "purple", "orange", "brown"];
  const todCat = ["na", "", "explicit"];
  console.log(player);

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
              fontFamily: "text",
            }}
            tw="text-4xl basis-2/6 text-gray-600">
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
              tw="bg-white grow basis-4/6 text-3xl"
              onChangeText={(text) => setPlayer({ ...player, name: text })}
            />
          ) : (
            <Text
              tw="basis-4/6 text-white grow text-4xl"
              numberOfLines={1}
              style={{
                fontFamily: "text",
                color: player.colour,
              }}>
              {player.name}
            </Text>
          )}
        </View>
        <View
          tw="flex-row items-center w-11/12 justify-between rounded-lg"
          style={{
            backgroundColor: pageTheme.bg,
          }}>
          {todCat.map((cat) => (
            <TouchableOpacity
              key={cat}
              tw={
                "items-center basis-1/3 grow p-2 " +
                (cat === "na"
                  ? "rounded-l-lg"
                  : cat === "explicit" && "rounded-r-lg")
              }
              onPress={() => setPlayer({ ...player, tod: cat })}
              style={player.tod === cat && { backgroundColor: "red" }}>
              <Text tw="text-3xl">
                {cat === "na" ? "😇" : cat === "explicit" ? "😈" : "😏"}
              </Text>
              <Text tw="text-xl text-white pt-1" style={{ fontFamily: "fun" }}>
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
                        fontFamily: "fun",
                        backgroundColor: quizCatsBG[quizCats.indexOf(category)],
                      }
                    : { fontFamily: "fun" }
                }
                tw="p-2 text-xl text-white bg-gray-400 m-1">
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View tw="flex-row w-11/12 justify-between rounded-md">
          <TouchableOpacity
            tw="basis-2/5 bg-white pt-2  rounded-md justify-center"
            onPress={() => setOk({ name: "" })}>
            <Text
              tw="pt-4 w-full text-center text-5xl"
              style={{
                fontFamily: "fun",
              }}>
              Exit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            tw="basis-2/5 bg-white pt-2  rounded-md justify-center"
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
                setOk({ name: "" });
              } else if (players.length > 16) setErr("Too Many Players");
              else if (player.name.length < 3) setErr("Too Short");
              else {
                setPlayers([...players, player]);
                setErr("");
                setOk({ name: "" });
              }
            }}>
            <Text
              tw="pt-4 w-full text-center text-5xl"
              style={{
                fontFamily: "fun",
              }}>
              Add
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}
