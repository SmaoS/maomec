import { useCallback, useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { useFocusEffect } from "expo-router";
import { Screen } from "../src/components";
import {
  clearHistory,
  deleteHistory,
  getHistory,
  HistoryItem,
} from "../src/storage/preferences";
import { useTheme } from "../src/theme/ThemeContext";
import { useI18n } from "../src/i18n/I18nContext";
export default function History() {
  const { colors } = useTheme();
  const { language, t } = useI18n();
  const [items, setItems] = useState<HistoryItem[]>([]);
  useFocusEffect(
    useCallback(() => {
      void getHistory().then(setItems);
    }, []),
  );
  const clear = () =>
    Alert.alert(t("clearHistoryTitle"), t("clearHistoryBody"), [
      { text: t("cancel"), style: "cancel" },
      {
        text: t("delete"),
        style: "destructive",
        onPress: () => void clearHistory().then(() => setItems([])),
      },
    ]);
  return (
    <Screen>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {items.length > 0 && (
          <Pressable onPress={clear}>
            <Text style={{ color: colors.error, fontWeight: "700" }}>
              {t("clearAll")}
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
            {t("emptyHistory")}
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
                  <Text style={{ color: colors.error }}>{t("delete")}</Text>
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
                {new Date(item.createdAt).toLocaleString(language)}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </Screen>
  );
}
