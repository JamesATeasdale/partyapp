import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Dimensions,
  Animated,
  PanResponder,
  View,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function SwipeableCard({
  player,
  players,
  setPlayers,
  item,
  removeCard,
  swipedDirection,
}) {
  const [xPosition, setXPosition] = useState(new Animated.Value(0));

  let swipeDirection = "";
  let cardOpacity = new Animated.Value(1);
  let rotateCard = xPosition.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ["-20deg", "0deg", "20deg"],
  });

  let panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => false,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      xPosition.setValue(gestureState.dx);
      if (gestureState.dx > SCREEN_WIDTH - 250) {
        swipeDirection = "Right";
      } else if (gestureState.dx < -SCREEN_WIDTH + 250) {
        swipeDirection = "Left";
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (
        gestureState.dx < SCREEN_WIDTH - 150 &&
        gestureState.dx > -SCREEN_WIDTH + 150
      ) {
        swipedDirection("--");
        Animated.spring(xPosition, {
          toValue: 0,
          speed: 5,
          bounciness: 10,
          useNativeDriver: false,
        }).start();
      } else if (gestureState.dx > SCREEN_WIDTH - 150) {
        Animated.parallel([
          Animated.timing(xPosition, {
            toValue: SCREEN_WIDTH,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(cardOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }),
        ]).start(() => {
          setPlayers(
            players.map((item) =>
              item.name === player.name
                ? { ...item, score: (item.score += 1) }
                : item
            )
          );
          swipedDirection(swipeDirection);
          removeCard();
        });
      } else if (gestureState.dx < -SCREEN_WIDTH + 150) {
        Animated.parallel([
          Animated.timing(xPosition, {
            toValue: -SCREEN_WIDTH,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(cardOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }),
        ]).start(() => {
          swipedDirection(swipeDirection);
          removeCard();
        });
      }
    },
  });

  return (
    <Animated.View
      {...panResponder.panHandlers}
      tw="align-center justify-center items-center absolute w-full h-full rounded-md"
      style={{
        backgroundColor: player.color,
        opacity: cardOpacity,
        transform: [{ translateX: xPosition }, { rotate: rotateCard }],
      }}>
      <Text tw="font-black text-black text-3xl top-0 absolute ">
        {player.name}
      </Text>
      <Text tw="text-black font-bold text-2xl">{item.question}</Text>
    </Animated.View>
  );
}
