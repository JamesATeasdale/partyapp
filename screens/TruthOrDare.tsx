import GameRanking from "../components/GameRanking";
import Header from "../components/Header";
import { theme } from "../assets/colors";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import truths from "../assets/truths.json";
import dares from "../assets/dares.json";
import { TouchableOpacity, Text, View } from "react-native";
import SwipeableCard from "../components/SwipeCard";
import BalloonTransition from "../components/BalloonsTransition";
import shuffle from "../hooks/shuffleArray";

export default function TruthOrDare({ players, setPlayers }) {
  const route = useRoute();
  const pageTheme = theme(route.name);
  const [category, setCategory] = useState("na");
  const [shuffledPlayers, setShuffledPlayers] = useState(shuffle([...players]));
  const [shuffledTruths, setShuffledTruths] = useState(
    shuffle([...truths].filter((item) => item.category === category))
  );
  const [shuffledDares, setShuffledDares] = useState(
    shuffle([...dares].filter((item) => item.category === category))
  );
  const [truthInd, setTruthInd] = useState(0);
  const [dareInd, setDareInd] = useState(0);
  const [option, setOption] = useState("");
  let shuffledTruth = { question: "" };
  let shuffledDare = { question: "" };
  let shuffledPlayer = shuffledPlayers[0];

  const removeCard = (num = 0) => {
    if (num === 1) setTruthInd(truthInd + 1);
    if (num === 2) setDareInd(dareInd + 1);
  };

  useEffect(() => setOption(""), [shuffledPlayers]);

  if (shuffledPlayers.length === 0) {
    return Promise.resolve(setShuffledPlayers(shuffle([...players]))).then(
      () => (shuffledPlayer = shuffledPlayers[0])
    );
  }
  if (shuffledTruths.length === 0) setShuffledTruths(shuffle([...truths]));
  if (shuffledDares.length === 0) setShuffledDares(shuffle([...dares]));
  if (!shuffledTruth.question) shuffledTruth = shuffledTruths[truthInd];
  if (!shuffledDare.question) shuffledDare = shuffledDares[dareInd];

  return (
    <View tw="h-full items-center" style={{ backgroundColor: pageTheme.bg }}>
      <BalloonTransition players={players} />
      <Header />
      <GameRanking players={players} setPlayers={setPlayers} />
      <View
        tw="w-11/12 h-3/6 items-center bottom-5 absolute rounded-xl"
        style={{ backgroundColor: shuffledPlayer.colour }}>
        <View
          tw="flex-row rounded-t-xl p-1 w-full"
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
        {option === "truth" ? (
          <SwipeableCard
            shuffledPlayer={shuffledPlayers[0]}
            setPlayers={setPlayers}
            players={players}
            shuffledPlayers={shuffledPlayers}
            setShuffledPlayers={setShuffledPlayers}
            item={shuffledTruth}
            value={1}
            removeCard={removeCard}
          />
        ) : option === "dare" ? (
          <SwipeableCard
            shuffledPlayer={shuffledPlayer}
            setPlayers={setPlayers}
            players={players}
            shuffledPlayers={shuffledPlayers}
            setShuffledPlayers={setShuffledPlayers}
            item={shuffledDare}
            value={2}
            removeCard={removeCard}
          />
        ) : (
          <View tw="h-4/6 w-11/12 rounded-md bottom-5 absolute ">
            <TouchableOpacity
              onPress={() => setOption("truth")}
              tw="w-1/2 h-full absolute left-0 bg-black justify-center items-center rounded-l-md">
              <Text tw="text-white font-black text-center text-5xl top-5 absolute">
                Truth
              </Text>
              <Text tw="text-white font-black text-center text-5xl">+1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setOption("dare")}
              tw="w-1/2 h-full absolute right-0 bg-white justify-center items-center  rounded-r-md">
              <Text tw="text-black font-black text-center text-5xl top-5 absolute">
                Dare
              </Text>
              <Text tw="text-black font-black text-center text-5xl">+2</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
