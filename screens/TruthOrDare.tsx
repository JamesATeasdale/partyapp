import GameRanking from "../components/GameRanking";
import Header from "../components/Header";
import { theme } from "../assets/colors";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import truths from "../assets/truths.json";
import dares from "../assets/dares.json";
import { TouchableOpacity, Text, View } from "react-native";
import SwipeableCard from "../components/SwipeCard";
import shuffle from "../hooks/shuffleArray";
import LottieView from "lottie-react-native";

export default function TruthOrDare({ players, setPlayers }) {
  const LottieRef = useRef(null);
  const route = useRoute();
  const pageTheme = theme(route.name);
  const [category, setCategory] = useState("na");
  const [shuffledPlayers, setShuffledPlayers] = useState(shuffle([...players]));
  const [shuffledTruths, setShuffledTruths] = useState(
    shuffle([...truths].filter((item) => item.category === category))
  );
  const [shuffledDares, setShuffledDares] = useState(
    shuffle([...dares].filter((item) => item.category === category))
  );
  const [option, setOption] = useState("");
  let shuffledTruth = { question: "" };
  let shuffledDare = { question: "" };
  let shuffledPlayer = shuffledPlayers[0];

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

  if (shuffledPlayers.length === 0) {
    return Promise.resolve(setShuffledPlayers(shuffle([...players]))).then(
      () => (shuffledPlayer = shuffledPlayers[0])
    );
  }
  if (shuffledTruths.length === 0) setShuffledTruths(shuffle([...truths]));
  if (shuffledDares.length === 0) setShuffledDares(shuffle([...dares]));
  if (!shuffledTruth.question) shuffledTruth = shuffledTruths[0];
  if (!shuffledDare.question) shuffledDare = shuffledDares[0];

  return (
    <View
      tw="h-full items-center justify-between"
      style={{ backgroundColor: pageTheme.bg }}>
      <LottieView
        tw="absolute h-full"
        ref={LottieRef}
        source={require("../assets/animation_lkb6094l.json")}
        loop={false}
        speed={2}
      />
      <View tw="w-full h-2/6 items-center">
        <Header />
        <GameRanking players={players} setPlayers={setPlayers} />
      </View>
      <View
        tw="w-11/12 h-3/6 items-center rounded-xl justify-self-end mb-2"
        style={{ backgroundColor: pageTheme.fg }}>
        <View
          tw="flex-row rounded-t-xl p-1 h-14 w-full"
          style={{ backgroundColor: shuffledPlayer.colour }}>
          <View tw="basis-2/3 m-2">
            <Text tw="font-black text-gray-300 text-3xl ">
              {shuffledPlayer.name}
            </Text>
          </View>
          <View tw="flex-row right-0 absolute">
            <Text
              tw="m-1 text-xl p-2  rounded-l-xl text-gray-300 bg-gray-600"
              style={{ backgroundColor: pageTheme.fg }}>
              {"👎"}
            </Text>
            <Text
              tw="m-1 text-xl p-2 rounded-r-xl text-gray-300 bg-gray-600"
              style={{ backgroundColor: pageTheme.fg }}>
              {"👍"}
            </Text>
          </View>
        </View>
        {option === "truth" ? (
          <SwipeableCard
            LottieRef={LottieRef}
            shuffledPlayer={shuffledPlayers[0]}
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
            shuffledPlayer={shuffledPlayer}
            setPlayers={setPlayers}
            players={players}
            shuffledPlayers={shuffledPlayers}
            setShuffledPlayers={setShuffledPlayers}
            item={shuffledDare}
            value={2}
            removeCard={removeCard}
          />
        ) : (
          <View tw="h-5/6 flex-row">
            <TouchableOpacity
              onPress={() => setOption("truth")}
              tw="basis-1/2 bg-black justify-center items-center rounded-bl-md">
              <Text tw="text-white font-black text-center text-5xl">Truth</Text>
              <Text tw="text-white font-black text-center text-5xl">+1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setOption("dare")}
              tw="basis-1/2 bg-white justify-center items-center  rounded-br-md">
              <Text tw="text-black font-black text-center text-5xl">Dare</Text>
              <Text tw="text-black font-black text-center text-5xl">+2</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
