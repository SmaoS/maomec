import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTheme } from "../theme/ThemeContext";
import { useI18n } from "../i18n/I18nContext";

export type HelpSection = { title: string; body: string };

export function HelpButton({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: HelpSection[];
}) {
  const { colors } = useTheme();
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${t("help")}: ${title}`}
        hitSlop={10}
        onPress={() => setVisible(true)}
        style={styles.button}
      >
        <Ionicons name="help-circle-outline" size={29} color={colors.primary} />
      </Pressable>
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.backdrop}>
          <View
            accessibilityViewIsModal
            style={[styles.modal, { backgroundColor: colors.surface }]}
          >
            <View style={[styles.top, { borderBottomColor: colors.border }]}>
              <View style={styles.titleWrap}>
                <Text style={[styles.eyebrow, { color: colors.primary }]}>
                  {t("help")}
                </Text>
                <Text style={[styles.title, { color: colors.text }]}>
                  {title}
                </Text>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={t("closeHelp")}
                hitSlop={10}
                onPress={() => setVisible(false)}
              >
                <Ionicons name="close" size={28} color={colors.text} />
              </Pressable>
            </View>
            <ScrollView
              contentContainerStyle={styles.content}
              showsVerticalScrollIndicator={false}
            >
              <Text style={[styles.intro, { color: colors.text }]}>
                {intro}
              </Text>
              {sections.map((section, index) => (
                <View
                  key={`${section.title}-${index}`}
                  style={[
                    styles.section,
                    {
                      borderColor: colors.border,
                      backgroundColor: colors.background,
                    },
                  ]}
                >
                  <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    {section.title}
                  </Text>
                  <Text style={[styles.body, { color: colors.textSecondary }]}>
                    {section.body}
                  </Text>
                </View>
              ))}
            </ScrollView>
            <Pressable
              accessibilityRole="button"
              onPress={() => setVisible(false)}
              style={[styles.closeButton, { backgroundColor: colors.primary }]}
            >
              <Text style={styles.closeText}>{t("understood")}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    minWidth: 44,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.58)",
    justifyContent: "center",
    padding: 18,
  },
  modal: { maxHeight: "86%", borderRadius: 20, overflow: "hidden" },
  top: {
    padding: 18,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleWrap: { flex: 1, paddingRight: 10 },
  eyebrow: { fontSize: 11, fontWeight: "800", letterSpacing: 1.4 },
  title: { fontSize: 23, fontWeight: "800", marginTop: 2 },
  content: { padding: 18, gap: 12 },
  intro: { fontSize: 16, lineHeight: 24, fontWeight: "600" },
  section: { borderWidth: 1, borderRadius: 13, padding: 14 },
  sectionTitle: { fontSize: 16, fontWeight: "800", marginBottom: 5 },
  body: { fontSize: 15, lineHeight: 22 },
  closeButton: {
    margin: 18,
    marginTop: 4,
    minHeight: 50,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  closeText: { color: "#FFFFFF", fontWeight: "800" },
});
