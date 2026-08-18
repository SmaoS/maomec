import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { AppCard, Screen, SectionHeader } from "../src/components";
import { getFavorites, toggleFavorite } from "../src/storage/preferences";
import { useTheme } from "../src/theme/ThemeContext";
import { TranslationKey, useI18n } from "../src/i18n/I18nContext";
import { AdBanner } from "../src/ads/AdBanner";
const cards = [
  {
    key: "circles",
    titleKey: "circles" as TranslationKey,
    descriptionKey: "circlesDesc" as TranslationKey,
    icon: "settings-outline" as const,
    path: "/circles-modules" as const,
  },
  {
    key: "cone",
    titleKey: "cone" as TranslationKey,
    descriptionKey: "coneDesc" as TranslationKey,
    icon: "triangle-outline" as const,
    path: "/cone-angle" as const,
  },
  {
    key: "chord",
    titleKey: "chord" as TranslationKey,
    descriptionKey: "chordDesc" as TranslationKey,
    icon: "ellipse-outline" as const,
    path: "/chord-length" as const,
  },
  {
    key: "converter",
    titleKey: "converter" as TranslationKey,
    descriptionKey: "converterDesc" as TranslationKey,
    icon: "swap-horizontal-outline" as const,
    path: "/converter" as const,
  },
];
export default function Home() {
  const { colors, darkMode, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useI18n();
  const [favorites, setFavorites] = useState<string[]>([]);
  useFocusEffect(
    useCallback(() => {
      void getFavorites().then(setFavorites);
    }, []),
  );
  const render = (c: (typeof cards)[number]) => (
    <AppCard
      key={c.key}
      title={t(c.titleKey)}
      description={t(c.descriptionKey)}
      icon={c.icon}
      favorite={favorites.includes(c.key)}
      onPress={() => router.push(c.path)}
      onFavorite={() => void toggleFavorite(c.key).then(setFavorites)}
    />
  );
  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 24,
          }}
        >
          <SectionHeader title="MaoMec" subtitle={t("workshopCalculations")} />
          <View style={{ flexDirection: "row", gap: 18 }}>
            <Pressable
              accessibilityLabel={t("history")}
              onPress={() => router.push("/history")}
            >
              <Ionicons name="time-outline" size={26} color={colors.text} />
            </Pressable>
            <Pressable
              accessibilityLabel={t("changeLanguage")}
              onPress={toggleLanguage}
            >
              <Text
                style={{
                  color: colors.primary,
                  fontWeight: "800",
                  fontSize: 16,
                }}
              >
                {language === "es" ? "EN" : "ES"}
              </Text>
            </Pressable>
            <Pressable
              accessibilityLabel={t("changeTheme")}
              onPress={toggleTheme}
            >
              <Ionicons
                name={darkMode ? "sunny-outline" : "moon-outline"}
                size={26}
                color={colors.text}
              />
            </Pressable>
          </View>
        </View>
        {favorites.length > 0 && (
          <>
            <Text
              style={{
                color: colors.text,
                fontSize: 18,
                fontWeight: "700",
                marginBottom: 10,
              }}
            >
              {t("favorites")}
            </Text>
            {cards.filter((c) => favorites.includes(c.key)).map(render)}
            <Text
              style={{
                color: colors.text,
                fontSize: 18,
                fontWeight: "700",
                marginVertical: 10,
              }}
            >
              {t("tools")}
            </Text>
          </>
        )}
        {cards.map(render)}
        <AdBanner />
      </ScrollView>
    </Screen>
  );
}
