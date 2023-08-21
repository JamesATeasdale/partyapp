import { View, Text, TouchableOpacity, Image } from "react-native";
import LottieView from "lottie-react-native";
import GameRanking from "../components/GameRanking";
import Header from "../components/Header";
import { theme } from "../assets/colors";
import { useRoute } from "@react-navigation/native";
import shuffle from "../hooks/shuffleArray";
import fastquizquestions from "../assets/fastquizquestions.json";
import { useEffect, useState, useRef } from "react";
import Animated, { ZoomIn } from "react-native-reanimated";
import CardBanner from "../components/CardBanner";

export default function FastQuiz({ players, setPlayers }) {
  const [newGame, setNewGame] = useState(false);
  const LottieRef = useRef(null);
  const LottieRef2 = useRef(null);
  const route = useRoute();
  const pageTheme = theme(route.name);
  const [counter, setCounter] = useState(7);
  const countRef = useRef(null);
  countRef.current = counter;
  const [shuffledPlayers, setShuffledPlayers] = useState(shuffle([...players]));
  const [shuffledQuestions, setShuffledQuestions] = useState(
    shuffle([...fastquizquestions])
  );
  useEffect(() => LottieRef2.current?.play(), [shuffledPlayers]);

  function timer() {
    const countInt = setInterval(
      () =>
        countRef.current > 0
          ? setCounter((counter) => counter - 1)
          : clearInterval(countInt),
      1000
    );
    setCounter(7);
    const questionsCopy = [...shuffledQuestions];
    questionsCopy.splice(
      shuffledQuestions.indexOf(
        shuffledQuestions.find(
          (cat) => cat.category === shuffledPlayers[0].category
        )
      ),
      1
    );
    setShuffledQuestions(questionsCopy);
  }

  if (shuffledPlayers.length === 0) {
    return setShuffledPlayers(shuffle([...players]));
  }

  if (shuffledQuestions.length === 0)
    setShuffledQuestions(shuffle([...fastquizquestions]));

  const intro = [
    <Text
      tw="text-white font-bold text-5xl text-center"
      style={{ color: pageTheme.text }}>
      <Text>It's </Text>
      <Text style={{ color: shuffledPlayers[0].colour }}>
        {shuffledPlayers[0].name}
      </Text>
      <Text>'s time to shine</Text>
    </Text>,
    <Text
      tw="text-white font-bold text-5xl text-center"
      style={{ color: shuffledPlayers[0].colour }}>
      {shuffledPlayers[0].name}
    </Text>,
  ];

  return (
    <View
      tw="h-full items-center justify-between"
      style={{ backgroundColor: pageTheme.bg }}>
      <Image
        source={require("../assets/stars.png")}
        tw="absolute h-full w-full opacity-80"
      />
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
        tw="flex-col w-11/12 h-3/6 rounded-xl mb-4 justify-between"
        style={{ backgroundColor: pageTheme.fg }}>
        {newGame && <CardBanner shuffledPlayer={shuffledPlayers[0]} />}
        {!newGame ? (
          <TouchableOpacity
            tw="justify-center"
            onPress={() => {
              setNewGame(!newGame);
              timer();
            }}>
            <LottieView
              ref={LottieRef2}
              tw="w-full h-full absolute"
              source={require("../assets/streamers.json")}
              loop={false}
              speed={2}
            />
            <View tw="h-full items-center justify-center px-4">
              {newGame ? (
                <Text>{counter}</Text>
              ) : (
                <View tw="w-full h-full justify-center">
                  {intro[Math.floor(Math.random() * intro.length)]}
                </View>
              )}
            </View>
          </TouchableOpacity>
        ) : (
          <View tw="h-5/6 justify-between">
            <Text
              tw="px-2 text-white font-bold text-4xl text-center h-4/6"
              style={{ color: pageTheme.text }}>
              {counter
                ? shuffledQuestions.find((cat) => cat.category === "na")
                    .question
                : shuffledQuestions.find((cat) => cat.category === "na").answer}
            </Text>
            {counter ? (
              <View tw="flex-row justify-center h-2/6">
                <Text tw="text-8xl text-center font-black text-white">
                  {counter}
                </Text>
              </View>
            ) : (
              <View tw="h-2/6 flex-row justify-center space-x-12 pb-2">
                <TouchableOpacity
                  tw="basis-1/3 justify-center bg-white rounded-full"
                  onPress={() => {
                    setNewGame(!newGame);
                    setShuffledPlayers(
                      shuffledPlayers.filter(
                        (player) => player.name !== shuffledPlayers[0].name
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
                          player.name === shuffledPlayers[0].name
                            ? { ...player, score: (player.score += 1) }
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
                    tw="text-center text-7xl text-green-700"
                    entering={ZoomIn}>
                    ✔
                  </Animated.Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
}
