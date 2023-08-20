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
      tw="mb-2 mt-2 flex-row px-6 rounded-lg justify-center"
      style={{ backgroundColor: pageTheme.fg }}>
      <Animated.Text
        entering={ZoomIn}
        style={{
          fontSize: 40,
          fontFamily: "Caprasimo-Regular",
          color: "black",
        }}>
        {route.name}
      </Animated.Text>
    </TouchableOpacity>
  );
}
