import Constants from "expo-constants";
import { Platform } from "react-native";
import { normalizeVariant, resolveAppConfig } from "./appVariant";

const extra = Constants.expoConfig?.extra;
const variant = normalizeVariant(extra?.appVariant);

export const appConfig = {
  ...resolveAppConfig(variant, Platform.OS === "android" || Platform.OS === "ios" ? Platform.OS : "web"),
  environment:
    extra?.appEnvironment === "production" ? "production" : "development",
  admobBannerId:
    typeof extra?.admobAndroidBannerId === "string"
      ? extra.admobAndroidBannerId
      : "",
} as const;
