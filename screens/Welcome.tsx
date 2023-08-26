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
  SlideInDown,
  SlideInUp,
  SlideOutUp,
} from "react-native-reanimated";
import WinnerScreen from "../components/WinnerScreen";

export default function Welcome({ players, setPlayers, ok, setOk }) {
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
        tw="items-center h-full w-full justify-between"
        style={{ backgroundColor: pageTheme.bg }}>
        <View tw="w-full h-full absolute">
          <Animated.Image
            entering={SlideInUp.duration(800)}
            exiting={SlideOutUp.duration(800)}
            tw="absolute"
            source={require("../assets/wave.png")}
          />
          <Animated.Image
            entering={SlideInUp.duration(1000)}
            exiting={SlideOutUp.duration(1000)}
            tw="absolute"
            source={require("../assets/wave2.png")}
          />
        </View>
        <LottieView
          tw="absolute h-full w-full"
          ref={LottieRef}
          source={require("../assets/balloons.json")}
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
        {isAdd && (
          <AddPlayerForm
            setErr={setErr}
            setPlayers={setPlayers}
            players={players}
            setIsAdd={setIsAdd}
          />
        )}
        {err && (
          <Animated.Text
            tw="bg-red-700 w-full font-bold text-white text-center text-lg pt-0 top-0 absolute"
            exiting={FadeOut}
            entering={FadeIn}>
            {err}
          </Animated.Text>
        )}
        <TouchableOpacity
          onPress={() => setIsAdd(true)}
          style={isAdd && { display: "none" }}
          tw="bottom-1 right-1 absolute h-14 w-14 bg-[#ee1b24] justify-end rounded-xl border-white border-2">
          <Text tw="text-center text-white font-bold text-5xl">+</Text>
        </TouchableOpacity>
        {ok && <WinnerScreen players={players} ok={ok} setOk={setOk} />}
      </View>
    )
  );
}
