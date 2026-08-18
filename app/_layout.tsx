import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider, useTheme } from "../src/theme/ThemeContext";
function Navigation() {
  const { colors, darkMode } = useTheme();
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
          options={{ title: "Círculos y módulos" }}
        />
        <Stack.Screen name="cone-angle" options={{ title: "Grados de cono" }} />
        <Stack.Screen
          name="chord-length"
          options={{ title: "Longitud de cuerda" }}
        />
        <Stack.Screen name="converter" options={{ title: "Conversor" }} />
        <Stack.Screen name="history" options={{ title: "Historial" }} />
      </Stack>
    </>
  );
}
export default function Layout() {
  return (
    <ThemeProvider>
      <Navigation />
    </ThemeProvider>
  );
}
