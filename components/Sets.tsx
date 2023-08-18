import { useNavigation, useRoute } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { theme } from "../assets/colors";

export default function Sets() {
  const navigation = useNavigation();
  const route = useRoute();
  const pageTheme = theme(route.name);

  return (
    <View tw="flex-col w-11/12 m-4 rounded-xl h-3/6 p-2 content-center space-y-4">
      <TouchableOpacity
        tw="bg-[#2c935f] grow basis-1/4 rounded-lg justify-center"
        onPress={() => navigation.navigate("Truth or Dare")}>
        <Text tw="text-center text-4xl font-black text-white">
          Truth Or Dare
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        tw="bg-[#e75b0e] grow basis-1/4 rounded-lg justify-center"
        onPress={() => navigation.navigate("Fast Quiz")}>
        <Text tw="text-center text-4xl font-black text-white">Fast Quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity
        tw="bg-[#2caec1] grow basis-1/4 rounded-lg justify-center"
        onPress={() => {}}>
        <Text tw="text-center text-4xl font-black text-white">
          Ice Breakers
        </Text>
      </TouchableOpacity>
    </View>
  );
}
