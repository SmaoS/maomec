import Constants from "expo-constants";
import { Platform } from "react-native";
import { normalizeVariant, resolveAppConfig } from "./appVariant";

const extra = Constants.expoConfig?.extra;
const variant = normalizeVariant(extra?.appVariant);
const resolved = resolveAppConfig(
  variant,
  Platform.OS === "android" || Platform.OS === "ios" ? Platform.OS : "web",
);
const environment =
  extra?.appEnvironment === "production" ? "production" : "development";
const adsConfigured =
  environment === "development" || extra?.adsConfigured === true;
const isExpoGo = Constants.appOwnership === "expo";

export const appConfig = {
  ...resolved,
  adsEnabled: resolved.adsEnabled && adsConfigured && !isExpoGo,
  adsConfigured,
  environment,
  admobBannerId:
    typeof extra?.admobAndroidBannerId === "string"
      ? extra.admobAndroidBannerId
      : "",
} as const;
