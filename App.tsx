import { useEffect, useState } from "react";
import Welcome from "./screens/Welcome";
import TruthOrDare from "./screens/TruthOrDare";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Quiz from "./screens/Quiz";
import Casual from "./screens/Casual";
import { useFonts } from "expo-font";
import { getBatteryLevel } from "react-native-device-info";

const Stack = createNativeStackNavigator();

export default function App() {
  const [changePlayer, setChangePlayer] = useState({ name: "" });
  const [winners, setWinners] = useState(false);
  const [playerForm, setPlayerForm] = useState(false);
  const [highScore, setHighScore] = useState(5);
  const [speed, setSpeed] = useState(0);
  const [playAnims, setPlayAnims] = useState(true);
  const [players, setPlayers] = useState(
    [
      {
        name: "aaron",
        colour: "purple",
        score: 11,
        tod: "explicit",
        fastQ: false,
        quiz: ["Animals"],
      },
      {
        name: "reginald",
        colour: "red",
        score: 0,
        tod: "na",
        fastQ: false,
        quiz: ["Music"],
      },
      {
        name: "sally",
        colour: "green",
        score: 0,
        tod: "na",
        fastQ: false,
        quiz: ["Science"],
      },
      {
        name: "mmmmmmmmm",
        colour: "blue",
        score: 0,
        tod: "na",
        fastQ: false,
        quiz: ["Geography"],
      },
    ].sort((a, b) => b.score - a.score)
  );
  useEffect(() => {
    getBatteryLevel().then((perc) =>
      perc > 0.3 && playAnims ? setSpeed(0.3) : setSpeed(0)
    );
  }, [playAnims]);

  useEffect(() => {
    if (players.length && players[0].score > highScore + 2) {
      setWinners(true);
      setHighScore(players[0].score);
    }
  }, [players]);

  const [fontsLoaded] = useFonts({
    // fun: require("./assets/fonts/Laila-Bold.ttf"),
    text: require("./assets/fonts/Itim-Regular.ttf"),
    header: require("./assets/fonts/Caprasimo-Regular.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Party Animals"
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}>
        <Stack.Screen name="Party Animals">
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
              playAnims={playAnims}
              speed={speed}
              setPlayAnims={setPlayAnims}
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
              playAnims={playAnims}
              speed={speed}
              setPlayAnims={setPlayAnims}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Casual">
          {(props) => (
            <Casual
              setPlayers={setPlayers}
              players={players}
              playAnims={playAnims}
              speed={speed}
              setPlayAnims={setPlayAnims}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
