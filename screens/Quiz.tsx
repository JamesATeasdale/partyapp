import { View, Text, TouchableOpacity, Switch } from "react-native";
import GameRanking from "../components/GameRanking";
import Header from "../components/Header";
import { theme } from "../assets/colours";
import { useRoute } from "@react-navigation/native";
import shuffle from "../hooks/shuffleArray";
import fastquizquestions from "../assets/quiz.json";
import { useState, useEffect } from "react";
import Animated, {
  FadeIn,
  SlideInLeft,
  SlideInRight,
} from "react-native-reanimated";
import CardBanner from "../components/CardBanner";
import Intro from "../components/newIntro";
import PointNotifier from "../components/PointNotifier";
import FlipCard from "../components/FlipCard";
import {
  BannerAdSize,
  GAMBannerAd,
  TestIds,
} from "react-native-google-mobile-ads";
import AddPlayerForm from "../components/AddPlayerForm";
import Slider from "@react-native-assets/slider";

import { ANDROID_BANNER_AD_ID } from "@env";

const idSwitch = __DEV__ ? TestIds.BANNER : ANDROID_BANNER_AD_ID;

export default function Quiz({
  players,
  setPlayers,
  changePlayer,
  setChangePlayer,
  playerForm,
  setPlayerForm,
  setAdCount,
  adCount,
}) {
  const [win, setWin] = useState(0);
  const [newGame, setNewGame] = useState(false);
  const [shuffledPlayers, setShuffledPlayers] = useState(shuffle([...players]));
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [err, setErr] = useState("");
  const [fastQ, setFastQ] = useState(0);
  const route = useRoute();
  const pageTheme = theme(route.name);
  let shuffledQuestion = { question: "", answer: "" };
  const removeQuestion = () => {
    setAdCount(adCount + 1);
    setShuffledQuestions(
      shuffledQuestions.filter((shuffledQ) => shuffledQ !== shuffledQuestion)
    );
  };

  useEffect(() => setFastQ(shuffledPlayers[0].fastQ), [shuffledPlayers]);

  if (shuffledPlayers.length === 0 || !players.includes(shuffledPlayers[0]))
    setShuffledPlayers(shuffle([...players]));

  if (shuffledQuestions.length === 0 && shuffledPlayers.length)
    setShuffledQuestions(shuffle([...fastquizquestions]));

  if (!shuffledQuestion.question && shuffledPlayers.length)
    shuffledQuestion = shuffledQuestions.find(
      (ques) => shuffledPlayers[0].quiz.includes(ques.category) && ques
    );

  return (
    <View tw="h-full" style={{ backgroundColor: pageTheme.fg }}>
      <View tw="w-full h-full absolute items-center">
        <Animated.Image
          tw="h-full absolute"
          entering={SlideInLeft.duration(800)}
          source={require("../assets/Images/jaggedleft.png")}
        />
        <Animated.Image
          entering={SlideInRight.duration(800)}
          tw="h-full absolute"
          source={require("../assets/Images/jaggedright.png")}
        />
      </View>
      <GAMBannerAd unitId={idSwitch} sizes={[BannerAdSize.FULL_BANNER]} />
      <View tw="grow w-full items-center justify-between">
        <View tw="w-full">
          <Header />
          <GameRanking
            setChangePlayer={setChangePlayer}
            players={players}
            setPlayerForm={setPlayerForm}
          />
        </View>
        <View
          tw="h-3/6 mb-4 w-11/12 rounded-xl justify-between"
          style={{ backgroundColor: pageTheme.fg }}>
          {!newGame ? (
            <Animated.View
              entering={FadeIn.duration(1200)}
              tw="items-center w-full h-full">
              <View tw="w-5/6 justify-between pt-4 pb-2">
                <Slider
                  minimumTrackTintColor={pageTheme.text}
                  maximumTrackTintColor={"gray"}
                  trackHeight={12}
                  minimumValue={0}
                  maximumValue={12}
                  slideOnTap={true}
                  thumbTintColor={pageTheme.bg}
                  thumbSize={48}
                  onValueChange={setFastQ}
                  value={fastQ}
                  step={4}
                />
                <Text
                  tw="w-full text-center text-4xl"
                  style={{ color: pageTheme.bg, fontFamily: "header" }}>
                  {!fastQ ? "off" : fastQ + " seconds"}
                </Text>
              </View>
              <Animated.View tw="px-2 grow w-full">
                <TouchableOpacity
                  tw="grow"
                  onPress={() => {
                    setWin(0);
                    setNewGame(!newGame);
                  }}>
                  <Intro shuffledPlayer={shuffledPlayers[0]} />
                </TouchableOpacity>
              </Animated.View>
            </Animated.View>
          ) : (
            <View tw="h-full w-full items-center">
              <CardBanner shuffledPlayer={shuffledPlayers[0]} />
              <FlipCard
                shuffledPlayers={shuffledPlayers}
                setShuffledPlayers={setShuffledPlayers}
                fastQ={fastQ}
                shuffledQuestion={shuffledQuestion}
                setWin={setWin}
                removeQuestion={removeQuestion}
                setNewGame={setNewGame}
                players={players}
                setPlayers={setPlayers}
              />
            </View>
          )}
        </View>
        {playerForm && (
          <AddPlayerForm
            setErr={setErr}
            setPlayers={setPlayers}
            players={players}
            setPlayerForm={setPlayerForm}
            isAdd={false}
            changePlayer={changePlayer}
          />
        )}
        {win > 0 && <PointNotifier value={win} />}
      </View>
    </View>
  );
}
