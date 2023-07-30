import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import PlayerList from "../components/PlayerList";
import { useState, useEffect } from "react";
import Sets from "../components/Sets";
import AddPlayerForm from "../components/AddPlayerForm";
import colors from "../assets/colors";

export default function Welcome({ setPage, players, setPlayers }) {
  const [isAdd, setIsAdd] = useState(false);
  const [err, setErr] = useState("");
  const [title, setTitle] = useState("Party Animals".split(""));

  return (
    <View tw="items-center h-full">
      {err && (
        <View tw="absolute w-full top-0 bg-red-900 items-center">
          <Text tw="text-white font-extrabold text-xl">{err}</Text>
        </View>
      )}
      <View tw="w-11/12 m-6 flex-row bg-[#341651] p-4 rounded-3xl justify-center">
        {title.map((letter, index) => {
          return (
            <Animated.View key={index} entering={FadeIn.duration(index * 200)}>
              <Text
                style={{
                  fontSize: 40,
                  fontFamily: "Caprasimo-Regular",
                  color: colors[Math.floor(Math.random() * colors.length)][1],
                }}>
                {letter}
              </Text>
            </Animated.View>
          );
        })}
      </View>
      <PlayerList
        players={players}
        setPlayers={setPlayers}
        setIsAdd={setIsAdd}
      />
      <View tw="flex w-11/12 m-4 bg-[#341651] rounded-xl h-2/6 flex-row flex-wrap p-2 content-center">
        <TouchableOpacity
          tw="bg-red-900 basis-1/2 h-1/2 justify-center"
          onPress={() => {
            setPage("truth or dare");
          }}>
          <Text tw="text-center p-6 text-xl font-black ">Truth Or Dare</Text>
        </TouchableOpacity>
        <TouchableOpacity
          tw="bg-blue-900 basis-1/2 h-1/2 justify-center"
          onPress={() => {
            setPage("truth or dare");
          }}>
          <Text tw="text-center p-6 text-xl font-black">Truth Or Dare</Text>
        </TouchableOpacity>
        <TouchableOpacity
          tw="bg-blue-900 basis-1/2 h-1/2 justify-center"
          onPress={() => {
            setPage("truth or dare");
          }}>
          <Text tw="text-center p-6 text-xl font-black">Truth Or Dare</Text>
        </TouchableOpacity>
        <TouchableOpacity
          tw="bg-green-900 basis-1/2 h-1/2 justify-center"
          onPress={() => {
            setPage("truth or dare");
          }}>
          <Text tw="text-center p-6 text-xl font-black">Truth Or Dare</Text>
        </TouchableOpacity>
        <View
          style={{
            width: 144,
            borderBottomColor: "#ee1b24",
            borderBottomWidth: 45,
            borderLeftWidth: 45,
            borderRightWidth: 45,
            borderRightColor: "transparent",
            borderLeftColor: "transparent",
            transform: [{ rotate: "315deg" }],
            top: 12,
            left: -37,
            position: "absolute",
          }}
          tw="items-center">
          <Text
            style={{
              fontSize: 26,
              color: "white",
              position: "absolute",
              marginTop: 0,
            }}>
            Sets
          </Text>
        </View>
      </View>
      {isAdd && (
        <AddPlayerForm
          players={players}
          setPlayers={setPlayers}
          setIsAdd={setIsAdd}
          setErr={setErr}
        />
      )}
    </View>
  );
}
