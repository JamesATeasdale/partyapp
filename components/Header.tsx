import { Animated, TouchableOpacity, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ZoomIn } from "react-native-reanimated";
import themes from "../assets/colors";

export default function Header({ palette, title }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Party Animals");
      }}
      style={{
        backgroundColor:
          palette === "multi"
            ? "#341651"
            : palette === "reds"
            ? "#2c935f"
            : "black",
      }}
      tw="w-11/12 m-2 flex-row p-4 rounded-3xl justify-center">
      {title.split("").map((letter, index) => {
        return (
          <Animated.View key={index} entering={ZoomIn.duration(index * 200)}>
            <Text
              style={{
                fontSize: 40,
                fontFamily: "Caprasimo-Regular",
                color:
                  themes[palette][
                    Math.floor(Math.random() * themes[palette].length)
                  ],
              }}>
              {letter}
            </Text>
          </Animated.View>
        );
      })}
    </TouchableOpacity>
  );
}
