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
        tw="bg-[#2194eb] basis-1/2 h-1/2 justify-center border-2 border-white"
        onPress={() => navigation.navigate("Fast Quiz")}>
        <Text tw="text-center p-6 text-xl font-black">Would you Rather?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        tw="bg-blue-900 basis-1/2 h-1/2 justify-center border-2 border-white"
        onPress={() => {}}>
        <Text tw="text-center p-6 text-xl font-black">Truth Or Dare</Text>
      </TouchableOpacity>
      <TouchableOpacity
        tw="bg-green-900 basis-1/2 h-1/2 justify-center border-2 border-white"
        onPress={() => {}}>
        <Text tw="text-center p-6 text-xl font-black">
          Higher or Lower (na)
        </Text>
      </TouchableOpacity>
      <View
        style={{
          width: 144,
          borderBottomColor: "#ee1b24",
          borderBottomWidth: 45,
          borderLeftWidth: 45,
          borderRightWidth: 45,
          borderRightColor: "transparent",
          borderLeftColor: "transparent",
          transform: [{ rotate: "315deg" }],
          top: 12,
          left: -37,
          position: "absolute",
        }}
        tw="items-center">
        <Text
          style={{
            fontSize: 26,
            color: "white",
            position: "absolute",
            marginTop: 0,
          }}>
          Sets
        </Text>
      </View>
    </View>
  );
}
