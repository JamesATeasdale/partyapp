import LottieView from "lottie-react-native";
import { useEffect, useRef } from "react";

export default function BalloonTransition({ players }) {
  const LottieRef = useRef(null);
  useEffect(() => LottieRef.current?.play(), [players]);

  return (
    <LottieView
      tw="absolute h-full"
      ref={LottieRef}
      source={require("../assets/animation_lkb6094l.json")}
      loop={false}
      speed={2}
    />
  );
}
