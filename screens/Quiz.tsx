import { View, Text, TouchableOpacity, Image, Switch } from "react-native";
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
import Intro from "../components/newIntro";

export default function FastQuiz({ players, setPlayers }) {
  const [newGame, setNewGame] = useState(false);
  const LottieRef = useRef(null);
  const LottieRef2 = useRef(null);
  const route = useRoute();
  const pageTheme = theme(route.name);
  const [counter, setCounter] = useState(0);
  const countRef = useRef(null);
  const [reveal, setReveal] = useState(false);

  countRef.current = counter;
  const [shuffledPlayers, setShuffledPlayers] = useState(shuffle([...players]));
  const [shuffledQuestions, setShuffledQuestions] = useState(
    shuffle([...fastquizquestions])
  );
  useEffect(() => LottieRef2.current?.play(), [shuffledPlayers]);
  const [fastmode, setFastmode] = useState(false);
  const toggleSwitch = () => setFastmode((previousState) => !previousState);

  const removeQuestion = () => {
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
    removeQuestion();
  }

  if (shuffledPlayers.length === 0) {
    return setShuffledPlayers(shuffle([...players]));
  }

  if (shuffledQuestions.length === 0)
    setShuffledQuestions(shuffle([...fastquizquestions]));

  // useEffect(() => {
  //   setNewIntro(intro[Math.floor(Math.random() * intro.length)]);
  // }, [shuffledPlayers[0]]);

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
        tw=" w-11/12 h-3/6 rounded-xl mb-4 justify-between"
        style={{ backgroundColor: pageTheme.fg }}>
        {!newGame ? (
          <View tw="items-center">
            <TouchableOpacity
              tw="justify-center w-full h-full"
              onPress={() => {
                setNewGame(!newGame);
                fastmode && timer();
              }}>
              <LottieView
                ref={LottieRef2}
                tw="w-full h-full absolute"
                source={require("../assets/streamers.json")}
                loop={false}
                speed={2}
              />
              <Intro shuffledPlayer={shuffledPlayers[0]} />
            </TouchableOpacity>
            <View tw="flex-row w-5/6 top-4 absolute justify-between">
              <Text
                tw="text-4xl font-extrabold basis-4/6"
                style={{ color: pageTheme.text }}>
                Timed
              </Text>
              <Switch
                tw=""
                style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={fastmode ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={fastmode}
              />
            </View>
          </View>
        ) : (
          <View
            tw={
              (!counter && fastmode) || reveal
                ? "justify-between h-full"
                : "h-full"
            }>
            <CardBanner shuffledPlayer={shuffledPlayers[0]} />
            <TouchableOpacity
              onPress={() => setReveal(true)}
              disabled={fastmode || reveal}
              tw={!reveal && !fastmode ? "h-full" : "basis-4/6"}>
              <Text
                tw="px-2 text-white font-bold text-4xl text-center"
                style={{ color: pageTheme.text }}>
                {(counter && fastmode) || (!fastmode && !reveal)
                  ? shuffledQuestions.find((cat) => cat.category === "na")
                      .question
                  : shuffledQuestions.find((cat) => cat.category === "na")
                      .answer}
              </Text>
            </TouchableOpacity>
            {counter && fastmode ? (
              <View tw="flex-row justify-center basis-2/6 ">
                <Text tw="text-8xl text-center font-black text-white">
                  {counter}
                </Text>
              </View>
            ) : (!counter && fastmode) || (!fastmode && reveal) ? (
              <View tw="flex-row justify-between">
                <TouchableOpacity
                  tw="basis-1/2 justify-center bg-white border-r-2"
                  onPress={() => {
                    setReveal(false);
                    setNewGame(!newGame);
                    setShuffledPlayers(
                      shuffledPlayers.filter(
                        (player) => player.name !== shuffledPlayers[0].name
                      )
                    );
                    !fastmode && removeQuestion();
                  }}>
                  <Animated.Text
                    tw="text-center text-7xl text-red-700"
                    entering={ZoomIn}>
                    ✘
                  </Animated.Text>
                </TouchableOpacity>
                <TouchableOpacity
                  tw="basis-1/2 justify-center bg-white border-l-2"
                  onPress={() => {
                    setNewGame(!newGame);
                    setReveal(false);
                    LottieRef.current.play();
                    !fastmode && removeQuestion();
                    return Promise.resolve(
                      setPlayers(
                        players.map((player) =>
                          player.name === shuffledPlayers[0].name
                            ? {
                                ...player,
                                score: (player.score += fastmode ? 2 : 1),
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
                    tw="text-center text-7xl text-green-700"
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
