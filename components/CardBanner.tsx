import { View, Text } from "react-native";
import { theme } from "../assets/colors";
import { useRoute } from "@react-navigation/native";

export default function CardBanner({ shuffledPlayer }) {
  const route = useRoute();
  const pageTheme = theme(route.name);
  return (
    <View tw="flex-row w-full justify-between items-end">
      <Text
        tw="pl-2 text-white text-4xl basis-3/5 font-extrabold"
        style={{ color: shuffledPlayer.colour }}
        numberOfLines={1}>
        {shuffledPlayer.name}
      </Text>
      <Text
        tw="text-4xl font-black"
        style={{ color: shuffledPlayer.colour }}
        numberOfLines={1}>
        {shuffledPlayer.score}
      </Text>
      <View tw="flex-row">
        <Text
          tw="m-1 text-xl p-1 px-2 rounded-l-xl text-gray-300"
          style={{ backgroundColor: pageTheme.bg }}>
          {"👎"}
        </Text>
        <Text
          tw="m-1 text-xl p-1 px-2 rounded-r-xl text-gray-300"
          style={{ backgroundColor: pageTheme.bg }}>
          {"👍"}
        </Text>
      </View>
    </View>
  );
}
