import { TouchableOpacity, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Animated, { ZoomIn } from "react-native-reanimated";
import { multi, theme } from "../assets/colours";

export default function Header() {
  const navigation = useNavigation();
  const route = useRoute();
  const pageTheme = theme(route.name);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Party Animals")}
      tw="my-4 flex-row justify-center">
      {route.name.split("").map((letter, ind) => (
        <Animated.View entering={ZoomIn.duration((ind + 1) * 200)} key={ind}>
          <Text
            numberOfLines={1}
            tw="text-white text-5xl"
            style={{
              fontFamily: "Caprasimo-Regular",
            }}>
            {letter}
          </Text>
        </Animated.View>
      ))}
    </TouchableOpacity>
  );
}
