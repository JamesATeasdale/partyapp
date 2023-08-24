import LottieView from "lottie-react-native";
import { useRef } from "react";

export default function WinnerScreen() {
  const LottieRef = useRef(null);

  return (
    <LottieView
      ref={LottieRef}
      tw="w-full h-full absolute"
      source={require("../assets/streamers.json")}
      loop={false}
      speed={2}
    />
  );
}
