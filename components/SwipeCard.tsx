import { useState } from "react";
import { Text, Dimensions, Animated, PanResponder, View } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function SwipeableCard({
  players,
  setPlayers,
  item,
  removeCard,
  shuffledPlayers,
  setShuffledPlayers,
  shuffledPlayer,
  value,
}) {
  const [xPosition, setXPosition] = useState(new Animated.Value(0));

  let swipeDirection = "";
  const [na, swipedDirection] = useState("--");
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
      if (gestureState.dx > SCREEN_WIDTH - 375) {
        swipeDirection = "Right";
      } else if (gestureState.dx < -SCREEN_WIDTH + 375) {
        swipeDirection = "Left";
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (
        gestureState.dx < SCREEN_WIDTH - 225 &&
        gestureState.dx > -SCREEN_WIDTH + 225
      ) {
        swipedDirection("--");
        Animated.spring(xPosition, {
          toValue: 0,
          speed: 5,
          bounciness: 10,
          useNativeDriver: false,
        }).start();
      } else if (gestureState.dx > SCREEN_WIDTH - 225) {
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
            players.map((player) =>
              player.name === shuffledPlayer.name
                ? { ...player, score: (player.score += value) }
                : player
            )
          );
          setShuffledPlayers(
            shuffledPlayers.filter(
              (player) => player.name !== shuffledPlayer.name && player
            )
          );
          swipedDirection(swipeDirection);
          removeCard(value);
        });
      } else if (gestureState.dx < -SCREEN_WIDTH + 225) {
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
          setShuffledPlayers(
            shuffledPlayers.filter(
              (player) => player.name !== shuffledPlayer.name && player
            )
          );
          swipedDirection(swipeDirection);
          removeCard(value);
        });
      }
    },
  });

  return (
    <Animated.View
      {...panResponder.panHandlers}
      tw="justify-center absolute h-5/6 w-11/12 rounded-md bottom-4"
      style={{
        opacity: cardOpacity,
        backgroundColor: shuffledPlayer.color,
        transform: [{ translateX: xPosition }, { rotate: rotateCard }],
      }}>
      <Text tw="text-black font-bold text-4xl text-center m-4">
        {item.question}
      </Text>
    </Animated.View>
  );
}
