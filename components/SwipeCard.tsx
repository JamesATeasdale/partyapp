import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Text, Dimensions, Animated, PanResponder, View } from "react-native";
import { theme } from "../assets/colours";
import Reanimated, {
  FadeIn,
  FadeOut,
  FadeOutUp,
} from "react-native-reanimated";

const SCREEN_WIDTH = Dimensions.get("window").width;
const cardWidthTolerance = 325;

export default function SwipeableCard({
  LottieRef,
  players,
  setPlayers,
  item,
  removeCard,
  shuffledPlayers,
  setShuffledPlayers,
  value,
  setWin,
}) {
  const [xPosition, setXPosition] = useState(new Animated.Value(0));
  const route = useRoute();
  const pageTheme = theme(route.name);
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
      if (gestureState.dx > SCREEN_WIDTH - 525) {
        swipeDirection = "Right";
      } else if (gestureState.dx < -SCREEN_WIDTH + 525) {
        swipeDirection = "Left";
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (
        gestureState.dx < SCREEN_WIDTH - cardWidthTolerance &&
        gestureState.dx > -SCREEN_WIDTH + cardWidthTolerance
      ) {
        swipedDirection("--");
        Animated.spring(xPosition, {
          toValue: 0,
          speed: 5,
          bounciness: 10,
          useNativeDriver: false,
        }).start();
      } else if (gestureState.dx > SCREEN_WIDTH - cardWidthTolerance) {
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
          LottieRef.current?.play();
          setWin(true);
          setPlayers(
            players.map((player) =>
              player.name === shuffledPlayers[0].name
                ? { ...player, score: (player.score += value) }
                : player
            )
          );
          setShuffledPlayers(
            shuffledPlayers.filter(
              (player) => player.name !== shuffledPlayers[0].name && player
            )
          );
          swipedDirection(swipeDirection);
          removeCard(value);
        });
      } else if (gestureState.dx < -SCREEN_WIDTH + cardWidthTolerance) {
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
              (player) => player.name !== shuffledPlayers[0].name && player
            )
          );
          swipedDirection(swipeDirection);
          removeCard(value);
        });
      }
    },
  });

  return (
    <Reanimated.View
      entering={FadeIn}
      exiting={FadeOut}
      tw="justify-center h-5/6 w-full rounded-b-lg grow border-2"
      style={{ borderColor: pageTheme.fg }}>
      {/* {swipeDirection === "Right" && (
        <Reanimated.View
          exiting={FadeOutUp}
          tw="w-full h-full absolute justify-center items-center">
          <Text tw="text-9xl">+{value}</Text>
        </Reanimated.View>
      )} */}
      <View
        tw="w-full h-full absolute rounded-b-lg"
        style={{ borderColor: pageTheme.fg, backgroundColor: pageTheme.bg }}
      />
      <Animated.View
        {...panResponder.panHandlers}
        tw="justify-center h-full w-full rounded-b-lg p-3"
        style={{
          opacity: cardOpacity,
          borderColor: pageTheme.fg,
          backgroundColor: shuffledPlayers[0].colour,
          transform: [{ translateX: xPosition }, { rotate: rotateCard }],
        }}>
        <Text tw="text-white font-bold text-4xl text-center">
          {item.question}
        </Text>
      </Animated.View>
      {/* {value && (
        <Reanimated.View
          exiting={FadeOutUp}
          tw="w-full h-full absolute border-2 justify-end items-center">
          <Text tw="text-9xl">+{value}</Text>
        </Reanimated.View>
      )} */}
    </Reanimated.View>
  );
}
