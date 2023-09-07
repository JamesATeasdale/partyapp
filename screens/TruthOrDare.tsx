import GameRanking from "../components/GameRanking";
import Header from "../components/Header";
import { theme } from "../assets/colours";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import truths from "../assets/truths.json";
import dares from "../assets/dares.json";
import { TouchableOpacity, Text, View, Image } from "react-native";
import SwipeableCard from "../components/SwipeCard";
import shuffle from "../hooks/shuffleArray";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
} from "react-native-reanimated";
import PointNotifier from "../components/PointNotifier";
import {
  BannerAdSize,
  GAMBannerAd,
  TestIds,
} from "react-native-google-mobile-ads";
import AddPlayerForm from "../components/AddPlayerForm";

export default function TruthOrDare({
  players,
  setPlayers,
  playerForm,
  setPlayerForm,
  setRoll,
}) {
  const [win, setWin] = useState(0);
  const [shuffledPlayers, setShuffledPlayers] = useState(shuffle([...players]));
  const [shuffledTruths, setShuffledTruths] = useState([]);
  const [shuffledDares, setShuffledDares] = useState([]);
  const [value, setvalue] = useState(0);
  const route = useRoute();
  const navigation = useNavigation();
  const LottieRef = useRef(null);
  const pageTheme = theme(route.name);
  const todToggle = ["na", "", "explicit"];
  let shuffledTruth = { question: "" };
  let shuffledDare = { question: "" };
  const [changePlayer, setChangePlayer] = useState({ name: "" });
  const [err, setErr] = useState("");

  if (shuffledPlayers.length === 0 || !players.includes(shuffledPlayers[0]))
    setShuffledPlayers(shuffle(players));

  if (shuffledTruths.length === 0 && shuffledPlayers.length)
    setShuffledTruths(shuffle(truths));

  if (shuffledDares.length === 0 && shuffledPlayers.length)
    setShuffledDares(shuffle(dares));

  if (!shuffledTruth.question && shuffledPlayers.length)
    shuffledTruth = shuffledTruths.find((truth) =>
      shuffledPlayers[0].tod ? truth.category === shuffledPlayers[0].tod : truth
    );
  if (!shuffledDare.question && shuffledPlayers.length)
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
    setvalue(0);
    setRoll(true);
  };

  return (
    shuffledPlayers.length && (
      <View
        tw="h-full w-full items-center justify-between"
        style={{ backgroundColor: pageTheme.bg }}>
        <View tw="w-full h-2/6">
          <GAMBannerAd
            unitId={TestIds.BANNER}
            sizes={[BannerAdSize.FULL_BANNER]}
          />
          <Header />
          <GameRanking
            setChangePlayer={setChangePlayer}
            players={players}
            setPlayerForm={setPlayerForm}
          />
        </View>
        <View tw="h-3/6 w-11/12 items-center mb-4">
          <View
            tw=" flex-row rounded-lg mb-2 p-1 w-full justify-between"
            style={{ backgroundColor: pageTheme.fg }}>
            <Text
              numberOfLines={1}
              style={{ fontFamily: "header", color: shuffledPlayers[0].colour }}
              tw="basis-5/6 text-4xl pl-1">
              {shuffledPlayers[0].name}
            </Text>
            <Text
              style={{ fontFamily: "header", color: pageTheme.text }}
              tw="text-center text-5xl pr-2">
              {shuffledPlayers[0].score}
            </Text>
          </View>
          <View
            tw="rounded-xl items-center w-full grow"
            style={{
              backgroundColor: pageTheme.fg,
            }}>
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
              <View tw="flex-row grow rounded-md">
                <Animated.View
                  tw="basis-1/2 justify-center rounded-l-md border-r-2"
                  entering={SlideInLeft.duration(600)}
                  exiting={SlideOutLeft}
                  style={{
                    borderColor: pageTheme.fg,
                    backgroundColor: pageTheme.asset,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setvalue(1);
                      setWin(0);
                    }}
                    tw="items-center justify-center w-full">
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
                      tw=" text-center text-5xl"
                      style={{ color: pageTheme.text, fontFamily: "header" }}>
                      Truth
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
                <Animated.View
                  tw="basis-1/2 justify-center rounded-r-md border-l-2"
                  entering={SlideInRight.duration(600)}
                  exiting={SlideOutRight}
                  style={{
                    borderColor: pageTheme.fg,
                    backgroundColor: pageTheme.asset,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setWin(0);
                      setvalue(2);
                    }}
                    tw="justify-center items-center  w-full">
                    <Text
                      style={{
                        fontSize: 280,
                        opacity: 0.3,
                        fontFamily: "Itim-Regular",
                      }}
                      tw="absolute">
                      !
                    </Text>
                    <Text
                      tw="text-black text-center text-5xl"
                      style={{ color: pageTheme.text, fontFamily: "header" }}>
                      Dare
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
                <Animated.View
                  tw="absolute items-center w-full"
                  entering={FadeIn}
                  exiting={FadeOut}>
                  <TouchableOpacity
                    tw=" w-full items-center"
                    onPress={() => {
                      setPlayers(
                        players.map((player) =>
                          shuffledPlayers[0].name === player.name
                            ? {
                                ...player,
                                tod:
                                  player.tod === "explicit"
                                    ? todToggle[0]
                                    : todToggle[
                                        todToggle.indexOf(player.tod) + 1
                                      ],
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
                                        todToggle.indexOf(shuffledPlayer.tod) +
                                          1
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
          {win > 0 && <PointNotifier value={win} />}
        </View>
        {playerForm && (
          <AddPlayerForm
            setPlayerForm={setPlayerForm}
            setErr={setErr}
            setPlayers={setPlayers}
            players={players}
            changePlayer={changePlayer}
            isAdd={false}
          />
        )}
      </View>
    )
  );
}
