import { appConfig } from "./appConfig";
export const features = {
  ads: appConfig.adsEnabled,
  advancedCalculators: true,
  history: true,
  favorites: true,
} as const;
