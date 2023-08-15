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
      onPress={() => {
        navigation.navigate("Party Animals");
      }}
      style={{
        backgroundColor: pageTheme.fg,
      }}
      tw="w-11/12 mb-2 mt-2 flex-row p-2 rounded-t-lg justify-center">
      {route.name.split("").map((letter, index) => {
        return (
          <Animated.View key={index} entering={ZoomIn.duration(index * 200)}>
            <Text
              style={{
                fontSize: 40,
                fontFamily: "Caprasimo-Regular",
                color: multi[Math.floor(Math.random() * multi.length)],
              }}>
              {letter}
            </Text>
          </Animated.View>
        );
      })}
    </TouchableOpacity>
  );
}
