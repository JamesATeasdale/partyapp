import { Text } from "react-native";
import { theme } from "../assets/colours";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";

export default function Intro({ shuffledPlayer }) {
  const route = useRoute();
  const pageTheme = theme(route.name);
  const intro = [
    <Text
      tw="pt-2 text-4xl text-center"
      style={{ color: pageTheme.text, fontFamily: "header" }}>
      <Text>It's </Text>
      <Text style={{ color: shuffledPlayer.colour, fontFamily: "header" }}>
        {shuffledPlayer.name}
      </Text>
      <Text>'s time to shine</Text>
    </Text>,
    <Text
      tw="pt-2 text-4xl text-center"
      style={{ color: shuffledPlayer.colour, fontFamily: "header" }}>
      {shuffledPlayer.name}
    </Text>,
  ];
  const [randomIntro, setRandomIntro] = useState(
    intro[Math.floor(Math.random() * intro.length)]
  );
  useEffect(() => {
    setRandomIntro(intro[Math.floor(Math.random() * intro.length)]);
  }, [shuffledPlayer]);
  return randomIntro;
}
