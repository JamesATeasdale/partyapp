import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Animated, { FadeIn, ZoomIn } from "react-native-reanimated";
import PlayerList from "../components/PlayerList";
import { useState, useEffect } from "react";
import Sets from "../components/Sets";
import AddPlayerForm from "../components/AddPlayerForm";
import colors from "../assets/colors";
import BalloonTransition from "../components/BalloonsTransition";

export default function Welcome({ page, setPage, players, setPlayers }) {
  const [isAdd, setIsAdd] = useState(false);
  const [err, setErr] = useState("");

  return (
    <View tw="items-center h-full bg-[#190927]">
      <BalloonTransition players={players} page={page} />
      {err && (
        <View tw="absolute w-full top-0 bg-red-900 items-center">
          <Text tw="text-white font-extrabold text-xl">{err}</Text>
        </View>
      )}
      <View tw="w-11/12 m-6 flex-row bg-[#341651] p-4 rounded-3xl justify-center">
        {"Party Animals".split("").map((letter, index) => {
          return (
            <Animated.View key={index} entering={ZoomIn.duration(index * 200)}>
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
      <Sets setPage={setPage} />
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
