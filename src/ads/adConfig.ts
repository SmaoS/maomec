import { appConfig } from "../config/appConfig";

const ANDROID_TEST_BANNER_ID = "ca-app-pub-3940256099942544/6300978111";

export const adConfig = {
  bannerUnitId:
    appConfig.environment === "development"
      ? ANDROID_TEST_BANNER_ID
      : appConfig.admobBannerId,
  isTest: appConfig.environment === "development",
} as const;
