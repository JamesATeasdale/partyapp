import { View } from "react-native";
import BalloonTransition from "../components/BalloonsTransition";
import GameRanking from "../components/GameRanking";
import Header from "../components/Header";

export default function TruthOrDare({ players, setPlayers }) {
  return (
    <View tw="h-full items-center bg-[#0c3713]">
      <BalloonTransition players={players} />
      <Header palette={"reds"} title={"Truth or Dare"} />
      <GameRanking players={players} setPlayers={setPlayers} />
    </View>
  );
}
