import { useState, useRef, useEffect, createContext } from "react";
import Welcome from "./screens/Welcome";
import TruthOrDare from "./screens/TruthOrDare";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  const [players, setPlayers] = useState([
    { name: "james", color: "#0FC0FC", score: 0 },
    { name: "Andy444444444444444444444444444444", color: "#F8EF6B", score: 10 },
  ]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Party Animals"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Party Animals">
          {(props) => <Welcome setPlayers={setPlayers} players={players} />}
        </Stack.Screen>
        <Stack.Screen name="Truth or Dare">
          {(props) => <TruthOrDare setPlayers={setPlayers} players={players} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
