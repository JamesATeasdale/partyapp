import { View, Text, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import GameRanking from "../components/GameRanking";
import Header from "../components/Header";
import { theme } from "../assets/colors";
import { useRoute } from "@react-navigation/native";
import shuffle from "../hooks/shuffleArray";
import fastquizquestions from "../assets/fastquizquestions.json";
import { useEffect, useState, useRef } from "react";

export default function FastQuiz({ players, setPlayers }) {
  const LottieRef = useRef(null);
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
    setShuffledPlayers(
      shuffledPlayers.filter((player) => player.name !== shuffledPlayer.name)
    );
    setShuffledQuestions(
      [...shuffledQuestions].filter(
        (item) => item.question !== shuffledQuestion.question
      )
    );
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
        tw="absolute h-full "
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
        tw="w-11/12 h-3/6 rounded-xl flex-col mb-4"
        style={{ backgroundColor: pageTheme.fg }}>
        <View
          tw="flex-row rounded-t-xl p-1 h-14"
          style={{ backgroundColor: shuffledPlayer.colour }}>
          <View tw="basis-2/3 m-2">
            <Text tw="font-black text-gray-300 text-3xl ">
              {shuffledPlayer.name}
              {counter}
            </Text>
          </View>
          <View tw="flex-row right-0 absolute h-14">
            <Text
              tw="m-1 text-xl p-2 pb-1 rounded-l-xl text-gray-300 bg-gray-600"
              style={{ backgroundColor: pageTheme.bg }}>
              {"👎"}
            </Text>
            <Text
              tw="m-1 text-xl p-2 pb-1 rounded-r-xl text-gray-300 bg-gray-600"
              style={{ backgroundColor: pageTheme.bg }}>
              {"👍"}
            </Text>
          </View>
        </View>
        <TouchableOpacity tw="h-5/6 justify-center" onPress={timer}>
          <Text tw=" text-white font-bold text-4xl text-center justify-center m-4 ">
            {shuffledQuestions[0].question}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
