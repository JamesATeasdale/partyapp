import { Text, TouchableOpacity, View } from "react-native";
import Header from "../components/Header";
import { useRoute } from "@react-navigation/native";
import { theme } from "../assets/colours";
import whatif from "../assets/whatif.json";
import shuffle from "../hooks/shuffleArray";
import { useState } from "react";

export default function Casual({ players }) {
  const [shuffledWhatif, setShuffledWhatif] = useState([]);
  const route = useRoute();
  const pageTheme = theme(route.name);

  if (!shuffledWhatif.length) return setShuffledWhatif(shuffle(whatif));
  console.log(shuffledWhatif.length);

  return (
    <View
      tw="w-full h-full justify-between items-center"
      style={{ backgroundColor: pageTheme.bg }}>
      <Header />
      <View
        tw="h-4/6 w-11/12 mb-4 rounded-lg items-center justify-between p-2"
        style={{ backgroundColor: pageTheme.asset }}>
        <Text tw="text-5xl font-black" style={{ color: pageTheme.text }}>
          What If...
        </Text>
        <TouchableOpacity
          onPress={() => setShuffledWhatif(shuffledWhatif.slice(1))}
          tw="justify-center grow">
          <Text
            tw="text-3xl font-black text-center"
            style={{ color: pageTheme.text }}>
            {shuffledWhatif[0].question
              .replace("What if ", "")
              .replace("What would you do if ", "")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
