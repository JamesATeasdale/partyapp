import { useEffect, useState } from "react";
import Welcome from "./screens/Welcome";
import TruthOrDare from "./screens/TruthOrDare";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FastQuiz from "./screens/FastQuiz";

const Stack = createNativeStackNavigator();

export default function App() {
  const [players, setPlayers] = useState([
    { name: "malcom", colour: "red", score: 0 },
    { name: "mlcom", colour: "blue", score: 0 },
    { name: "alcom", colour: "yellow", score: 0 },
    { name: "macom", colour: "green", score: 0 },
  ]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Party Animals"
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}>
        <Stack.Screen name="Party Animals">
          {(props) => <Welcome setPlayers={setPlayers} players={players} />}
        </Stack.Screen>
        <Stack.Screen name="Truth or Dare">
          {(props) => <TruthOrDare setPlayers={setPlayers} players={players} />}
        </Stack.Screen>
        <Stack.Screen name="Fast Quiz">
          {(props) => <FastQuiz setPlayers={setPlayers} players={players} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
