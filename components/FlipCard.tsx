import { useRoute } from "@react-navigation/native";
import { useRef, useState } from "react";
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
  shuffledQuestion,
  setWin,
  removeQuestion,
  setNewGame,
  players,
  setPlayers,
  fastQ,
}) {
  const [reveal, setReveal] = useState(false);
  const [start, setStart] = useState(true);
  const spin = useSharedValue(0);
  const route = useRoute();
  const pageTheme = theme(route.name);
  const [counter, setCounter] = useState(fastQ);
  const countRef = useRef(null);
  countRef.current = counter;

  function timer() {
    const countInt = setInterval(
      () =>
        countRef.current > 0
          ? setCounter((counter) => counter - 1)
          : clearInterval(countInt),
      1000
    );
  }

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
  if (!counter && fastQ > 0 && !reveal) {
    setReveal(true);
    spin.value = spin.value ? 0 : 1;
  }
  if (counter && fastQ > 0 && !reveal && start) {
    setStart(false);
    timer();
  }
  return (
    <TouchableOpacity
      onPress={() => {
        setReveal(true);
        spin.value = spin.value ? 0 : 1;
      }}
      disabled={fastQ > 0}
      tw="items-center h-5/6 w-11/12 rounded-lg"
      style={{ backgroundColor: pageTheme.bg }}>
      <Animated.View
        tw="absolute h-full rounded-lg w-full border-4 px-2"
        style={[Styles.front, rStyle, { backgroundColor: "#c0c0c0" }]}>
        <Text
          tw="text-3xl grow text-center pt-2"
          style={{ color: pageTheme.text, fontFamily: "text" }}>
          {shuffledQuestion.question}
        </Text>
        <Text
          tw="pt-2 text-6xl pt-2 text-center text-white"
          style={{ color: pageTheme.text, fontFamily: "header" }}>
          {counter && fastQ ? counter : ""}
        </Text>
      </Animated.View>
      <Animated.View
        style={[Styles.back, bStyle, { backgroundColor: "#c0c0c0" }]}
        tw="absolute h-full rounded-lg w-full items-center border-4">
        <Text
          tw="text-3xl pt-2 grow text-center"
          style={{ color: pageTheme.text, fontFamily: "text" }}>
          {shuffledQuestion.answer}
        </Text>
        <View tw="flex-row justify-between space-x-1">
          <TouchableOpacity
            disabled={!reveal}
            tw="grow justify-center bg-white rounded-tr-md rounded-bl-md"
            onPress={() => {
              setWin(0);
              removeQuestion();
              setReveal(false);
              setNewGame(false);
              setShuffledPlayers(
                shuffledPlayers.filter(
                  (player) => player.name !== shuffledPlayers[0].name
                )
              );
              setPlayers(
                players.map((player) =>
                  player.name === shuffledPlayers[0].name
                    ? {
                        ...player,
                        fastQ: fastQ,
                      }
                    : player
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
              setReveal(false);
              setNewGame(false);
              setWin(fastQ ? 5 - fastQ / 4 : 1);
              removeQuestion();
              setPlayers(
                players
                  .map((player) =>
                    player.name === shuffledPlayers[0].name
                      ? {
                          ...player,
                          score: (player.score += fastQ ? 5 - fastQ / 4 : 1),
                          fastQ: fastQ,
                        }
                      : player
                  )
                  .sort((a, b) => b.score - a.score)
              );
              setShuffledPlayers(
                shuffledPlayers.filter(
                  (player) => player.name !== shuffledPlayers[0].name
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
