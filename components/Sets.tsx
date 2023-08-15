import { useNavigation, useRoute } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { theme } from "../assets/colors";

export default function Sets() {
  const navigation = useNavigation();
  const route = useRoute();
  const pageTheme = theme(route.name);

  return (
    <View
      tw="flex w-11/12 m-4 rounded-xl h-2/6 flex-row flex-wrap p-2 content-center bottom-0 absolute"
      style={{ backgroundColor: pageTheme.fg }}>
      <TouchableOpacity
        tw="bg-[#2c935f] basis-1/2 h-1/2 justify-center border-2 border-white"
        onPress={() => navigation.navigate("Truth or Dare")}>
        <Text tw="text-center p-6 text-xl font-black ">Truth Or Dare</Text>
      </TouchableOpacity>
      <TouchableOpacity
        tw="bg-[#e75b0e] basis-1/2 h-1/2 justify-center border-2 border-white"
        onPress={() => navigation.navigate("Fast Quiz")}>
        <Text tw="text-center p-6 text-xl font-black">Fast Quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity
        tw="bg-[#2caec1] basis-1/2 h-1/2 justify-center border-2 border-white"
        onPress={() => {}}>
        <Text tw="text-center p-6 text-xl font-black">Ice Breakers</Text>
      </TouchableOpacity>
      <TouchableOpacity
        tw="bg-yellow-400 basis-1/2 h-1/2 justify-center border-2 border-white"
        onPress={() => {}}>
        <Text tw="text-center p-6 text-xl font-black">Higher or Lower</Text>
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
