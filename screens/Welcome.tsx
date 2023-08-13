import { View, Text } from "react-native";
import PlayerList from "../components/PlayerList";
import { useState } from "react";
import Sets from "../components/Sets";
import AddPlayerForm from "../components/AddPlayerForm";
import BalloonTransition from "../components/BalloonsTransition";
import Header from "../components/Header";
import { main } from "../assets/colors";

export default function Welcome({ players, setPlayers }) {
  const [err, setErr] = useState("");

  const [isAdd, setIsAdd] = useState(false);

  return (
    <View tw="items-center h-full" style={{ backgroundColor: main.bg }}>
      <BalloonTransition players={players} />
      <Header title={"Party Animals"} />
      <PlayerList
        setIsAdd={setIsAdd}
        players={players}
        setPlayers={setPlayers}
      />
      {players.length > 0 ? (
        <Sets />
      ) : (
        <View
          tw="w-11/12 h-2/6 bottom-5 absolute justify-center items-center rounded-xl"
          style={{ backgroundColor: main.fg }}>
          <Text tw="text-2xl text-gray-300 font-extrabold">
            Add a Player to get started
          </Text>
        </View>
      )}
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
