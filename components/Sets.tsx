import { useNavigation, useRoute } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { theme } from "../assets/colors";
import { ScrollView } from "react-native";
import Animated, { SlideInLeft } from "react-native-reanimated";
import { useEffect, useState } from "react";

export default function Sets({ setWarn, players }) {
  const navigation = useNavigation();
  const [pages, setPages] = useState([
    "Truth or Dare",
    "Quiz",
    "Ice Breakers",
    "What Would You Do",
  ]);
  const pageCol = [
    "bg-[#2c935f]",
    "bg-[#e75b0e]",
    "bg-[#2caec1]",
    "bg-red-900",
  ];

  return (
    <View tw="h-4/6 flex-col justify-end mb-4 w-11/12">
      {pages.map((page, ind) => (
        <Animated.View
          key={page}
          entering={SlideInLeft.duration((ind + 1) * 300)}>
          <TouchableOpacity
            tw={pageCol[ind] + "  my-2 basis-1/5 rounded-lg justify-center"}
            onPress={() =>
              players.length === 0 ? setWarn(true) : navigation.navigate(page)
            }>
            <Text tw="text-center text-4xl font-black text-white">
              {pages[ind]}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      ))}
    </View>
  );
}
