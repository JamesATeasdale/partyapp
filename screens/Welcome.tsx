import { View, Text, TouchableOpacity, Image } from "react-native";
import PlayerList from "../components/PlayerList";
import { useEffect, useState, useRef } from "react";
import Sets from "../components/Sets";
import AddPlayerForm from "../components/AddPlayerForm";
import Header from "../components/Header";
import { theme } from "../assets/colours";
import { useIsFocused, useRoute } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInUp,
  SlideOutUp,
} from "react-native-reanimated";
import WinnerScreen from "../components/WinnerScreen";
import {
  TestIds,
  BannerAdSize,
  GAMBannerAd,
} from "react-native-google-mobile-ads";

export default function Welcome({
  players,
  setPlayers,
  winners,
  setWinners,
  changePlayer,
  playerForm,
  setPlayerForm,
}) {
  const LottieRef = useRef(null);
  const route = useRoute();
  const [err, setErr] = useState("");
  const [isAdd, setIsAdd] = useState(false);
  const pageTheme = theme(route.name);
  const [warn, setWarn] = useState(false);
  const isFocused = useIsFocused();
  useEffect(() => LottieRef.current?.play(), [players]);

  if (err) setTimeout(() => setErr(""), 2500);

  return (
    isFocused && (
      <View
        tw="items-center h-full w-full justify-between pt-4"
        style={{ backgroundColor: pageTheme.bg }}>
        <Animated.Image
          entering={SlideInUp.duration(800)}
          exiting={SlideOutUp.duration(800)}
          tw="absolute h-full"
          source={require("../assets/Images/wave.png")}
        />

        <Animated.Image
          entering={SlideInUp.duration(1000)}
          exiting={SlideOutUp.duration(1000)}
          tw="absolute h-full"
          source={require("../assets/Images/wave2.png")}
        />
        <LottieView
          tw="absolute h-full w-full"
          ref={LottieRef}
          source={require("../assets/Lottie/balloons.json")}
          loop={false}
          speed={2}
        />
        <View tw="w-full items-center">
          <Header />
          <PlayerList
            warn={warn}
            setWarn={setWarn}
            setIsAdd={setIsAdd}
            players={players}
            setPlayers={setPlayers}
          />
        </View>
        <Sets setWarn={setWarn} players={players} />
        {playerForm ? (
          <AddPlayerForm
            setErr={setErr}
            setPlayerForm={setPlayerForm}
            setPlayers={setPlayers}
            players={players}
            changePlayer={changePlayer}
            isAdd={true}
          />
        ) : (
          <TouchableOpacity
            onPress={() => setPlayerForm(true)}
            style={isAdd && { display: "none" }}
            tw="bottom-1 right-1 absolute bg-[#ee1b24] rounded-xl p-2 px-4 justify-center">
            <Text tw=" text-center text-white font-bold text-5xl">+</Text>
          </TouchableOpacity>
        )}
        {err && (
          <Animated.Text
            tw="bg-red-700 w-full font-bold text-white text-center text-lg pt-0 top-0 absolute"
            exiting={FadeOut}
            entering={FadeIn}>
            {err}
          </Animated.Text>
        )}

        {winners && <WinnerScreen players={players} setWinners={setWinners} />}
      </View>
    )
  );
}
