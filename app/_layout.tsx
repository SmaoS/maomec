import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider, useTheme } from "../src/theme/ThemeContext";
import { I18nProvider, useI18n } from "../src/i18n/I18nContext";
function Navigation() {
  const { colors, darkMode } = useTheme();
  const { t } = useI18n();
  return (
    <>
      <StatusBar style={darkMode ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: "700" },
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="circles-modules"
          options={{ title: t("circles") }}
        />
        <Stack.Screen name="cone-angle" options={{ title: t("cone") }} />
        <Stack.Screen name="chord-length" options={{ title: t("chord") }} />
        <Stack.Screen name="converter" options={{ title: t("converter") }} />
        <Stack.Screen name="history" options={{ title: t("history") }} />
      </Stack>
    </>
  );
}
export default function Layout() {
  return (
    <I18nProvider>
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
    </I18nProvider>
  );
}
