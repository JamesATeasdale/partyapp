import GameRanking from "../components/GameRanking";
import Header from "../components/Header";
import { theme } from "../assets/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import truths from "../assets/truths.json";
import dares from "../assets/dares.json";
import { TouchableOpacity, Text, View, Image } from "react-native";
import SwipeableCard from "../components/SwipeCard";
import shuffle from "../hooks/shuffleArray";
import LottieView from "lottie-react-native";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
} from "react-native-reanimated";
import CardBanner from "../components/CardBanner";
import PointNotifier from "../components/PointNotifier";

export default function TruthOrDare({ players, setPlayers }) {
  const LottieRef = useRef(null);
  const route = useRoute();
  const pageTheme = theme(route.name);
  const [shuffledPlayers, setShuffledPlayers] = useState(shuffle([...players]));
  const [shuffledTruths, setShuffledTruths] = useState([]);
  const [shuffledDares, setShuffledDares] = useState([]);
  const [value, setvalue] = useState(0);
  const [win, setWin] = useState(false);
  const navigation = useNavigation();
  const todToggle = ["na", "", "explicit"];
  let shuffledTruth = { question: "" };
  let shuffledDare = { question: "" };

  useEffect(() => {
    setvalue(0);
  }, [shuffledPlayers]);

  if (!players.length) navigation.navigate("Party Animals");

  if (shuffledPlayers.length === 0) {
    return setShuffledPlayers(shuffle([...players]));
  }
  if (shuffledTruths.length === 0) {
    return setShuffledTruths(shuffle([...truths]));
  }
  if (shuffledDares.length === 0) {
    return setShuffledDares(shuffle([...dares]));
  }

  if (!shuffledTruth.question)
    shuffledTruth = shuffledTruths.find((truth) =>
      shuffledPlayers[0].tod ? truth.category === shuffledPlayers[0].tod : truth
    );
  if (!shuffledDare.question)
    shuffledDare = shuffledDares.find((dare) =>
      shuffledPlayers[0].tod ? dare.category === shuffledPlayers[0].tod : dare
    );

  const removeCard = (num = 0) => {
    if (num === 1)
      setShuffledTruths(
        [...shuffledTruths].filter(
          (item) => item.question !== shuffledTruth.question
        )
      );
    if (num === 2)
      setShuffledDares(
        [...shuffledDares].filter(
          (item) => item.question !== shuffledDare.question
        )
      );
  };
  return (
    <View
      tw="h-full w-full items-center justify-between"
      style={{ backgroundColor: pageTheme.bg }}>
      <LottieView
        tw="absolute h-full w-full"
        ref={LottieRef}
        source={require("../assets/singlefirework.json")}
        loop={false}
        speed={1}
      />
      <Image
        tw="h-full w-full absolute opacity-40"
        source={require("../assets/stars2.png")}
      />
      {win && <PointNotifier value={value} />}
      <View tw="w-full h-2/6 items-center">
        <Header />
        <GameRanking players={players} setPlayers={setPlayers} />
      </View>
      <View
        tw="w-11/12 h-3/6 rounded-xl mb-4 items-center "
        style={{
          backgroundColor: pageTheme.fg,
        }}>
        <CardBanner shuffledPlayer={shuffledPlayers[0]} />
        {value === 1 ? (
          <SwipeableCard
            LottieRef={LottieRef}
            setPlayers={setPlayers}
            players={players}
            shuffledPlayers={shuffledPlayers}
            setShuffledPlayers={setShuffledPlayers}
            item={shuffledTruth}
            value={value}
            removeCard={removeCard}
            setWin={setWin}
          />
        ) : value === 2 ? (
          <SwipeableCard
            LottieRef={LottieRef}
            setPlayers={setPlayers}
            players={players}
            shuffledPlayers={shuffledPlayers}
            setShuffledPlayers={setShuffledPlayers}
            item={shuffledDare}
            value={value}
            removeCard={removeCard}
            setWin={setWin}
          />
        ) : (
          <View tw="grow h-5/6 flex-row rounded-b-md">
            <Animated.View
              tw="basis-1/2 justify-center rounded-bl-md border-2"
              entering={SlideInLeft}
              exiting={SlideOutLeft}
              style={{
                borderColor: pageTheme.fg,
                backgroundColor: pageTheme.asset,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setvalue(1);
                  setWin(false);
                }}
                tw="items-center justify-center w-full h-full">
                <Text
                  style={{
                    fontSize: 280,
                    opacity: 0.3,
                    fontFamily: "Itim-Regular",
                  }}
                  tw="absolute">
                  ?
                </Text>
                <Text
                  tw="font-black text-center text-6xl pb-12"
                  style={{ color: pageTheme.text }}>
                  Truth
                </Text>
                {/* <Text tw="text-black font-black text-center text-6xl">+1</Text> */}
              </TouchableOpacity>
            </Animated.View>
            <Animated.View
              tw="basis-1/2 justify-center rounded-br-md border-2"
              entering={SlideInRight}
              exiting={SlideOutRight}
              style={{
                borderColor: pageTheme.fg,
                backgroundColor: pageTheme.asset,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setWin(false);
                  setvalue(2);
                }}
                tw="justify-center items-center w-full h-full">
                <Text
                  style={{
                    fontSize: 280,
                    opacity: 0.3,
                    fontFamily: "",
                  }}
                  tw="absolute">
                  !
                </Text>
                <Text tw="text-black font-black text-center text-6xl pb-12">
                  Dare
                </Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View
              tw="absolute items-center w-full"
              entering={FadeIn}
              exiting={FadeOut}>
              <TouchableOpacity
                onPress={() => {
                  setPlayers(
                    players.map((player) =>
                      shuffledPlayers[0].name === player.name
                        ? {
                            ...player,
                            tod:
                              player.tod === "explicit"
                                ? todToggle[0]
                                : todToggle[todToggle.indexOf(player.tod) + 1],
                          }
                        : player
                    )
                  );
                  setShuffledPlayers(
                    shuffledPlayers.map((shuffledPlayer, ind) =>
                      !ind
                        ? {
                            ...shuffledPlayer,
                            tod:
                              shuffledPlayer.tod === "explicit"
                                ? todToggle[0]
                                : todToggle[
                                    todToggle.indexOf(shuffledPlayer.tod) + 1
                                  ],
                          }
                        : shuffledPlayer
                    )
                  );
                }}>
                <Text tw="text-5xl pt-4">
                  {shuffledPlayers[0].tod === "na"
                    ? "😇"
                    : shuffledPlayers[0].tod === "explicit"
                    ? "😈"
                    : "😏"}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        )}
      </View>
    </View>
  );
}
