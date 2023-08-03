import { View } from "react-native";
import GameRanking from "../components/GameRanking";
import Header from "../components/Header";
import CardsScreen from "../components/CardDeck";
import { useEffect } from "react";

export default function TruthOrDare({ players, setPlayers }) {
  return (
    <View tw="h-full items-center bg-[#0c3713]">
      <Header palette={"reds"} title={"Truth or Dare"} />
      <GameRanking players={players} setPlayers={setPlayers} />
      <View tw="h-3/6 w-11/12 bg-[#2c935f] rounded-md m-4 bottom-0 absolute">
        <CardsScreen players={players} setPlayers={setPlayers} />
      </View>
    </View>
  );
}
