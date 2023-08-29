import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Animated, {
  ZoomIn,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { theme } from "../assets/colours";

export default function FlipCard({
  shuffledPlayers,
  setShuffledPlayers,
  counter,
  shuffledQuestion,
  setWin,
  removeQuestion,
  setNewGame,
  players,
  setPlayers,
  setValue,
  newGame,
}) {
  const [reveal, setReveal] = useState(false);
  const spin = useSharedValue<number>(0);
  const route = useRoute();
  const pageTheme = theme(route.name);

  const rStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [0, 180]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
        },
      ],
    };
  }, []);

  const bStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [180, 360]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
        },
      ],
    };
  }, []);
  if (newGame && !counter && shuffledPlayers[0].fastQ && !reveal) {
    setReveal(true);
    spin.value = spin.value ? 0 : 1;
  }
  return (
    <TouchableOpacity
      onPress={() => {
        setReveal(true);
        spin.value = spin.value ? 0 : 1;
      }}
      disabled={shuffledPlayers[0].fastQ || reveal}
      tw="items-center h-5/6 w-11/12 rounded-lg"
      style={{ backgroundColor: pageTheme.bg }}>
      <Animated.View
        tw="absolute h-full rounded-lg w-full border-4"
        style={[Styles.front, rStyle, { backgroundColor: "#c0c0c0" }]}>
        <Text
          tw="text-3xl grow font-extrabold text-center"
          style={{ color: pageTheme.text }}>
          {shuffledQuestion.question}
        </Text>
        <Text
          tw="pt-2 text-7xl text-center font-black text-white"
          style={{ color: pageTheme.text }}>
          {counter && shuffledPlayers[0].fastQ ? counter : ""}
        </Text>
      </Animated.View>
      <Animated.View
        style={[Styles.back, bStyle, { backgroundColor: "#c0c0c0" }]}
        tw="absolute h-full rounded-lg w-full items-center border-4">
        <Text
          tw="text-3xl grow font-extrabold text-center"
          style={{ color: pageTheme.text }}>
          {shuffledQuestion.answer}
        </Text>
        <View tw="flex-row justify-between space-x-1">
          <TouchableOpacity
            disabled={!reveal}
            tw="grow justify-center bg-white rounded-tr-md rounded-bl-md"
            onPress={() => {
              spin.value = spin.value ? 0 : 1;
              setWin(false);
              removeQuestion();
              setReveal(false);
              setNewGame(false);
              setShuffledPlayers(
                shuffledPlayers.filter(
                  (player) => player.name !== shuffledPlayers[0].name
                )
              );
            }}>
            <Animated.Text
              tw="text-center text-6xl text-red-700 py-2"
              entering={ZoomIn}>
              ✘
            </Animated.Text>
          </TouchableOpacity>
          <TouchableOpacity
            tw="grow justify-center bg-white rounded-tl-md rounded-br-md"
            disabled={!reveal}
            onPress={() => {
              spin.value = spin.value ? 0 : 1;
              setWin(true);
              setValue(shuffledPlayers[0].fastQ ? 2 : 1);
              removeQuestion();
              setNewGame(false);
              setReveal(false);
              return Promise.resolve(
                setPlayers(
                  players.map((player) =>
                    player.name === shuffledPlayers[0].name
                      ? {
                          ...player,
                          score: (player.score += shuffledPlayers[0].fastQ
                            ? 2
                            : 1),
                        }
                      : player
                  )
                )
              ).then(() =>
                setShuffledPlayers(
                  shuffledPlayers.filter(
                    (player) => player.name !== shuffledPlayers[0].name
                  )
                )
              );
            }}>
            <Animated.Text
              style={{
                fontFamily: "Itim-Regular",
              }}
              tw="text-center text-6xl text-green-700 py-2 "
              entering={ZoomIn}>
              ✔
            </Animated.Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const Styles = StyleSheet.create({
  front: {
    backfaceVisibility: "hidden",
  },
  back: {
    backfaceVisibility: "hidden",
  },
});
