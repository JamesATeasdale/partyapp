import { View, Text, Animated } from "react-native";
import BalloonTransition from "../components/BalloonsTransition";
import GameRanking from "../components/GameRanking";
import Header from "../components/Header";
import truths from "../assets/truths.json";
import CardsScreen from "../components/CardDeck";

export default function TruthOrDare({ players, setPlayers }) {
  return (
    <View tw="h-full items-center bg-[#0c3713]">
      <Header palette={"reds"} title={"Truth or Dare"} />
      <GameRanking players={players} setPlayers={setPlayers} />
      <View tw="bg-[#2c935f] m-4 p-2 px-4 content-center rounded-md">
        <Text tw="text-3xl font-bold text-white text-center">player1</Text>
      </View>
      <View tw="h-3/6 w-11/12 bg-[#2c935f] rounded-md mt-2">
        <CardsScreen players={players} setPlayers={setPlayers} />
      </View>
    </View>
  );
}
