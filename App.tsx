import { useState, useRef, useEffect } from "react";
import { ImageBackground, Text, View, Dimensions } from "react-native";
import Welcome from "./screens/Welcome";
import TruthOrDare from "./screens/TruthOrDare";
import LottieView from "lottie-react-native";
// const lottieBalloons = require("./assets/animation_lkb6094l.json");

export default function App() {
  const [players, setPlayers] = useState([
    { name: "james", color: "#0FC0FC", score: 0 },
    { name: "Andy444444444444444444444444444444", color: "#F8EF6B", score: 10 },
  ]);

  const [page, setPage] = useState("");

  return (
    <View>
      {page === "truth or dare" ? (
        <TruthOrDare
          setPage={setPage}
          players={players}
          setPlayers={setPlayers}
        />
      ) : (
        <Welcome setPage={setPage} players={players} setPlayers={setPlayers} />
      )}
    </View>
  );
}
