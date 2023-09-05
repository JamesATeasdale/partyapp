import Slider from "@react-native-assets/slider";
import { View } from "react-native";
import Animated from "react-native-reanimated";

export default function QuizSlider() {
  return (
    <Animated.View tw="items-center w-full h-full">
      <View tw="w-5/6 justify-between pt-4">
        <Slider
          minimumTrackTintColor={pageTheme.text}
          maximumTrackTintColor={"gray"}
          trackHeight={12}
          minimumValue={0}
          maximumValue={12}
          slideOnTap={true}
          thumbTintColor={pageTheme.bg}
          thumbSize={48}
          onValueChange={setFastQ}
          value={fastQ}
          step={1}
        />
        <Text tw="w-full text-center">{fastQ}</Text>
      </View>
      <Animated.View entering={BounceIn} tw="w-full">
        <TouchableOpacity
          tw="justify-center h-full"
          onPress={() => {
            setWin(false);
            setNewGame(!newGame);
          }}>
          <Intro shuffledPlayer={shuffledPlayers[0]} />
        </TouchableOpacity>
      </Animated.View>
      {/* <TouchableOpacity
      onPress={toggleSwitch}
      tw="flex-row w-full pr-8 pl-2 pt-2 absolute justify-between">
      <Text
        tw="text-4xl pt-2 basis-4/6"
        style={{ color: pageTheme.text, fontFamily: "fun" }}>
        {shuffledPlayers[0].fastQ ? "Timed" : "Normal"}
      </Text>
      <Switch
        style={{ transform: [{ scaleX: 2.4 }, { scaleY: 2.4 }] }}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={
          shuffledPlayers[0].fastQ ? pageTheme.bg : pageTheme.fg
        }
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={shuffledPlayers[0].fastQ}
      />
    </TouchableOpacity> */}
    </Animated.View>
  );
}
