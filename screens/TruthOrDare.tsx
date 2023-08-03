import { View } from "react-native";
import GameRanking from "../components/GameRanking";
import Header from "../components/Header";
import CardDeck from "../components/CardDeck";

export default function TruthOrDare({ players, setPlayers }) {
  return (
    <View tw="h-full items-center bg-[#0c3713]">
      <Header palette={"reds"} title={"Truth or Dare"} />
      <GameRanking players={players} setPlayers={setPlayers} />
      <CardDeck players={players} setPlayers={setPlayers} />
    </View>
  );
}
