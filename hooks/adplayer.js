import { ANDROID_INTERSTITIAL_AD_ID } from "@env";
import {
  GAMInterstitialAd,
  TestIds,
  AdEventType,
} from "react-native-google-mobile-ads";

const idSwitch = __DEV__ ? TestIds.INTERSTITIAL : ANDROID_INTERSTITIAL_AD_ID;

export default function adplayer() {
  const interstitial = GAMInterstitialAd.createForAdRequest(idSwitch, {});

  interstitial.load();
  return interstitial.addAdEventListener(AdEventType.LOADED, () =>
    interstitial.show()
  );
}
