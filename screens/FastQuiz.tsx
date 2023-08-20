import { View, Text, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import GameRanking from "../components/GameRanking";
import Header from "../components/Header";
import { theme } from "../assets/colors";
import { useRoute } from "@react-navigation/native";
import shuffle from "../hooks/shuffleArray";
import fastquizquestions from "../assets/fastquizquestions.json";
import { useEffect, useState, useRef } from "react";
import Animated, { ZoomIn } from "react-native-reanimated";

export default function FastQuiz({ players, setPlayers }) {
  const [newGame, setNewGame] = useState(false);
  const LottieRef = useRef(null);
  const LottieRef2 = useRef(null);
  const route = useRoute();
  const pageTheme = theme(route.name);
  const [category, setCategory] = useState("na");
  const [counter, setCounter] = useState(7);
  const countRef = useRef(null);
  countRef.current = counter;
  const [shuffledPlayers, setShuffledPlayers] = useState(shuffle([...players]));
  const [shuffledQuestions, setShuffledQuestions] = useState(
    shuffle([...fastquizquestions].filter((item) => item.category === category))
  );
  let shuffledQuestion = { question: "" };
  let shuffledPlayer = shuffledPlayers[0];

  function timer() {
    const countInt = setInterval(
      () =>
        countRef.current > 0
          ? setCounter((counter) => counter - 1)
          : clearInterval(countInt),
      1000
    );
    setCounter(7);
    setShuffledQuestions(
      [...shuffledQuestions].filter(
        (item) => item.question !== shuffledQuestion.question
      )
    );
    LottieRef2.current?.play();
  }

  console.log(counter);

  if (shuffledPlayers.length === 0) {
    return Promise.resolve(setShuffledPlayers(shuffle([...players]))).then(
      () => (shuffledPlayer = shuffledPlayers[0])
    );
  }

  if (shuffledQuestions.length === 0)
    setShuffledQuestions(shuffle([...fastquizquestions]));
  const intro = [
    <Text tw="text-white font-bold text-5xl text-center">
      <Text>It's </Text>
      <Text style={{ color: shuffledPlayer.colour }}>
        {shuffledPlayer.name}
      </Text>
      <Text>'s time to shine</Text>
    </Text>,
    <Text tw="text-white font-bold text-5xl text-center">
      {shuffledPlayer.name}
    </Text>,
  ];

  return (
    <View
      tw="h-full items-center justify-between"
      style={{ backgroundColor: pageTheme.bg }}>
      <LottieView
        tw="absolute h-full w-full "
        ref={LottieRef}
        source={require("../assets/fireworks.json")}
        loop={false}
        speed={1}
      />
      <View tw="w-full h-2/6 items-center">
        <Header />
        <GameRanking players={players} setPlayers={setPlayers} />
      </View>
      <View
        tw="flex-col w-11/12 h-3/6 rounded-xl my-4 pt-2"
        style={{ backgroundColor: pageTheme.fg }}>
        {newGame && (
          <View tw="flex-row top-0 w-full absolute justify-between">
            <Text
              tw=" pl-4 pt-2 text-white text-5xl basis-2/3 font-extrabold self-end"
              style={{ color: shuffledPlayer.colour }}
              numberOfLines={1}>
              {shuffledPlayer.name}
            </Text>
            <View tw="flex-row">
              <Text
                tw="m-1 text-xl p-2 rounded-l-xl text-gray-300"
                style={{ backgroundColor: pageTheme.bg }}>
                {"👎"}
              </Text>
              <Text
                tw="m-1 text-xl p-2 rounded-r-xl text-gray-300"
                style={{ backgroundColor: pageTheme.bg }}>
                {"👍"}
              </Text>
            </View>
          </View>
        )}
        {!newGame ? (
          <TouchableOpacity
            tw="justify-center"
            onPress={() => {
              setNewGame(!newGame);
              timer();
            }}>
            <View tw="h-full items-center justify-center px-4">
              {newGame ? (
                <Text>{counter}</Text>
              ) : (
                intro[Math.floor(Math.random() * intro.length)]
              )}
            </View>
          </TouchableOpacity>
        ) : (
          <View tw="basis-4/6 justify-center">
            <Text tw=" pt-6 px-2 text-white font-bold text-4xl text-center">
              {counter
                ? shuffledQuestions[0].question
                : shuffledQuestions[0].answer}
            </Text>
          </View>
        )}
        {counter ? (
          <View tw="basis-2/6 flex-row justify-center items-center">
            <Text tw="text-7xl font-black text-white">{counter}</Text>
          </View>
        ) : (
          newGame && (
            <View tw="basis-2/6 flex-row justify-center space-x-12 pb-2">
              <TouchableOpacity
                tw="basis-1/3 justify-center bg-white rounded-full"
                onPress={() => {
                  setNewGame(!newGame);
                  setShuffledPlayers(
                    shuffledPlayers.filter(
                      (player) => player.name !== shuffledPlayer.name
                    )
                  );
                }}>
                <Animated.Text
                  tw="text-center text-7xl text-red-700"
                  entering={ZoomIn}>
                  ✘
                </Animated.Text>
              </TouchableOpacity>
              <TouchableOpacity
                tw="basis-1/3 justify-center bg-white rounded-full"
                onPress={() => {
                  setNewGame(!newGame);
                  LottieRef.current.play();
                  return Promise.resolve(
                    setPlayers(
                      players.map((player) =>
                        player.name === shuffledPlayer.name
                          ? { ...player, score: (player.score += 1) }
                          : player
                      )
                    )
                  ).then(() =>
                    setShuffledPlayers(
                      shuffledPlayers.filter(
                        (player) => player.name !== shuffledPlayer.name
                      )
                    )
                  );
                }}>
                <Animated.Text
                  tw="text-center text-7xl text-green-700"
                  entering={ZoomIn}>
                  ✔
                </Animated.Text>
              </TouchableOpacity>
            </View>
          )
        )}
      </View>
    </View>
  );
}
