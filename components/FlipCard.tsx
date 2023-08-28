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
      tw="items-center px-3 h-full">
      <Animated.View
        tw="items-center justify-center absolute h-5/6 rounded-lg w-full"
        style={[Styles.front, rStyle, { backgroundColor: pageTheme.bg }]}>
        <Text
          tw="text-4xl grow w- font-extrabold text-center"
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
        style={[Styles.back, bStyle, { backgroundColor: pageTheme.bg }]}
        tw="items-center justify-center absolute h-5/6 rounded-lg w-full">
        <Text
          tw="text-4xl grow font-extrabold"
          style={{ color: pageTheme.text }}>
          {shuffledQuestion.answer}
        </Text>
        <View tw="flex-row">
          <TouchableOpacity
            disabled={!reveal}
            tw="basis-1/2 justify-center bg-white border-r-2"
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
              tw="text-center text-7xl text-red-700 p-4"
              entering={ZoomIn}>
              ✘
            </Animated.Text>
          </TouchableOpacity>
          <TouchableOpacity
            tw="basis-1/2 justify-center bg-white border-l-2"
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
              tw="text-center text-7xl text-green-700 p-4"
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
