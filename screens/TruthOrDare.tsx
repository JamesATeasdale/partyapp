import { createRef, useRef, useState } from "react";
import {
  FlatList,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  Animated,
} from "react-native";
import BalloonTransition from "../components/BalloonsTransition";
import GameRanking from "../components/GameRanking";
import { ZoomIn } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

export default function TruthOrDare({ players, setPlayers }) {
  const navigation = useNavigation();

  return (
    <View tw="h-full items-center bg-[#0c3713]">
      <BalloonTransition players={players} />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Party Animals");
        }}
        tw="w-11/12 m-2 flex-row bg-[#2c935f] p-4 rounded-3xl justify-center">
        {"Truth or Dare".split("").map((letter, index) => {
          return (
            <Animated.View key={index} entering={ZoomIn.duration(index * 200)}>
              <Text
                style={{
                  fontSize: 40,
                  fontFamily: "Caprasimo-Regular",
                }}>
                {letter}
              </Text>
            </Animated.View>
          );
        })}
      </TouchableOpacity>
      <GameRanking players={players} />
    </View>
  );
}
