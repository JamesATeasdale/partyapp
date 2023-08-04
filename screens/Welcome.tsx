import { View, Text } from "react-native";
import PlayerList from "../components/PlayerList";
import { useState } from "react";
import Sets from "../components/Sets";
import AddPlayerForm from "../components/AddPlayerForm";
import BalloonTransition from "../components/BalloonsTransition";
import Header from "../components/Header";
import { main } from "../assets/colors";

export default function Welcome({ players, setPlayers }) {
  const [isAdd, setIsAdd] = useState(false);
  const [err, setErr] = useState("");

  return (
    <View tw="items-center h-full" style={{ backgroundColor: main.bg }}>
      <BalloonTransition players={players} />
      {err && (
        <View tw="absolute w-full top-0 bg-red-900 items-center">
          <Text tw="text-white font-extrabold text-xl">{err}</Text>
        </View>
      )}
      <Header title={"Party Animals"} />
      <PlayerList
        players={players}
        setIsAdd={setIsAdd}
        setPlayers={setPlayers}
      />
      <Sets />
      {isAdd && (
        <AddPlayerForm
          setPlayers={setPlayers}
          players={players}
          setIsAdd={setIsAdd}
          setErr={setErr}
        />
      )}
    </View>
  );
}
