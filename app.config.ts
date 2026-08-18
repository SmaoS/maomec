import { ConfigContext, ExpoConfig } from "expo/config";

const ANDROID_TEST_APP_ID = "ca-app-pub-3940256099942544~3347511713";
const IOS_TEST_APP_ID = "ca-app-pub-3940256099942544~1458002511";

export default ({ config }: ConfigContext): ExpoConfig => {
  const variant = process.env.APP_VARIANT === "free" ? "free" : "pro";
  const buildPlatform = process.env.APP_PLATFORM === "ios" ? "ios" : "android";
  const production = process.env.APP_ENV === "production";
  const isAndroidPro = buildPlatform === "android" && variant === "pro";
  const androidAppId =
    production && variant === "free"
      ? process.env.ADMOB_ANDROID_APP_ID
      : ANDROID_TEST_APP_ID;
  const bannerId =
    production && variant === "free" ? process.env.ADMOB_ANDROID_BANNER_ID : "";
  if (production && variant === "free" && (!androidAppId || !bannerId))
    throw new Error(
      "Android Free production requires ADMOB_ANDROID_APP_ID and ADMOB_ANDROID_BANNER_ID.",
    );
  return {
    ...config,
    name: isAndroidPro ? "MaoMec Pro" : "MaoMec",
    slug: "maomec",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    scheme: "maomec",
    userInterfaceStyle: "automatic",
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.maomec.app",
      buildNumber: "1",
    },
    android: {
      package: variant === "free" ? "com.maomec.app" : "com.maomec.pro",
      versionCode: 1,
      predictiveBackGestureEnabled: false,
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/android-icon-foreground.png",
        backgroundImage: "./assets/android-icon-background.png",
        monochromeImage: "./assets/android-icon-monochrome.png",
      },
    },
    web: { favicon: "./assets/favicon.png" },
    plugins: [
      "expo-router",
      "expo-font",
      [
        "expo-build-properties",
        {
          android: {
            extraProguardRules:
              "-keep class com.google.android.gms.internal.consent_sdk.** { *; }",
          },
        },
      ],
      [
        "react-native-google-mobile-ads",
        {
          androidAppId: androidAppId ?? ANDROID_TEST_APP_ID,
          iosAppId: IOS_TEST_APP_ID,
        },
      ],
    ],
    extra: {
      ...config.extra,
      appVariant: variant,
      appEnvironment: production ? "production" : "development",
      admobAndroidBannerId: bannerId,
    },
  };
};
