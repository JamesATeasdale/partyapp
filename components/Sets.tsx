import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { SlideInLeft } from "react-native-reanimated";
import colours from "../assets/colours";

export default function Sets({ setWarn, players }) {
  const navigation = useNavigation();
  const pages = ["Truth or Dare", "Quiz", "Casual"];
  const pageCol = [colours.green, colours.orange, colours.blue, colours.pink];

  return (
    <View tw="h-3/6 justify-end pb-4 w-11/12">
      {pages.map((page, ind) => (
        <Animated.View
          key={page}
          entering={SlideInLeft.duration((ind + 1) * 300)}>
          <TouchableOpacity
            style={{ backgroundColor: pageCol[ind].asset }}
            tw="my-2 basis-1/5 rounded-lg justify-center"
            onPress={() =>
              players.length === 0 ? setWarn(true) : navigation.navigate(page)
            }>
            <Text
              tw="text-center text-4xl pt-3"
              style={{
                color: pageCol[ind].text,
                fontFamily: "fun",
              }}>
              {pages[ind]}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      ))}
    </View>
  );
}
