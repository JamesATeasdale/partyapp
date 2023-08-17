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

  useEffect(() => LottieRef.current?.play(), [shuffledPlayers]);

  if (shuffledPlayers.length === 0) {
    return Promise.resolve(setShuffledPlayers(shuffle([...players]))).then(
      () => (shuffledPlayer = shuffledPlayers[0])
    );
  }
  if (shuffledQuestions.length === 0)
    setShuffledQuestions(shuffle([...fastquizquestions]));
  if (!shuffledQuestion.question) shuffledQuestion = shuffledQuestions[0];

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
        tw="flex-col w-11/12 h-3/6 rounded-xl mb-4"
        style={{ backgroundColor: pageTheme.fg }}>
        <View
          tw="basis-1/6 flex-row rounded-t-xl p-1"
          style={{ backgroundColor: shuffledPlayer.colour }}>
          <View tw="basis-2/3 m-2">
            <Text tw="font-black text-gray-300 text-3xl ">
              {shuffledPlayer.name}
            </Text>
          </View>
          <View tw="flex-row right-0 absolute">
            <Text
              tw="m-1 text-xl p-2 rounded-l-xl text-gray-300 bg-gray-600"
              style={{ backgroundColor: pageTheme.fg }}>
              {"👎"}
            </Text>
            <Text
              tw="m-1 text-xl p-2 rounded-r-xl text-gray-300 bg-gray-600"
              style={{ backgroundColor: pageTheme.fg }}>
              {"👍"}
            </Text>
          </View>
        </View>
        {!newGame ? (
          <TouchableOpacity
            tw="basis-5/6 justify-center"
            onPress={() => {
              setNewGame(!newGame);
              timer();
            }}>
            <Text tw=" text-white font-bold text-4xl text-center justify-center">
              {newGame ? counter : "Click to Start"}
            </Text>
          </TouchableOpacity>
        ) : (
          <View tw="basis-3/6 justify-center">
            <Text tw="text-white font-bold text-4xl text-center">
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
        ) : newGame ? (
          <View tw="basis-2/6 flex-row justify-center">
            <TouchableOpacity
              tw="basis-1/2 h-full justify-center bg-white border-r-2"
              onPress={() => {
                setNewGame(!newGame);
                setShuffledPlayers(
                  shuffledPlayers.filter(
                    (player) => player.name !== shuffledPlayer.name
                  )
                );
              }}>
              <Animated.Text
                tw="text-center text-8xl text-red-700"
                entering={ZoomIn}>
                ✘
              </Animated.Text>
            </TouchableOpacity>
            <TouchableOpacity
              tw="basis-1/2 h-full justify-center bg-white border-l-2"
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
                tw="text-center text-8xl text-green-700"
                entering={ZoomIn}>
                ✔
              </Animated.Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
}
