import { View, Text, TouchableOpacity, Image } from "react-native";
import PlayerList from "../components/PlayerList";
import { useEffect, useState, useRef } from "react";
import Sets from "../components/Sets";
import AddPlayerForm from "../components/AddPlayerForm";
import Header from "../components/Header";
import { theme } from "../assets/colours";
import { useRoute } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInUp,
  SlideOutUp,
} from "react-native-reanimated";
import WinnerScreen from "../components/WinnerScreen";

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
  const pageTheme = theme(route.name);
  const [warn, setWarn] = useState(false);
  useEffect(() => LottieRef.current?.play(), [players]);

  if (err) setTimeout(() => setErr(""), 2500);

  return (
    <View
      tw="items-center h-full w-full justify-between"
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
      <View tw="w-full pt-4">
        <Header />
        <PlayerList
          warn={warn}
          setWarn={setWarn}
          setPlayerForm={setPlayerForm}
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
          tw="bottom-1 right-1 h-14 w-14 absolute bg-[#ee1b24] rounded-xl items-center justify-center">
          <Text tw="text-white text-4xl">+</Text>
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
  );
}
