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

export default function TruthOrDare({ players, setPlayers }) {
  const LottieRef = useRef(null);
  const route = useRoute();
  const pageTheme = theme(route.name);
  const [shuffledPlayers, setShuffledPlayers] = useState(shuffle([...players]));
  const [shuffledTruths, setShuffledTruths] = useState([]);
  const [shuffledDares, setShuffledDares] = useState([]);
  const [option, setOption] = useState("");
  let shuffledTruth = { question: "" };
  let shuffledDare = { question: "" };
  const navigation = useNavigation();

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

  useEffect(() => setOption(""), [shuffledPlayers]);
  if (!players.length) navigation.navigate("Party Animals");

  if (shuffledPlayers.length === 0) setShuffledPlayers(shuffle([...players]));
  if (shuffledTruths.length === 0) setShuffledTruths(shuffle([...truths]));
  if (shuffledDares.length === 0) setShuffledDares(shuffle([...dares]));

  if (!shuffledTruth.question) shuffledTruth = shuffledTruths[0];
  if (!shuffledDare.question) shuffledDare = shuffledDares[0];

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
      <View tw="w-full h-2/6 items-center">
        <Header />
        <GameRanking players={players} setPlayers={setPlayers} />
      </View>
      <View
        tw="w-11/12 h-3/6 rounded-xl mb-2 border-4"
        style={{
          backgroundColor: pageTheme.fg,
          borderColor: pageTheme.fg,
        }}>
        <CardBanner shuffledPlayer={shuffledPlayers[0]} />
        {option === "truth" ? (
          <SwipeableCard
            LottieRef={LottieRef}
            setPlayers={setPlayers}
            players={players}
            shuffledPlayers={shuffledPlayers}
            setShuffledPlayers={setShuffledPlayers}
            item={shuffledTruth}
            value={1}
            removeCard={removeCard}
          />
        ) : option === "dare" ? (
          <SwipeableCard
            LottieRef={LottieRef}
            setPlayers={setPlayers}
            players={players}
            shuffledPlayers={shuffledPlayers}
            setShuffledPlayers={setShuffledPlayers}
            item={shuffledDare}
            value={2}
            removeCard={removeCard}
          />
        ) : (
          <View tw="grow h-5/6 flex-row rounded-b-md">
            <Animated.View
              tw="basis-1/2 justify-center rounded-bl-md border-r-2"
              entering={SlideInLeft}
              exiting={SlideOutLeft}
              style={{
                backgroundColor: pageTheme.bg,
              }}>
              <TouchableOpacity
                onPress={() => setOption("truth")}
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
                <Text tw="absolute right-2 text-3xl">⚫</Text>
                <Text tw="text-black font-black text-center text-6xl">
                  Truth
                </Text>
                <Text tw="text-black font-black text-center text-6xl">+1</Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View
              tw="basis-1/2 justify-center rounded-br-md border-l-2"
              entering={SlideInRight}
              exiting={SlideOutRight}
              style={{
                backgroundColor: pageTheme.bg,
              }}>
              <TouchableOpacity
                onPress={() => setOption("dare")}
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
                <Text tw="absolute left-2 text-3xl">⚫</Text>
                <Text tw="text-black font-black text-center text-6xl">
                  Dare
                </Text>
                <Text tw="text-black font-black text-center text-6xl">+2</Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View
              tw="absolute items-center w-full"
              entering={FadeIn}
              exiting={FadeOut}>
              <TouchableOpacity>
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
