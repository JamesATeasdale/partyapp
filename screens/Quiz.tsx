import { View, Text, TouchableOpacity, Image, Switch } from "react-native";
import LottieView from "lottie-react-native";
import GameRanking from "../components/GameRanking";
import Header from "../components/Header";
import { theme } from "../assets/colours";
import { useRoute } from "@react-navigation/native";
import shuffle from "../hooks/shuffleArray";
import fastquizquestions from "../assets/quiz.json";
import { useState, useRef } from "react";
import Animated, { BounceIn, ZoomIn } from "react-native-reanimated";
import CardBanner from "../components/CardBanner";
import Intro from "../components/newIntro";
import PointNotifier from "../components/PointNotifier";

export default function FastQuiz({ players, setPlayers }) {
  const [win, setWin] = useState(false);
  const [newGame, setNewGame] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [counter, setCounter] = useState(0);
  const [shuffledPlayers, setShuffledPlayers] = useState([]);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [value, setValue] = useState(0);
  const countRef = useRef(null);
  const route = useRoute();
  const pageTheme = theme(route.name);
  countRef.current = counter;
  const removeQuestion = () => setShuffledQuestions(shuffledQuestions.slice(1));
  let shuffledQuestion = { question: "", answer: "" };

  const toggleSwitch = () => {
    setWin(false);
    setPlayers(
      players.map((player) =>
        shuffledPlayers[0].name === player.name
          ? { ...player, fastQ: !player.fastQ }
          : player
      )
    );
    setShuffledPlayers(
      shuffledPlayers.map((shuffledPlayer, ind) =>
        !ind
          ? { ...shuffledPlayer, fastQ: !shuffledPlayer.fastQ }
          : shuffledPlayer
      )
    );
  };

  function timer() {
    const countInt = setInterval(
      () =>
        countRef.current > 0
          ? setCounter((counter) => counter - 1)
          : clearInterval(countInt),
      1000
    );
    setCounter(7);
  }

  if (shuffledPlayers.length === 0) {
    return setShuffledPlayers(shuffle([...players]));
  }
  if (shuffledQuestions.length === 0)
    setShuffledQuestions(shuffle([...fastquizquestions]));

  if (!shuffledQuestion.question)
    shuffledQuestion = shuffledQuestions.find(
      (ques) => shuffledPlayers[0].quiz.includes(ques.category) && ques
    );
  console.log(shuffledQuestion);

  return (
    <View
      tw="h-full items-center justify-between"
      style={{ backgroundColor: pageTheme.bg }}>
      <Image
        source={require("../assets/question-marks-background2.png")}
        tw="absolute h-full w-full opacity-50"
      />
      <View tw="w-full h-2/6 items-center">
        <Header />
        <GameRanking players={players} setPlayers={setPlayers} />
        {win && <PointNotifier value={value} />}
      </View>
      <View
        tw=" w-11/12 h-3/6 rounded-xl mb-4 justify-between"
        style={{ backgroundColor: pageTheme.fg }}>
        {!newGame ? (
          <Animated.View tw="items-center w-full h-full">
            <Animated.View entering={BounceIn} tw="w-full">
              <TouchableOpacity
                tw="justify-center h-full"
                onPress={() => {
                  setWin(false);
                  setNewGame(!newGame);
                  shuffledPlayers[0].fastQ && timer();
                }}>
                <Intro shuffledPlayer={shuffledPlayers[0]} />
              </TouchableOpacity>
            </Animated.View>
            <TouchableOpacity
              onPress={toggleSwitch}
              tw="flex-row w-full pr-8 pl-2 pt-2 absolute justify-between">
              <Text
                tw="text-4xl font-extrabold basis-4/6"
                style={{ color: pageTheme.text, fontFamily: "Itim-Regular" }}>
                {shuffledPlayers[0].fastQ ? "Timed" : "Normal"}
              </Text>
              <Switch
                style={{ transform: [{ scaleX: 2.4 }, { scaleY: 2.4 }] }}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={
                  shuffledPlayers[0].fastQ ? pageTheme.bg : pageTheme.fg
                }
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={shuffledPlayers[0].fastQ}
              />
            </TouchableOpacity>
          </Animated.View>
        ) : (
          <View tw="h-full">
            <CardBanner shuffledPlayer={shuffledPlayers[0]} />
            <TouchableOpacity
              onPress={() => setReveal(true)}
              disabled={shuffledPlayers[0].fastQ || reveal}
              tw="grow justify-center px-3">
              <Text
                tw="font-bold text-3xl text-center pt-2"
                style={{ color: pageTheme.text, fontFamily: "Itim-Regular" }}>
                {(counter && shuffledPlayers[0].fastQ) ||
                (!shuffledPlayers[0].fastQ && !reveal)
                  ? shuffledQuestion.question
                  : shuffledQuestion.answer}
              </Text>
            </TouchableOpacity>
            {counter && shuffledPlayers[0].fastQ ? (
              <Text tw="pt-2 text-7xl text-center font-black text-white">
                {counter}
              </Text>
            ) : (!counter && shuffledPlayers[0].fastQ) ||
              (!shuffledPlayers[0].fastQ && reveal) ? (
              <View tw="flex-row">
                <TouchableOpacity
                  tw="basis-1/2 justify-center bg-white border-r-2"
                  onPress={() => {
                    setWin(false);
                    removeQuestion();
                    setReveal(false);
                    setNewGame(!newGame);
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
                  onPress={() => {
                    setWin(true);
                    setValue(shuffledPlayers[0].fastQ ? 2 : 1);
                    removeQuestion();
                    setNewGame(!newGame);
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
            ) : null}
          </View>
        )}
      </View>
    </View>
  );
}
