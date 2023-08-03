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
  value,
}) {
  const [xPosition, setXPosition] = useState(new Animated.Value(0));

  let swipeDirection = "";
  const [na, swipedDirection] = useState("--");
  let shuffledPlayer = { name: "err", color: "red" };
  shuffledPlayer = shuffledPlayers[0];
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
      tw="justify-center absolute h-3/6 w-11/12 rounded-md bottom-4 bg-[#0c3713]"
      style={{
        opacity: cardOpacity,
        backgroundColor: shuffledPlayer.color,
        transform: [{ translateX: xPosition }, { rotate: rotateCard }],
      }}>
      <View tw="top-0 w-full absolute h-10 items-center justify-center">
        <Text tw="left-0 absolute">^</Text>
        <Text tw="font-black text-black text-3xl w-2/3 text-center  underline">
          {shuffledPlayer.name}
        </Text>
        <Text tw="right-0 absolute">v</Text>
      </View>
      <Text tw="text-black font-bold text-2xl text-center m-4">
        {item.question}
      </Text>
    </Animated.View>
  );
}
