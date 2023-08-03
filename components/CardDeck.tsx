import React, { useEffect, useState } from "react";
import truths from "../assets/truths.json";
import { View, Text } from "react-native";
import SwipeableCard from "./SwipeCard";

export default function CardsScreen({ players, setPlayers }) {
  const [noMoreCard, setNoMoreCard] = useState(false);
  const [sampleCardArray, setSampleCardArray] = useState(truths);
  const [swipeDirection, setSwipeDirection] = useState("--");
  const [ind, setInd] = useState(0);
  const [truth, setTruth] = useState(sampleCardArray[ind]);

  useEffect(() => {
    setTruth(sampleCardArray[ind]);
  }, [ind]);

  const removeCard = (question) => {
    sampleCardArray.splice(
      sampleCardArray.findIndex((item) => item.question == question),
      1
    );
    setInd(ind + 1);
  };
  return (
    <View tw="h-full w-full items-center justify-center ">
      <SwipeableCard
        setPlayers={setPlayers}
        players={players}
        player={players[Math.floor(Math.random() * players.length)]}
        key={truth.question}
        item={truth}
        removeCard={() => removeCard(truth.question)}
        swipedDirection={() => setSwipeDirection("--")}
      />
      {noMoreCard && (
        <Text style={{ fontSize: 22, color: "#000" }}>No Cards Found.</Text>
      )}
    </View>
  );
}
