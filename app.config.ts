import { ConfigContext, ExpoConfig } from "expo/config";

const ANDROID_TEST_APP_ID = "ca-app-pub-3940256099942544~3347511713";
const IOS_TEST_APP_ID = "ca-app-pub-3940256099942544~1458002511";
const ANDROID_PRODUCTION_APP_ID =
  "ca-app-pub-7328351405221100~2738369588";
const ANDROID_PRODUCTION_BANNER_ID =
  "ca-app-pub-7328351405221100/9822547489";

export default ({ config }: ConfigContext): ExpoConfig => {
  const variant = process.env.APP_VARIANT === "free" ? "free" : "pro";
  const buildPlatform = process.env.APP_PLATFORM === "ios" ? "ios" : "android";
  const production = process.env.APP_ENV === "production";
  const isAndroidPro = buildPlatform === "android" && variant === "pro";
  const androidVersionCode = Number.parseInt(
    process.env.ANDROID_VERSION_CODE ?? "1",
    10,
  );
  const androidAppId =
    production && variant === "free"
      ? ANDROID_PRODUCTION_APP_ID
      : ANDROID_TEST_APP_ID;
  const bannerId =
    production && variant === "free"
      ? ANDROID_PRODUCTION_BANNER_ID
      : "";
  return {
    ...config,
    name: isAndroidPro ? "MaoMec Pro" : "MaoMec",
    owner: "tecngo",
    slug: "maomec",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./icon-app-maomec.png",
    scheme: "maomec",
    userInterfaceStyle: "automatic",
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.maomec.app",
      buildNumber: "1",
    },
    android: {
      package: variant === "free" ? "com.maomec.app" : "com.maomec.pro",
      versionCode:
        Number.isFinite(androidVersionCode) && androidVersionCode > 0
          ? androidVersionCode
          : 1,
      icon: "./icon-app-maomec.png",
      predictiveBackGestureEnabled: false,
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
      ...(process.env.LOCAL_ANDROID_SIGNING === "true"
        ? ["./plugins/withLocalAndroidSigning.js"]
        : []),
    ],
    extra: {
      ...config.extra,
      eas: {
        projectId: "c60d565f-b16c-4d9a-bafe-e732079b2148",
      },
      appVariant: variant,
      appEnvironment: production ? "production" : "development",
      admobAndroidBannerId: bannerId,
      adsConfigured: !production || variant === "free",
    },
  };
};
