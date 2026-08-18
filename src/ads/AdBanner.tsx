import { ComponentType, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import type {
  BannerAdProps,
  BannerAdSize as BannerAdSizeType,
} from "react-native-google-mobile-ads";
import { appConfig } from "../config/appConfig";
import { useTheme } from "../theme/ThemeContext";
import { adConfig } from "./adConfig";
import { useAds } from "./AdProvider";

export function AdBanner() {
  const { canRequestAds } = useAds();
  const { colors } = useTheme();
  const [nativeAds, setNativeAds] = useState<{
    BannerAd: ComponentType<BannerAdProps>;
    bannerSize: BannerAdSizeType;
  } | null>(null);

  useEffect(() => {
    if (!appConfig.adsEnabled) return;
    let active = true;
    void import("react-native-google-mobile-ads").then((module) => {
      if (active) {
        setNativeAds({
          BannerAd: module.BannerAd,
          bannerSize: module.BannerAdSize.ANCHORED_ADAPTIVE_BANNER,
        });
      }
    });
    return () => {
      active = false;
    };
  }, []);

  if (!appConfig.adsEnabled || !canRequestAds || !adConfig.bannerUnitId)
    return null;
  if (!nativeAds) return null;
  const NativeBannerAd = nativeAds.BannerAd;
  return (
    <View
      style={[
        styles.container,
        { borderColor: colors.border, backgroundColor: colors.surface },
      ]}
    >
      {adConfig.isTest && (
        <Text style={[styles.label, { color: colors.textSecondary }]}>
          TEST AD
        </Text>
      )}
      <NativeBannerAd
        unitId={adConfig.bannerUnitId}
        size={nativeAds.bannerSize}
        requestOptions={{ requestNonPersonalizedAdsOnly: true }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderTopWidth: 1,
    paddingTop: 4,
    marginTop: 8,
  },
  label: { fontSize: 9, fontWeight: "700", letterSpacing: 1, marginBottom: 2 },
});
