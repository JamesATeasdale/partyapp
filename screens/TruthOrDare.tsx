import { View } from "react-native";
import GameRanking from "../components/GameRanking";
import Header from "../components/Header";
import CardDeck from "../components/CardDeck";
import { green } from "../assets/colors";

export default function TruthOrDare({ players, setPlayers }) {
  return (
    <View tw="h-full items-center" style={{ backgroundColor: green.bg }}>
      <Header title={"Truth or Dare"} />
      <GameRanking players={players} setPlayers={setPlayers} />
      <CardDeck players={players} setPlayers={setPlayers} />
    </View>
  );
}
