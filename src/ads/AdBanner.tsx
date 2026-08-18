import { StyleSheet, Text, View } from "react-native";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { appConfig } from "../config/appConfig";
import { useTheme } from "../theme/ThemeContext";
import { adConfig } from "./adConfig";
import { useAds } from "./AdProvider";

export function AdBanner() {
  const { canRequestAds } = useAds();
  const { colors } = useTheme();
  if (!appConfig.adsEnabled || !canRequestAds || !adConfig.bannerUnitId)
    return null;
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
      <BannerAd
        unitId={adConfig.bannerUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
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
