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
      tw="w-11/12 m-2 flex-row p-4 rounded-t-xl justify-center">
      {route.name === "Party Animals" ? (
        title.split("").map((letter, index) => {
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
        })
      ) : (
        <Animated.View entering={ZoomIn.duration(2200)}>
          <Text
            style={{
              fontSize: 40,
              fontFamily: "Caprasimo-Regular",
              color: "#520000",
            }}>
            {title}
          </Text>
        </Animated.View>
      )}
    </TouchableOpacity>
  );
}
