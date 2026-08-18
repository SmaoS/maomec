import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Stack } from "expo-router";
import { HelpButton } from "../src/components/HelpButton";
import { converterHelp } from "../src/content/calculatorHelp";
import {
  Buttons,
  CalculatorCard,
  FormulaCard,
  NumericInput,
  ResultCard,
  Screen,
  SectionHeader,
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
  const [mode, setMode] = useState<Mode>("mm"),
    [value, setValue] = useState(""),
    [error, setError] = useState("");

  const conversion = useMemo(() => {
    if (!value.trim()) return null;
    try {
      const n = parseLocalizedNumber(value);
      if (n === null) throw new Error("Escribe una medida válida.");
      let out = "",
        extra = "";
      if (mode === "mm") {
        out = `${roundForDisplay(mmToThousandths(n))} milésimas`;
        extra = `${mmToInches(n).toFixed(4)} pulgadas`;
      } else if (mode === "thou") {
        out = `${roundForDisplay(thousandthsToMm(n))} mm`;
        extra = `${(n / 1000).toFixed(4)} pulgadas`;
      } else {
        const f = decimalToFraction(n);
        out = `${f.whole ? `${f.whole} ` : ""}${f.numerator ? `${f.numerator}/${f.denominator}` : ""}\"`;
        extra = `Error: ${Math.abs(f.error).toFixed(6)}\"`;
      }
      return { result: out, detail: extra, error: "" };
    } catch (e) {
      return {
        result: "",
        detail: "",
        error: e instanceof Error ? e.message : "Dato inválido",
      };
    }
  }, [mode, value]);

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
      setError(conversion?.error || "Completa los datos para calcular.");
      return;
    }
    setError("");
    void saveHistory({
      type: "Conversor",
      summary: value,
      result: conversion.result,
    });
  };
  return (
    <>
      <Stack.Screen
        options={{ headerRight: () => <HelpButton {...converterHelp[mode]} /> }}
      />
      <Screen>
        <ScrollView>
          <SectionHeader
            title="Conversor"
            subtitle="El resultado cambia mientras escribes y conserva la medida al cambiar de modo."
          />
          <View style={styles.row}>
            {(
              [
                ["mm", "mm → pulg."],
                ["thou", "milésimas → mm"],
                ["fraction", "decimal → fracción"],
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
                  ? "Milímetros"
                  : mode === "thou"
                    ? "Milésimas de pulgada"
                    : "Pulgadas decimales"
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
              onClear={() => {
                setValue("");
                setError("");
              }}
            />
            <FormulaCard
              formula={
                mode === "mm"
                  ? "pulgadas = mm / 25.4"
                  : mode === "thou"
                    ? "mm = milésimas × 0.0254"
                    : "fracción = aproximación al 1/128"
              }
            />
          </CalculatorCard>
          {conversion?.result && (
            <ResultCard
              label="Resultado"
              value={conversion.result}
              details={
                <Text style={styles.resultDetails}>{conversion.detail}</Text>
              }
            />
          )}
        </ScrollView>
      </Screen>
    </>
  );
}
