import { View, Text, TouchableOpacity } from "react-native";
import PlayerList from "../components/PlayerList";
import { useEffect, useState, useRef } from "react";
import Sets from "../components/Sets";
import AddPlayerForm from "../components/AddPlayerForm";
import Header from "../components/Header";
import { theme } from "../assets/colors";
import { useRoute } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export default function Welcome({ players, setPlayers }) {
  const LottieRef = useRef(null);
  const route = useRoute();
  const [err, setErr] = useState("");
  const [isAdd, setIsAdd] = useState(false);
  const pageTheme = theme(route.name);
  const [them, setThem] = useState(false);
  useEffect(() => LottieRef.current?.play(), [players]);

  if (err) setTimeout(() => setErr(""), 2500);

  return (
    <View
      tw="items-center h-full justify-between"
      style={{ backgroundColor: pageTheme.bg }}>
      <LottieView
        tw="absolute h-full"
        ref={LottieRef}
        source={require("../assets/animation_lkb6094l.json")}
        loop={false}
        speed={2}
      />
      <View tw="w-full items-center">
        <Header />
        <PlayerList
          them={them}
          setThem={setThem}
          setIsAdd={setIsAdd}
          players={players}
          setPlayers={setPlayers}
        />
      </View>
      <Sets setThem={setThem} players={players} />
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
    </View>
  );
}
