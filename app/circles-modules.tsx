import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Stack } from "expo-router";
import { HelpButton } from "../src/components/HelpButton";
import { circlesHelp } from "../src/content/calculatorHelp";
import { circlesHelpEn } from "../src/content/calculatorHelp.en";
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
  calculateCircularPitch,
  calculateDividingHead,
  calculateGearModule,
  calculateModuleFromPitch,
  calculateOutsideDiameter,
  calculatePitchDiameter,
  roundForDisplay,
} from "../src/domain/math";
import { saveHistory } from "../src/storage/preferences";
import { useTheme } from "../src/theme/ThemeContext";
import { parseLocalizedNumber } from "../src/utils/input";
type Mode =
  "module" | "pitchDiameter" | "outside" | "pitch" | "fromPitch" | "divider";
export default function Circles() {
  const { colors } = useTheme();
  const { language, t } = useI18n();
  const modes: [Mode, string][] = [
    ["divider", t("divider")],
    ["module", t("module")],
    ["pitchDiameter", t("pitchDiameter")],
    ["outside", t("outsideDiameter")],
    ["pitch", t("circularPitch")],
    ["fromPitch", t("moduleFromPitch")],
  ];
  const [mode, setMode] = useState<Mode>("module"),
    [a, setA] = useState(""),
    [b, setB] = useState(""),
    [result, setResult] = useState(""),
    [details, setDetails] = useState<string[]>([]),
    [error, setError] = useState("");
  const two = !["pitch", "fromPitch"].includes(mode);
  const labels: Record<Mode, [string, string, string]> = {
    module: [t("pitchDiameter"), t("teeth"), "M = Dp / Z"],
    pitchDiameter: [t("module"), t("teeth"), "Dp = M × Z"],
    outside: [t("module"), t("teeth"), "De = M × (Z + 2)"],
    pitch: [t("module"), "", "P = π × M"],
    fromPitch: [t("circularPitch"), "", "M = P / π"],
    divider: [
      t("dividerRatio"),
      t("divisions"),
      language === "es"
        ? "vueltas = relación / divisiones"
        : "turns = ratio / divisions",
    ],
  };
  const calc = () => {
    try {
      const x = parseLocalizedNumber(a),
        y = parseLocalizedNumber(b);
      if (x === null || (two && y === null)) throw new Error(t("completeData"));
      let value: number,
        unit = " mm",
        extra: string[] = [];
      switch (mode) {
        case "module":
          value = calculateGearModule(x, y!);
          break;
        case "pitchDiameter":
          value = calculatePitchDiameter(x, y!);
          break;
        case "outside":
          value = calculateOutsideDiameter(x, y!);
          extra = [
            `${t("pitchDiameter")}: ${roundForDisplay(calculatePitchDiameter(x, y!))} mm`,
          ];
          break;
        case "pitch":
          value = calculateCircularPitch(x);
          break;
        case "fromPitch":
          value = calculateModuleFromPitch(x);
          break;
        case "divider": {
          const r = calculateDividingHead(x, y!);
          value = r.turns;
          unit = ` ${t("turns")}`;
          extra = r.combinations.length
            ? r.combinations.map(
                (c) =>
                  `${r.fullTurns} ${r.fullTurns === 1 ? t("fullTurn") : t("fullTurns")} + ${c.holes} ${t("holes")} / ${t("holeCircle")} ${c.circle}`,
              )
            : [t("noPlate")];
          break;
        }
      }
      setResult(`${roundForDisplay(value!)}`);
      setDetails(extra);
      setError("");
      void saveHistory({
        type: mode === "divider" ? t("divider") : t("circles"),
        summary: `${labels[mode][0]}: ${a}${two ? ` · ${labels[mode][1]}: ${b}` : ""}`,
        result: `${roundForDisplay(value!)}${unit}`,
      });
    } catch (e) {
      setError(
        e instanceof Error && e.message === t("completeData")
          ? e.message
          : t("invalidData"),
      );
      setResult("");
    }
  };
  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <HelpButton
              {...(language === "es" ? circlesHelp[mode] : circlesHelpEn[mode])}
            />
          ),
        }}
      />
      <Screen>
        <ScrollView>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 14 }}
            contentContainerStyle={{ gap: 8 }}
          >
            {modes.map(([key, label]) => (
              <Pressable
                key={key}
                onPress={() => {
                  setMode(key);
                  setA("");
                  setB("");
                  setResult("");
                  setError("");
                }}
                style={{
                  paddingHorizontal: 14,
                  paddingVertical: 10,
                  borderRadius: 20,
                  backgroundColor:
                    mode === key ? colors.primary : colors.surface,
                }}
              >
                <Text
                  style={{
                    color: mode === key ? "white" : colors.text,
                    fontWeight: "600",
                  }}
                >
                  {label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
          <CalculatorCard>
            <NumericInput
              label={labels[mode][0]}
              value={a}
              onChangeText={setA}
            />
            {two && (
              <NumericInput
                label={labels[mode][1]}
                value={b}
                onChangeText={setB}
              />
            )}{" "}
            {error && (
              <Text style={[styles.error, { color: colors.error }]}>
                {error}
              </Text>
            )}
            <Buttons
              onCalculate={calc}
              onClear={() => {
                setA("");
                setB("");
                setResult("");
                setError("");
              }}
            />
            <FormulaCard formula={labels[mode][2]} />
          </CalculatorCard>
          {result && (
            <ResultCard
              label={mode === "divider" ? t("crankTurns") : t("result")}
              value={result}
              unit={mode === "divider" ? t("turns") : "mm"}
              details={
                <View>
                  {details.map((x, i) => (
                    <Text key={i} style={styles.resultDetails}>
                      {i === 0 && mode === "divider"
                        ? `${t("recommended")}: `
                        : ""}
                      {x}
                    </Text>
                  ))}
                </View>
              }
            />
          )}
        </ScrollView>
      </Screen>
    </>
  );
}
