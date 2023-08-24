import { useEffect, useState } from "react";
import Welcome from "./screens/Welcome";
import TruthOrDare from "./screens/TruthOrDare";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Quiz from "./screens/Quiz";

const Stack = createNativeStackNavigator();

export default function App() {
  const [ok, setOk] = useState(false);
  const [players, setPlayers] = useState([
    {
      name: "aaron",
      colour: "purple",
      score: 0,
      tod: "explicit",
      fastQ: false,
    },
    { name: "reginald", colour: "red", score: 0, tod: "na", fastQ: false },
    { name: "sally", colour: "green", score: 0, tod: "na", fastQ: false },
    {
      name: "mmmmmmmmm",
      colour: "blue",
      score: 0,
      tod: "na",
      fastQ: false,
    },
  ]);
  useEffect(() => {
    players[0].score > 0 && setOk(true);
  }, [players[0].score]);

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
              setPlayers={setPlayers}
              players={players}
              ok={ok}
              setOk={setOk}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Truth or Dare">
          {(props) => <TruthOrDare setPlayers={setPlayers} players={players} />}
        </Stack.Screen>
        <Stack.Screen name="Quiz">
          {(props) => <Quiz setPlayers={setPlayers} players={players} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
