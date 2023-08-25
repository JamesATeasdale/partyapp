import { useNavigation, useRoute } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { theme } from "../assets/colours";
import { ScrollView } from "react-native";
import Animated, { SlideInLeft } from "react-native-reanimated";
import { useEffect, useState } from "react";
import colours from "../assets/colours";

export default function Sets({ setWarn, players }) {
  const navigation = useNavigation();
  const [pages, setPages] = useState([
    "Truth or Dare",
    "Quiz",
    "Would You Rather",
    "What Would You Do",
  ]);
  const pageCol = [colours.green, colours.orange, colours.blue, colours.pink];

  return (
    <View tw="h-4/6 justify-end mb-4 w-11/12">
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
              tw="text-center text-4xl font-black text-white"
              style={{ color: pageCol[ind].text, fontFamily: "Itim-Regular" }}>
              {pages[ind]}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      ))}
    </View>
  );
}
