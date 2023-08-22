import { View, Text, TouchableOpacity, Image, Switch } from "react-native";
import LottieView from "lottie-react-native";
import GameRanking from "../components/GameRanking";
import Header from "../components/Header";
import { theme } from "../assets/colors";
import { useRoute } from "@react-navigation/native";
import shuffle from "../hooks/shuffleArray";
import fastquizquestions from "../assets/fastquizquestions.json";
import { useEffect, useState, useRef } from "react";
import Animated, {
  BounceIn,
  BounceOut,
  LightSpeedInLeft,
  ZoomIn,
} from "react-native-reanimated";
import CardBanner from "../components/CardBanner";
import Intro from "../components/newIntro";

export default function FastQuiz({ players, setPlayers }) {
  const [newGame, setNewGame] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [counter, setCounter] = useState(0);
  const [shuffledPlayers, setShuffledPlayers] = useState(shuffle([...players]));
  const [shuffledQuestions, setShuffledQuestions] = useState(
    shuffle([...fastquizquestions])
  );
  const countRef = useRef(null);
  const LottieRef = useRef(null);
  const LottieRef2 = useRef(null);
  const route = useRoute();
  const pageTheme = theme(route.name);
  countRef.current = counter;

  const toggleSwitch = () => {
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

  console.log(players);
  console.log(shuffledPlayers[0]);
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
  }

  useEffect(() => LottieRef2.current?.play(), [shuffledPlayers]);
  useEffect(() => removeQuestion(), [!newGame]);

  if (shuffledPlayers.length === 0) {
    return setShuffledPlayers(shuffle([...players]));
  }
  if (shuffledQuestions.length === 0)
    setShuffledQuestions(shuffle([...fastquizquestions]));

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
          <Animated.View tw="items-center">
            <LottieView
              ref={LottieRef2}
              tw="w-full h-full absolute"
              source={require("../assets/streamers.json")}
              loop={false}
              speed={2}
            />
            <Animated.View entering={BounceIn} tw="w-full">
              <TouchableOpacity
                tw="justify-center h-full"
                onPress={() => {
                  setNewGame(!newGame);
                  shuffledPlayers[0].fastQ && timer();
                }}>
                <Intro shuffledPlayer={shuffledPlayers[0]} />
              </TouchableOpacity>
            </Animated.View>
            <TouchableOpacity
              onPress={toggleSwitch}
              tw="flex-row w-full pr-8 pl-4 pt-2 absolute justify-between">
              <Text
                tw="text-5xl font-extrabold basis-4/6"
                style={{ color: pageTheme.text }}>
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
              tw="grow justify-center">
              <Text
                tw="px-2 text-white font-bold text-4xl text-center pt-2"
                style={{ color: pageTheme.text }}>
                {(counter && shuffledPlayers[0].fastQ) ||
                (!shuffledPlayers[0].fastQ && !reveal)
                  ? shuffledQuestions.find((cat) => cat.category === "na")
                      .question
                  : shuffledQuestions.find((cat) => cat.category === "na")
                      .answer}
              </Text>
            </TouchableOpacity>
            {counter && shuffledPlayers[0].fastQ ? (
              <View tw="flex-row justify-center">
                <Text tw="text-8xl text-center font-black text-white">
                  {counter}
                </Text>
              </View>
            ) : (!counter && shuffledPlayers[0].fastQ) ||
              (!shuffledPlayers[0].fastQ && reveal) ? (
              <View tw="flex-row">
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
                    setNewGame(!newGame);
                    setReveal(false);
                    LottieRef.current.play();
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
