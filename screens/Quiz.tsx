import { View, Text, TouchableOpacity, Switch } from "react-native";
import GameRanking from "../components/GameRanking";
import Header from "../components/Header";
import { theme } from "../assets/colours";
import { useRoute } from "@react-navigation/native";
import shuffle from "../hooks/shuffleArray";
import fastquizquestions from "../assets/quiz.json";
import { useState, useRef } from "react";
import Animated, {
  BounceIn,
  SlideInLeft,
  SlideInRight,
} from "react-native-reanimated";
import CardBanner from "../components/CardBanner";
import Intro from "../components/newIntro";
import PointNotifier from "../components/PointNotifier";
import FlipCard from "../components/FlipCard";

export default function Quiz({ players, setPlayers }) {
  const [win, setWin] = useState(false);
  const [newGame, setNewGame] = useState(false);
  const [counter, setCounter] = useState(0);
  const [shuffledPlayers, setShuffledPlayers] = useState([]);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [value, setValue] = useState(0);
  const countRef = useRef(null);
  const route = useRoute();
  const pageTheme = theme(route.name);
  countRef.current = counter;
  let shuffledQuestion = { question: "", answer: "" };
  const removeQuestion = () =>
    setShuffledQuestions(
      shuffledQuestions.filter((shuffledQ) => shuffledQ !== shuffledQuestion)
    );

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

  if (shuffledPlayers.length === 0)
    return setShuffledPlayers(shuffle([...players]));

  if (shuffledQuestions.length === 0)
    setShuffledQuestions(shuffle([...fastquizquestions]));

  if (!shuffledQuestion.question)
    shuffledQuestion = shuffledQuestions.find(
      (ques) => shuffledPlayers[0].quiz.includes(ques.category) && ques
    );

  return (
    <View
      tw="h-full items-center justify-between"
      style={{ backgroundColor: pageTheme.bg }}>
      <Animated.Image
        tw="h-full absolute"
        entering={SlideInLeft.duration(800)}
        source={require("../assets/jaggedleft.png")}
      />
      <Animated.Image
        entering={SlideInRight.duration(800)}
        tw="h-full absolute"
        source={require("../assets/jaggedright.png")}
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
          <View tw="h-full w-full items-center">
            <CardBanner shuffledPlayer={shuffledPlayers[0]} />
            <FlipCard
              shuffledPlayers={shuffledPlayers}
              setShuffledPlayers={setShuffledPlayers}
              counter={counter}
              shuffledQuestion={shuffledQuestion}
              setWin={setWin}
              removeQuestion={removeQuestion}
              newGame={newGame}
              setNewGame={setNewGame}
              players={players}
              setPlayers={setPlayers}
              setValue={setValue}
            />
          </View>
        )}
      </View>
    </View>
  );
}
