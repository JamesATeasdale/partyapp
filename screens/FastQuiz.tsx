import { View } from "react-native";
import GameRanking from "../components/GameRanking";
import Header from "../components/Header";
import { theme } from "../assets/colors";
import { useRoute } from "@react-navigation/native";
import BalloonTransition from "../components/BalloonsTransition";

export default function FastQuiz({ players, setPlayers }) {
  const route = useRoute();
  const pageTheme = theme(route.name);
  return (
    <View tw="h-full items-center" style={{ backgroundColor: pageTheme.bg }}>
      <BalloonTransition players={players} />
      <Header />
      <GameRanking players={players} setPlayers={setPlayers} />
    </View>
  );
}
