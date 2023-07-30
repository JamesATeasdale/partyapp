import { Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useEffect, useRef, useState } from "react";
import Animated, { PinwheelIn, ZoomOut } from "react-native-reanimated";

export default function PlayerList({ setIsAdd, setPlayers, players }) {
  function confirm(playername) {
    Alert.alert("Delete " + playername + "?", "", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Confirm",
        onPress: () => {
          const copy = [...players];
          copy.splice(copy.indexOf(playername), 1);
          setPlayers(copy);
        },
      },
    ]);
  }

  return (
    <View tw="bg-[#341651] w-11/12 h-2/6 rounded-xl">
      <ScrollView>
        <View tw="flex-row flex-wrap justify-center">
          {players.map((player = { name: "", color: "" }, index = 0) => (
            <Animated.View
              key={player.name}
              entering={PinwheelIn.duration(Math.floor(Math.random() * 1000))}>
              <TouchableOpacity
                key={player.name}
                style={{ backgroundColor: player.color }}
                tw="m-1 p-1 px-2 rounded-xl"
                onPress={() => confirm(player.name)}>
                <Text tw="text-2xl font-bold">{player.name}</Text>
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
    </View>
  );
}