import { GAMInterstitialAd, TestIds } from "react-native-google-mobile-ads";

export default function adplayer() {
  const interstitial = GAMInterstitialAd.createForAdRequest(
    TestIds.INTERSTITIAL,
    {
      keywords: ["fashion", "clothing"],
    }
  );
  if (Math.floor(Math.random() * 15) === 1) {
    interstitial.load();
    setTimeout(() => {
      interstitial.show();
    }, 3000);
  }
}
