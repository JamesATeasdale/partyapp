import { useEffect, useState } from "react";
import Welcome from "./screens/Welcome";
import TruthOrDare from "./screens/TruthOrDare";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Quiz from "./screens/Quiz";
import Casual from "./screens/Casual";
import { useFonts } from "expo-font";
import adplayer from "./hooks/adplayer";
const Stack = createNativeStackNavigator();

export default function App() {
  const [changePlayer, setChangePlayer] = useState({ name: "" });
  const [winners, setWinners] = useState(false);
  const [playerForm, setPlayerForm] = useState(false);
  const [highScore, setHighScore] = useState(5);
  const [adCount, setAdCount] = useState(0);
  const [players, setPlayers] = useState(
    [
      {
        name: "aaron",
        colour: "purple",
        score: 1,
        tod: "explicit",
        fastQ: 1,
        quiz: ["Animals"],
      },
      {
        name: "reginald",
        colour: "red",
        score: 0,
        tod: "na",
        fastQ: 3,
        quiz: ["Music"],
      },
      {
        name: "sally",
        colour: "green",
        score: 0,
        tod: "na",
        fastQ: 9,
        quiz: ["Science"],
      },
      {
        name: "mmmmmmmmm",
        colour: "blue",
        score: 0,
        tod: "na",
        fastQ: 8,
        quiz: ["Geography"],
      },
    ].sort((a, b) => b.score - a.score)
  );

  useEffect(() => {
    if (players.length && players[0].score > highScore + 2) {
      setWinners(true);
      setHighScore(players[0].score);
    }
  }, [players]);

  const [fontsLoaded] = useFonts({
    text: require("./assets/fonts/Itim-Regular.ttf"),
    header: require("./assets/fonts/TitanOne-Regular.ttf"),
  });

  if (!fontsLoaded) return null;
  if (adCount > 40) {
    adplayer();
    setAdCount(0);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenListeners={{
          state: (e) => {
            if (!Math.floor(Math.random() * 15)) adplayer();
          },
        }}
        initialRouteName="Party Box"
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}>
        <Stack.Screen name="Party Box">
          {(props) => (
            <Welcome
              setPlayerForm={setPlayerForm}
              playerForm={playerForm}
              changePlayer={changePlayer}
              players={players}
              setPlayers={setPlayers}
              winners={winners}
              setWinners={setWinners}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Truth or Dare">
          {(props) => (
            <TruthOrDare
              setPlayerForm={setPlayerForm}
              playerForm={playerForm}
              setPlayers={setPlayers}
              players={players}
              setAdCount={setAdCount}
              adCount={adCount}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Quiz">
          {(props) => (
            <Quiz
              setPlayerForm={setPlayerForm}
              playerForm={playerForm}
              changePlayer={changePlayer}
              setChangePlayer={setChangePlayer}
              setPlayers={setPlayers}
              players={players}
              setAdCount={setAdCount}
              adCount={adCount}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Casual">
          {(props) => (
            <Casual
              setPlayers={setPlayers}
              players={players}
              setAdCount={setAdCount}
              adCount={adCount}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
