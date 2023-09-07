import { Text, TouchableOpacity, View } from "react-native";
import Header from "../components/Header";
import { useRoute } from "@react-navigation/native";
import { theme } from "../assets/colours";
import whatif from "../assets/whatif.json";
import icebreakers from "../assets/icebreakers.json";
import mostlikely from "../assets/mostlikely.json";
import neverhaveiever from "../assets/neverhaveiever.json";
import shuffle from "../hooks/shuffleArray";
import { useEffect, useState } from "react";
import LottieView from "lottie-react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { ANDROID_BANNER_AD_ID } from "@env";
import {
  BannerAdSize,
  GAMBannerAd,
  TestIds,
} from "react-native-google-mobile-ads";
import PlayerList from "../components/PlayerList";

const idSwitch = __DEV__ ? TestIds.BANNER : ANDROID_BANNER_AD_ID;

export default function Casual({ players, setPlayers, setAdCount, adCount }) {
  const [shuffledPlayers, setShuffledPlayers] = useState([
    { name: "", colour: "" },
  ]);
  const [options, setOptions] = useState({
    "What If": [],
    "Ice Breakers": [],
    "Most Likely": [],
    "Never Have I Ever": [],
  });
  const [option, setOption] = useState("Select a set");
  const [transition, setTransition] = useState(false);
  const route = useRoute();
  const pageTheme = theme(route.name);

  if (option === "What If" && !options[option].length)
    setOptions({ ...options, "What If": shuffle(whatif) });
  if (option === "Never Have I Ever" && !options[option].length)
    setOptions({
      ...options,
      "Never Have I Ever": shuffle(neverhaveiever),
    });
  if (option === "Ice Breakers" && !options[option].length)
    setOptions({ ...options, "Ice Breakers": shuffle(icebreakers) });
  if (option === "Most Likely" && !options[option].length)
    setOptions({ ...options, "Most Likely": shuffle(mostlikely) });
  if (!shuffledPlayers.length || !players.includes(shuffledPlayers[0]))
    setShuffledPlayers(shuffle(players));
  if (!transition) setTimeout(() => setTransition(!transition), 800);

  if (option === "Ice Breakers") console.log(options[option].length);
  return (
    <Animated.View
      entering={FadeIn.duration(800)}
      exiting={FadeOut.duration(800)}
      tw="w-full h-full"
      style={{ backgroundColor: pageTheme.bg }}>
      <LottieView
        tw="w-full h-2/6 absolute"
        source={require("../assets/Lottie/clouds1.json")}
        autoPlay={true}
        loop={true}
        speed={speed}
      />
      <GAMBannerAd unitId={idSwitch} sizes={[BannerAdSize.FULL_BANNER]} />
      <View tw="grow justify-between items-center">
        <View tw="w-full">
          <Header />
          <PlayerList
            warn={undefined}
            setWarn={undefined}
            setIsAdd={undefined}
            setPlayers={setPlayers}
            players={players}
          />
        </View>
        <View tw="h-3/6 w-11/12 justify-end mb-4">
          <TouchableOpacity
            tw="mb-2 h-1/6 rounded-lg items-center justify-center p-2"
            style={{ backgroundColor: pageTheme.fg }}
            onPress={() => {
              setOption("");
              setTransition(false);
            }}>
            {option
              ? transition && (
                  <Animated.Text
                    entering={FadeIn.duration(800)}
                    exiting={FadeOut.duration(800)}
                    tw="text-4xl"
                    style={{ color: pageTheme.text, fontFamily: "header" }}>
                    {option}
                  </Animated.Text>
                )
              : transition && (
                  <Animated.Text
                    entering={FadeIn.duration(800)}
                    exiting={FadeOut.duration(800)}
                    tw="text-4xl"
                    style={{ color: pageTheme.text, fontFamily: "header" }}>
                    Select a Set
                  </Animated.Text>
                )}
          </TouchableOpacity>
          <Animated.View
            tw={"h-5/6 rounded-lg items-center p-2 justify-center"}
            style={{ backgroundColor: pageTheme.asset }}>
            {Object.keys(options).includes(option)
              ? transition && (
                  <Animated.View
                    tw="w-full h-full justify-between"
                    entering={FadeIn.duration(800)}
                    exiting={FadeOut.duration(800)}>
                    <TouchableOpacity
                      onPress={() => {
                        setAdCount(adCount + 1);
                        setShuffledPlayers(shuffledPlayers.slice(1));
                        setOptions({
                          ...options,
                          [option]: options[option].slice(1),
                        });
                        setTransition(false);
                      }}
                      tw="justify-center h-full w-full">
                      <Text
                        numberOfLines={1}
                        tw="text-4xl pt-2 text-center"
                        style={{
                          color: shuffledPlayers[0].colour,
                          fontFamily: "header",
                        }}>
                        {shuffledPlayers[0].name},
                      </Text>
                      {options[option].length > 0 && (
                        <Text
                          tw="text-3xl grow text-center px-2 pt-1"
                          style={{ color: pageTheme.text, fontFamily: "text" }}>
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
                    {Object.keys(options).map((opt) => (
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
      </View>
    </Animated.View>
  );
}
