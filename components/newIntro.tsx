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
    <Text
      tw="pt-2 text-4xl text-center"
      style={{ color: pageTheme.text, fontFamily: "header" }}>
      <Text style={{ color: shuffledPlayer.colour, fontFamily: "header" }}>
        {shuffledPlayer.name}
      </Text>
      , this one could be tricky
    </Text>,
    <Text
      tw="pt-2 text-4xl text-center"
      style={{ color: pageTheme.text, fontFamily: "header" }}>
      You're up next,{" "}
      <Text style={{ color: shuffledPlayer.colour, fontFamily: "header" }}>
        {shuffledPlayer.name}
      </Text>
      !
    </Text>,
    <Text
      tw="pt-2 text-4xl text-center"
      style={{ color: pageTheme.text, fontFamily: "header" }}>
      You've got this,{" "}
      <Text style={{ color: shuffledPlayer.colour, fontFamily: "header" }}>
        {shuffledPlayer.name}
      </Text>
    </Text>,
    <Text
      tw="pt-2 text-4xl text-center"
      style={{ color: pageTheme.text, fontFamily: "header" }}>
      <Text style={{ color: shuffledPlayer.colour, fontFamily: "header" }}>
        {shuffledPlayer.name}
      </Text>
      s turn!
    </Text>,
    <Text
      tw="pt-2 text-4xl text-center"
      style={{ color: pageTheme.text, fontFamily: "header" }}>
      Good luck{" "}
      <Text style={{ color: shuffledPlayer.colour, fontFamily: "header" }}>
        {shuffledPlayer.name}
      </Text>
      , this one could be tricky
    </Text>,
    <Text
      tw="pt-2 text-4xl text-center"
      style={{ color: pageTheme.text, fontFamily: "header" }}>
      The ball is in your court,{" "}
      <Text style={{ color: shuffledPlayer.colour, fontFamily: "header" }}>
        {shuffledPlayer.name}
      </Text>
    </Text>,
    <Text
      tw="pt-2 text-4xl text-center"
      style={{ color: pageTheme.text, fontFamily: "header" }}>
      <Text style={{ color: shuffledPlayer.colour, fontFamily: "header" }}>
        {shuffledPlayer.name}
      </Text>
      , this one's for you!
    </Text>,
    <Text
      tw="pt-2 text-4xl text-center"
      style={{ color: pageTheme.text, fontFamily: "header" }}>
      <Text style={{ color: shuffledPlayer.colour, fontFamily: "header" }}>
        {shuffledPlayer.name}
      </Text>
      , this one could be a game changer
    </Text>,
    <Text
      tw="pt-2 text-4xl text-center"
      style={{ color: pageTheme.text, fontFamily: "header" }}>
      It could still turn around,{" "}
      <Text style={{ color: shuffledPlayer.colour, fontFamily: "header" }}>
        {shuffledPlayer.name}
      </Text>
    </Text>,
    <Text
      tw="pt-2 text-4xl text-center"
      style={{ color: pageTheme.text, fontFamily: "header" }}>
      We picked this one especially for you,{" "}
      <Text style={{ color: shuffledPlayer.colour, fontFamily: "header" }}>
        {shuffledPlayer.name}
      </Text>
    </Text>,
    <Text
      tw="pt-2 text-4xl text-center"
      style={{ color: pageTheme.text, fontFamily: "header" }}>
      If anyone knows this one, it's you,{" "}
      <Text style={{ color: shuffledPlayer.colour, fontFamily: "header" }}>
        {shuffledPlayer.name}
      </Text>
    </Text>,
    <Text
      tw="pt-2 text-4xl text-center"
      style={{ color: pageTheme.text, fontFamily: "header" }}>
      This one is a brain buster,{" "}
      <Text style={{ color: shuffledPlayer.colour, fontFamily: "header" }}>
        {shuffledPlayer.name}
      </Text>{" "}
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
