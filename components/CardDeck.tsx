import React, { useEffect, useState } from "react";
import truths from "../assets/truths.json";
import { View, Text } from "react-native";
import SwipeableCard from "./SwipeCard";

export default function CardsScreen({ players, setPlayers }) {
  const [noMoreCard, setNoMoreCard] = useState(false);
  const [sampleCardArray, setSampleCardArray] = useState(truths);
  const [swipeDirection, setSwipeDirection] = useState("--");

  const removeCard = (question) => {
    sampleCardArray.splice(
      sampleCardArray.findIndex((item) => item.question == question),
      1
    );
  };
  return (
    <View tw="h-full w-full items-center justify-center">
      {truths.map((item) => {
        const player = players[Math.floor(Math.random() * players.length)];
        return (
          <SwipeableCard
            setPlayers={setPlayers}
            players={players}
            // setPlayer={setPlayer}
            player={player}
            key={item.question}
            item={item}
            removeCard={() => removeCard(item.question)}
            swipedDirection={() => setSwipeDirection("--")}
          />
        );
      })}
      {noMoreCard && (
        <Text style={{ fontSize: 22, color: "#000" }}>No Cards Found.</Text>
      )}
    </View>
  );
}
