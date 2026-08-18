import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Stack } from "expo-router";
import { HelpButton } from "../src/components/HelpButton";
import { AdBanner } from "../src/ads/AdBanner";
import { converterHelp } from "../src/content/calculatorHelp";
import { converterHelpEn } from "../src/content/calculatorHelp.en";
import { useI18n } from "../src/i18n/I18nContext";
import {
  Buttons,
  CalculatorCard,
  FormulaCard,
  NumericInput,
  ResultCard,
  Screen,
  styles,
} from "../src/components";
import {
  decimalToFraction,
  mmToInches,
  mmToThousandths,
  roundForDisplay,
  thousandthsToMm,
} from "../src/domain/math";
import { saveHistory } from "../src/storage/preferences";
import { useTheme } from "../src/theme/ThemeContext";
import { parseLocalizedNumber } from "../src/utils/input";
type Mode = "mm" | "thou" | "fraction";
export default function Converter() {
  const { colors } = useTheme();
  const { language, t } = useI18n();
  const [mode, setMode] = useState<Mode>("mm"),
    [value, setValue] = useState(""),
    [error, setError] = useState("");

  const conversion = useMemo(() => {
    if (!value.trim()) return null;
    try {
      const n = parseLocalizedNumber(value);
      if (n === null) throw new Error(t("invalidData"));
      let out = "",
        extra = "";
      if (mode === "mm") {
        out = `${roundForDisplay(mmToThousandths(n))} ${language === "es" ? "milésimas" : "thousandths"}`;
        extra = `${mmToInches(n).toFixed(4)} ${t("inches")}`;
      } else if (mode === "thou") {
        out = `${roundForDisplay(thousandthsToMm(n))} mm`;
        extra = `${(n / 1000).toFixed(4)} ${t("inches")}`;
      } else {
        const f = decimalToFraction(n);
        out = `${f.whole ? `${f.whole} ` : ""}${f.numerator ? `${f.numerator}/${f.denominator}` : ""}\"`;
        extra = `${t("fractionError")}: ${Math.abs(f.error).toFixed(6)}\"`;
      }
      return { result: out, detail: extra, error: "" };
    } catch {
      return {
        result: "",
        detail: "",
        error: t("invalidData"),
      };
    }
  }, [language, mode, t, value]);

  const changeMode = (nextMode: Mode) => {
    if (nextMode === mode) return;
    const current = parseLocalizedNumber(value);
    if (current === null || current < 0) {
      setMode(nextMode);
      setError("");
      return;
    }
    // La pulgada decimal funciona como unidad base para conservar la misma medida.
    const inches =
      mode === "mm"
        ? current / 25.4
        : mode === "thou"
          ? current / 1000
          : current;
    const converted =
      nextMode === "mm"
        ? inches * 25.4
        : nextMode === "thou"
          ? inches * 1000
          : inches;
    setMode(nextMode);
    setValue(Number(converted.toFixed(6)).toString());
    setError("");
  };

  const saveCurrent = () => {
    if (!conversion?.result) {
      setError(conversion?.error || t("completeData"));
      return;
    }
    setError("");
    void saveHistory({
      type: t("converter"),
      summary: value,
      result: conversion.result,
    });
  };
  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <HelpButton
              {...(language === "es"
                ? converterHelp[mode]
                : converterHelpEn[mode])}
            />
          ),
        }}
      />
      <Screen>
        <ScrollView>
          <View style={styles.row}>
            {(
              [
                ["mm", t("mmToIn")],
                ["thou", t("thouToMm")],
                ["fraction", t("decimalToFraction")],
              ] as [Mode, string][]
            ).map(([key, label]) => (
              <Pressable
                key={key}
                onPress={() => changeMode(key)}
                style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 8,
                  backgroundColor:
                    mode === key ? colors.primary : colors.surface,
                }}
              >
                <Text
                  style={{
                    color: mode === key ? "white" : colors.text,
                    textAlign: "center",
                    fontSize: 12,
                  }}
                >
                  {label}
                </Text>
              </Pressable>
            ))}
          </View>
          <CalculatorCard>
            <NumericInput
              label={
                mode === "mm"
                  ? t("millimeters")
                  : mode === "thou"
                    ? t("thousandths")
                    : t("decimalInches")
              }
              value={value}
              onChangeText={(text) => {
                setValue(text);
                setError("");
              }}
            />
            {(error || conversion?.error) && (
              <Text style={[styles.error, { color: colors.error }]}>
                {error || conversion?.error}
              </Text>
            )}
            <Buttons
              onCalculate={saveCurrent}
              calculateLabel={t("save")}
              onClear={() => {
                setValue("");
                setError("");
              }}
            />
            <FormulaCard
              formula={
                mode === "mm"
                  ? language === "es"
                    ? "pulgadas = mm / 25.4"
                    : "inches = mm / 25.4"
                  : mode === "thou"
                    ? language === "es"
                      ? "mm = milésimas × 0.0254"
                      : "mm = thousandths × 0.0254"
                    : language === "es"
                      ? "fracción = aproximación al 1/128"
                      : "fraction = nearest 1/128"
              }
            />
          </CalculatorCard>
          {conversion?.result && (
            <ResultCard
              label={t("result")}
              value={conversion.result}
              details={
                <Text style={styles.resultDetails}>{conversion.detail}</Text>
              }
            />
          )}
          <AdBanner />
        </ScrollView>
      </Screen>
    </>
  );
}
