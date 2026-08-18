import { appConfig } from "../config/appConfig";

export type GoogleMobileAdsModule =
  typeof import("react-native-google-mobile-ads");

export async function loadGoogleMobileAds(): Promise<GoogleMobileAdsModule | null> {
  if (!appConfig.adsEnabled) return null;
  try {
    return await import("react-native-google-mobile-ads");
  } catch {
    return null;
  }
}

export async function initializeAds(): Promise<boolean> {
  const ads = await loadGoogleMobileAds();
  if (!ads) return false;
  try {
    await ads.AdsConsent.requestInfoUpdate();
    const consent = await ads.AdsConsent.loadAndShowConsentFormIfRequired();
    if (!consent.canRequestAds) return false;
    await ads.default().initialize();
    return true;
  } catch {
    return false;
  }
}
