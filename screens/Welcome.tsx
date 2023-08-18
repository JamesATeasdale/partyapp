import { View, Text, TouchableOpacity } from "react-native";
import PlayerList from "../components/PlayerList";
import { useEffect, useState, useRef } from "react";
import Sets from "../components/Sets";
import AddPlayerForm from "../components/AddPlayerForm";
import Header from "../components/Header";
import { theme } from "../assets/colors";
import { useRoute } from "@react-navigation/native";
import LottieView from "lottie-react-native";

export default function Welcome({ players, setPlayers }) {
  const LottieRef = useRef(null);
  useEffect(() => LottieRef.current?.play(), [players]);
  const route = useRoute();
  const [err, setErr] = useState("");
  const [isAdd, setIsAdd] = useState(false);
  const pageTheme = theme(route.name);

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
          setIsAdd={setIsAdd}
          players={players}
          setPlayers={setPlayers}
        />
      </View>
      <Sets />
      {isAdd && (
        <AddPlayerForm
          setErr={setErr}
          setPlayers={setPlayers}
          players={players}
          setIsAdd={setIsAdd}
        />
      )}
      {err && (
        <Text tw="bg-red-700 w-full font-bold text-white text-center text-lg pt-0 top-0 absolute">
          {err}
        </Text>
      )}
    </View>
  );
}
