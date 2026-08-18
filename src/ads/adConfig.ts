import { TestIds } from "react-native-google-mobile-ads";
import { appConfig } from "../config/appConfig";

export const adConfig = {
  bannerUnitId:
    appConfig.environment === "development"
      ? TestIds.BANNER
      : appConfig.admobBannerId,
  isTest: appConfig.environment === "development",
} as const;
