import { useNavigation, useRoute } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { theme } from "../assets/colors";

export default function Sets() {
  const navigation = useNavigation();
  const route = useRoute();
  const pageTheme = theme(route.name);

  return (
    <View
      tw="flex-col w-11/12 m-4 rounded-xl h-3/6 p-2 content-center"
      style={{ backgroundColor: pageTheme.fg }}>
      <TouchableOpacity
        tw="bg-[#2c935f] grow basis-1/4 justify-center"
        onPress={() => navigation.navigate("Truth or Dare")}>
        <Text tw="text-center text-4xl font-black ">Truth Or Dare</Text>
      </TouchableOpacity>
      <TouchableOpacity
        tw="bg-[#e75b0e] grow basis-1/4  justify-center"
        onPress={() => navigation.navigate("Fast Quiz")}>
        <Text tw="text-center text-4xl font-black">Fast Quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity
        tw="bg-[#2caec1] grow basis-1/4 justify-center"
        onPress={() => {}}>
        <Text tw="text-center text-4xl font-black">Ice Breakers</Text>
      </TouchableOpacity>
      <View
        style={{
          width: 124,
          borderBottomColor: "#ee1b24",
          borderBottomWidth: 30,
          borderLeftWidth: 30,
          borderRightWidth: 30,
          borderRightColor: "transparent",
          borderLeftColor: "transparent",
          transform: [{ rotate: "315deg" }],
          top: 18,
          left: -30,
          position: "absolute",
        }}
        tw="items-center">
        <Text
          style={{
            fontWeight: "600",
            fontSize: 18,
            color: "white",
            position: "absolute",
          }}>
          Games
        </Text>
      </View>
    </View>
  );
}
