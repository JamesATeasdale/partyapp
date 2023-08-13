import { useEffect, useState } from "react";
import truths from "../assets/truths.json";
import dares from "../assets/dares.json";
import { TouchableOpacity, Text, View } from "react-native";
import SwipeableCard from "./SwipeCard";
import { green } from "../assets/colors";

function shuffle(arr) {
  return arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export default function CardDeck({ players, setPlayers }) {
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
    if (num === 1) {
      setTruthInd(truthInd + 1);
    } else if (num === 2) {
      setDareInd(dareInd + 1);
    }
  };
  [];
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
    <View
      tw="w-11/12 h-3/6 items-center bottom-5 absolute rounded-xl"
      style={{ backgroundColor: green.fg }}>
      <View tw="w-full my-4 items-center ">
        <Text tw="left-0 absolute text-4xl pl-4 text-gray-300">{"👎"}</Text>
        <Text tw="font-black text-gray-300 text-4xl text-center">
          {shuffledPlayer.name}
        </Text>
        <Text tw="right-0 absolute text-4xl pr-4 text-gray-300">{"👍"}</Text>
      </View>
      {option === "truth" ? (
        <SwipeableCard
          shuffledPlayer={shuffledPlayers[0]}
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
          shuffledPlayer={shuffledPlayer}
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
  );
}
