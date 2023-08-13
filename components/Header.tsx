import { Animated, TouchableOpacity, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ZoomIn } from "react-native-reanimated";
import { multi, green, main } from "../assets/colors";

export default function Header({ title }) {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Party Animals");
      }}
      style={{
        backgroundColor:
          route.name === "Party Animals"
            ? main.fg
            : route.name === "Truth or Dare"
            ? green.fg
            : "black",
      }}
      tw="w-11/12 mb-2 mt-4 flex-row p-4 rounded-t-xl justify-center">
      {title.split("").map((letter, index) => {
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
