import { Animated, TouchableOpacity, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ZoomIn } from "react-native-reanimated";
import { multi, theme } from "../assets/colors";

export default function Header() {
  const navigation = useNavigation();
  const route = useRoute();
  const pageTheme = theme(route.name);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Party Animals")}
      tw="my-4 flex-row px-6 rounded-lg justify-center">
      <Animated.Text
        entering={ZoomIn}
        tw="text-white text-4xl"
        style={{
          fontFamily: "Caprasimo-Regular",
        }}>
        {route.name}
      </Animated.Text>
    </TouchableOpacity>
  );
}
