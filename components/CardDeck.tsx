import { useEffect, useState } from "react";
import truths from "../assets/truths.json";
import { View } from "react-native";
import SwipeableCard from "./SwipeCard";

export default function CardsScreen({ players, setPlayers }) {
  const [ind, setInd] = useState(0);
  const [truth, setTruth] = useState(truths[ind]);
  const removeCard = () => setInd(ind + 1);
  function shuffle(arr) {
    return arr
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }
  const [shuffledPlayers, setShuffledPlayers] = useState(shuffle([...players]));

  useEffect(() => {
    setTruth(truths[ind]);
  }, [ind]);
  if (shuffledPlayers.length === 0) {
    setShuffledPlayers(shuffle([...players]));
  }
  console.log(shuffledPlayers);

  return (
    <View tw="h-3/6 w-11/12 bg-[#0c3713] rounded-md mb-4 bottom-0 absolute">
      <SwipeableCard
        setPlayers={setPlayers}
        players={players}
        shuffledPlayers={shuffledPlayers}
        setShuffledPlayers={setShuffledPlayers}
        key={truth.question}
        item={truth}
        removeCard={removeCard}
      />
    </View>
  );
}
