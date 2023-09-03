import { View, Text } from "react-native";
import { theme } from "../assets/colours";
import { useRoute } from "@react-navigation/native";

export default function CardBanner({ shuffledPlayer }) {
  const route = useRoute();
  const pageTheme = theme(route.name);
  return (
    <View tw="flex-row w-full justify-between items-end">
      <Text
        tw="pt-2 pl-2 text-white text-4xl basis-3/5"
        style={{ color: shuffledPlayer.colour, fontFamily: "header" }}
        numberOfLines={1}>
        {shuffledPlayer.name}
      </Text>
      <View tw="justify-center">
        <Text
          tw="text-black text-4xl px-4 pt-2"
          style={{ color: pageTheme.text, fontFamily: "header" }}
          numberOfLines={1}>
          {shuffledPlayer.score}
        </Text>
      </View>
    </View>
  );
}
