import { useEffect, useState } from "react";
import truths from "../assets/truths.json";
import dares from "../assets/dares.json";
import { TouchableOpacity, Text, View } from "react-native";
import SwipeableCard from "./SwipeCard";

function shuffle(arr) {
  return arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export default function CardDeck({ players, setPlayers }) {
  const [shuffledPlayers, setShuffledPlayers] = useState(shuffle([...players]));
  const [shuffledTruths, setShuffledTruths] = useState(shuffle([...truths]));
  const [shuffledDares, setShuffledDares] = useState(shuffle([...dares]));
  const [truthInd, setTruthInd] = useState(0);
  const [dareInd, setDareInd] = useState(0);
  const [option, setOption] = useState("");
  let shuffledTruth = { question: "" };
  let shuffledDare = { question: "" };

  const removeCard = (num = 0) => {
    if (num === 1) {
      setTruthInd(truthInd + 1);
    } else if (num === 1) {
      setDareInd(dareInd + 1);
    }
  };

  useEffect(() => setOption(""), [shuffledPlayers]);

  if (shuffledPlayers.length === 0) {
    setShuffledPlayers(shuffle([...players]));
  }

  if (shuffledTruths.length === 0) {
    setShuffledTruths(shuffle([...truths]));
  }

  if (shuffledDares.length === 0) {
    setShuffledDares(shuffle([...dares]));
  }

  if (!shuffledTruth.question) {
    shuffledTruth = shuffledTruths[truthInd];
  }
  if (!shuffledDare.question) {
    shuffledDare = shuffledDares[dareInd];
  }

  console.log(shuffledDare);
  return option === "truth" ? (
    <SwipeableCard
      setPlayers={setPlayers}
      players={players}
      shuffledPlayers={shuffledPlayers}
      setShuffledPlayers={setShuffledPlayers}
      key={shuffledTruth.question}
      item={shuffledTruth}
      value={1}
      removeCard={removeCard}
    />
  ) : option === "dare" ? (
    <SwipeableCard
      setPlayers={setPlayers}
      players={players}
      shuffledPlayers={shuffledPlayers}
      setShuffledPlayers={setShuffledPlayers}
      key={shuffledDare.question}
      item={shuffledDare}
      value={2}
      removeCard={removeCard}
    />
  ) : (
    <View tw="h-3/6 w-11/12 bg-[#0c3713] rounded-md bottom-4 absolute flex-col">
      <TouchableOpacity
        onPress={() => setOption("truth")}
        tw="w-1/2 absolute bottom-0 left-0 h-4/5 bg-black justify-center items-center">
        <Text tw="text-white font-black text-center text-5xl top-5 absolute">
          Truth
        </Text>
        <Text tw="text-white font-black text-center text-5xl">+1</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setOption("dare")}
        tw="w-1/2 absolute bottom-0 right-0 h-4/5 bg-white justify-center items-center">
        <Text tw="text-black font-black text-center text-5xl top-5 absolute">
          Dare
        </Text>
        <Text tw="text-black font-black text-center text-5xl">+2</Text>
      </TouchableOpacity>
    </View>
  );
}
