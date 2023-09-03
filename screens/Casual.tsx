import { Text, TouchableOpacity, View } from "react-native";
import Header from "../components/Header";
import { useRoute } from "@react-navigation/native";
import { theme } from "../assets/colours";
import whatif from "../assets/whatif.json";
import icebreakers from "../assets/icebreakers.json";
import shuffle from "../hooks/shuffleArray";
import { useRef, useState } from "react";
import LottieView from "lottie-react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { getBatteryLevel } from "react-native-device-info";
import {
  BannerAdSize,
  GAMBannerAd,
  TestIds,
} from "react-native-google-mobile-ads";
// import { getBatteryLevel } from "react-native-device-info";

export default function Casual({ players }) {
  const [shuffledPlayers, setShuffledPlayers] = useState([
    { name: "", colour: "" },
  ]);
  const [options, setOptions] = useState({
    "What If": [{ question: "" }],
    "Ice Breakers": [{ question: "" }],
    "Select a set": [{ question: "" }],
  });
  const [option, setOption] = useState("Select a set");
  const [transition, setTransition] = useState(false);
  const [speed, setSpeed] = useState(0);
  const route = useRoute();
  const pageTheme = theme(route.name);

  if (option === "What If" && options[option].length <= 1)
    return setOptions({ ...options, "What If": shuffle(whatif) });
  if (option === "Ice Breakers" && options[option].length <= 1)
    return setOptions({ ...options, "Ice Breakers": shuffle(icebreakers) });
  if (shuffledPlayers.length <= 1) return setShuffledPlayers(shuffle(players));
  if (!transition) setTimeout(() => setTransition(!transition), 800);

  console.log(getBatteryLevel());

  return (
    <Animated.View
      entering={FadeIn.duration(800)}
      exiting={FadeOut.duration(800)}
      tw="w-full h-full justify-between items-center"
      style={{ backgroundColor: pageTheme.bg }}>
      <GAMBannerAd
        unitId={TestIds.BANNER}
        sizes={[BannerAdSize.FULL_BANNER]}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
      <TouchableOpacity
        tw="h-2/6 w-full absolute"
        onPress={() => (!speed ? setSpeed(0.3) : setSpeed(0))}>
        <LottieView
          tw="w-full h-full"
          source={require("../assets/clouds1.json")}
          autoPlay={true}
          loop={true}
          speed={speed}
        />
      </TouchableOpacity>
      <Header />
      <View tw="h-4/6 w-11/12 justify-end mb-4">
        <TouchableOpacity
          tw="mb-2 rounded-lg"
          style={{ backgroundColor: pageTheme.fg }}
          onPress={() => {
            setOption("Select a set");
            setTransition(false);
          }}>
          <Text
            tw="text-4xl m-2 text-center"
            style={{ color: pageTheme.text, fontFamily: "header" }}>
            {option}
          </Text>
        </TouchableOpacity>
        <Animated.View
          tw={
            "h-4/6 rounded-lg items-center p-2 " +
            (options[option][0].question ? "justify-between" : "justify-center")
          }
          style={{ backgroundColor: pageTheme.asset }}>
          {options[option][0].question
            ? transition && (
                <Animated.View
                  tw="w-full h-full items-center"
                  entering={FadeIn.duration(800)}
                  exiting={FadeOut.duration(800)}>
                  <View tw="w-full items-center justify-end">
                    {shuffledPlayers[0].name && (
                      <Text
                        numberOfLines={1}
                        tw="text-4xl pt-2 text-center"
                        style={{
                          color: shuffledPlayers[0].colour,
                          fontFamily: "fun",
                        }}>
                        {shuffledPlayers[0].name},
                      </Text>
                    )}
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setShuffledPlayers(shuffledPlayers.slice(1));
                      setOptions({
                        ...options,
                        [option]: options[option].slice(1),
                      });
                      setTransition(false);
                    }}
                    tw="justify-center grow w-full">
                    {options[option][0].question && (
                      <Text
                        tw="text-3xl text-center px-2 pt-2"
                        style={{ color: pageTheme.text, fontFamily: "fun" }}>
                        {options[option][0].question.toLowerCase()}
                      </Text>
                    )}
                  </TouchableOpacity>
                </Animated.View>
              )
            : transition && (
                <Animated.View
                  entering={FadeIn.duration(800)}
                  exiting={FadeOut.duration(800)}
                  tw="w-full justify-center items-center flex-row flex-wrap">
                  {Object.keys(options)
                    .slice(0, -1)
                    .map((opt) => (
                      <TouchableOpacity
                        key={opt}
                        tw="p-2"
                        onPress={() => {
                          setTransition(false);
                          setOption(opt);
                        }}>
                        <Text
                          tw="text-4xl py-2 px-4 rounded-lg"
                          style={{
                            backgroundColor: pageTheme.fg,
                            color: pageTheme.text,
                            fontFamily: "text",
                          }}>
                          {opt}
                        </Text>
                      </TouchableOpacity>
                    ))}
                </Animated.View>
              )}
        </Animated.View>
      </View>
    </Animated.View>
  );
}
