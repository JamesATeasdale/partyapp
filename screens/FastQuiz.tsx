import { View, Text } from "react-native";
import GameRanking from "../components/GameRanking";
import Header from "../components/Header";
import { theme } from "../assets/colors";
import { useRoute } from "@react-navigation/native";
import BalloonTransition from "../components/BalloonsTransition";
import shuffle from "../hooks/shuffleArray";
import fastquizquestions from "../assets/fastquizquestions.json";
import { useEffect, useState } from "react";

export default function FastQuiz({ players, setPlayers }) {
  const route = useRoute();
  const pageTheme = theme(route.name);
  const [category, setCategory] = useState("na");
  const [shuffledPlayers, setShuffledPlayers] = useState(shuffle([...players]));
  const [shuffledQuestions, setShuffledQuestions] = useState(
    shuffle([...fastquizquestions].filter((item) => item.category === category))
  );
  const [fastQuizInd, setFastQuizInd] = useState(0);
  const [option, setOption] = useState("");
  let shuffledQuestion = { question: "" };
  let shuffledPlayer = shuffledPlayers[0];

  const removeCard = (num = 0) => {
    if (num === 2) setFastQuizInd(fastQuizInd + 1);
  };

  useEffect(() => setOption(""), [shuffledPlayers]);

  if (shuffledPlayers.length === 0) {
    return Promise.resolve(setShuffledPlayers(shuffle([...players]))).then(
      () => (shuffledPlayer = shuffledPlayers[0])
    );
  }
  if (shuffledQuestions.length === 0)
    setShuffledQuestions(shuffle([...fastquizquestions]));
  if (!shuffledQuestion.question)
    shuffledQuestion = shuffledQuestions[fastQuizInd];

  return (
    <View
      tw="h-full items-center justify-between pb-4"
      style={{ backgroundColor: pageTheme.bg }}>
      <BalloonTransition players={players} />
      <View tw="w-full h-2/6 items-center">
        <Header />
        <GameRanking players={players} setPlayers={setPlayers} />
      </View>
      <View
        tw="w-11/12 h-3/6 rounded-xl flex-col"
        style={{ backgroundColor: shuffledPlayer.colour }}>
        <View
          tw="flex-row rounded-t-xl p-1 h-1/6"
          style={{ backgroundColor: pageTheme.fg }}>
          <View tw="basis-2/3 m-2">
            <Text tw="font-black text-gray-300 text-3xl ">
              {shuffledPlayer.name}
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
        <View tw="h-5/6 justify-center">
          <Text tw=" text-white font-bold text-4xl text-center justify-center m-4 ">
            {shuffledQuestions[fastQuizInd].question}
          </Text>
        </View>
      </View>
    </View>
  );
}
