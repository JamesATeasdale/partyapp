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
      <View tw="m-6 flex-row">
        {title.map((letter, index) => {
          return (
            <Animated.View entering={FadeIn.duration(index * 200)}>
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
      <View tw="w-full h-1/6 m-4 bg-[#00adf0] border-2">
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
        <ScrollView>
          <TouchableOpacity
            onPress={() => {
              setPage("truth or dare");
            }}>
            <Text tw="text-center p-6 text-xl font-black">Truth Or Dare</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <Sets />
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
