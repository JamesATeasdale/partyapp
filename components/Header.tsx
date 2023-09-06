import { TouchableOpacity, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Animated, { BounceInUp, ZoomIn } from "react-native-reanimated";
import { multi, theme } from "../assets/colours";

export default function Header() {
  const navigation = useNavigation();
  const route = useRoute();
  const pageTheme = theme(route.name);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Party Box")}
      tw=" mb-4  flex-row justify-center w-full">
      {route.name.split("").map((letter, ind) => (
        <Animated.View
          entering={BounceInUp.duration(ind * 100 + 600)}
          key={ind}>
          <Text
            numberOfLines={1}
            tw="text-5xl"
            style={{
              color: pageTheme.text,
              fontFamily: "header",
            }}>
            {letter}
          </Text>
        </Animated.View>
      ))}
    </TouchableOpacity>
  );
}
