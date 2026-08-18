export type AppVariant = "free" | "pro";
export type BuildPlatform = "android" | "ios" | "web";

export interface ResolvedAppConfig {
  variant: AppVariant;
  appName: string;
  packageName: string;
  isFree: boolean;
  isPro: boolean;
  adsEnabled: boolean;
}

export function normalizeVariant(value: unknown): AppVariant {
  return value === "free" ? "free" : "pro";
}

export function resolveAppConfig(
  variant: AppVariant,
  platform: BuildPlatform,
): ResolvedAppConfig {
  const isFree = variant === "free";
  return {
    variant,
    appName:
      platform === "android" && isFree
        ? "MaoMec"
        : platform === "android"
          ? "MaoMec Pro"
          : "MaoMec",
    packageName:
      platform === "android" && isFree
        ? "com.maomec.app"
        : platform === "android"
          ? "com.maomec.pro"
          : "com.maomec.app",
    isFree,
    isPro: !isFree,
    adsEnabled: platform === "android" && isFree,
  };
}
