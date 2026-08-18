import { useCallback, useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { useFocusEffect } from "expo-router";
import { Screen, SectionHeader } from "../src/components";
import {
  clearHistory,
  deleteHistory,
  getHistory,
  HistoryItem,
} from "../src/storage/preferences";
import { useTheme } from "../src/theme/ThemeContext";
export default function History() {
  const { colors } = useTheme();
  const [items, setItems] = useState<HistoryItem[]>([]);
  useFocusEffect(
    useCallback(() => {
      void getHistory().then(setItems);
    }, []),
  );
  const clear = () =>
    Alert.alert(
      "Borrar historial",
      "Esta acción eliminará todos los cálculos guardados.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Borrar",
          style: "destructive",
          onPress: () => void clearHistory().then(() => setItems([])),
        },
      ],
    );
  return (
    <Screen>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <SectionHeader title="Historial" subtitle="Últimos 50 cálculos" />
        {items.length > 0 && (
          <Pressable onPress={clear}>
            <Text style={{ color: colors.error, fontWeight: "700" }}>
              Borrar todo
            </Text>
          </Pressable>
        )}
      </View>
      <ScrollView>
        {items.length === 0 ? (
          <Text
            style={{
              color: colors.textSecondary,
              textAlign: "center",
              marginTop: 60,
            }}
          >
            Todavía no hay cálculos guardados.
          </Text>
        ) : (
          items.map((item) => (
            <View
              key={item.id}
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: 14,
                padding: 16,
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: colors.text,
                    fontWeight: "700",
                    fontSize: 17,
                  }}
                >
                  {item.type}
                </Text>
                <Pressable
                  onPress={() => void deleteHistory(item.id).then(setItems)}
                >
                  <Text style={{ color: colors.error }}>Eliminar</Text>
                </Pressable>
              </View>
              <Text style={{ color: colors.textSecondary, marginTop: 5 }}>
                {item.summary}
              </Text>
              <Text
                style={{
                  color: colors.primary,
                  fontSize: 18,
                  fontWeight: "800",
                  marginTop: 8,
                }}
              >
                {item.result}
              </Text>
              <Text
                style={{
                  color: colors.textSecondary,
                  fontSize: 12,
                  marginTop: 5,
                }}
              >
                {new Date(item.createdAt).toLocaleString("es")}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </Screen>
  );
}
