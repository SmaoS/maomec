import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Stack } from "expo-router";
import { HelpButton } from "../src/components/HelpButton";
import { circlesHelp } from "../src/content/calculatorHelp";
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
const modes: [Mode, string][] = [
  ["divider", "Cabezal divisor"],
  ["module", "Módulo"],
  ["pitchDiameter", "Ø primitivo"],
  ["outside", "Ø exterior"],
  ["pitch", "Paso circular"],
  ["fromPitch", "M desde paso"],
];
export default function Circles() {
  const { colors } = useTheme();
  const [mode, setMode] = useState<Mode>("module"),
    [a, setA] = useState(""),
    [b, setB] = useState(""),
    [result, setResult] = useState(""),
    [details, setDetails] = useState<string[]>([]),
    [error, setError] = useState("");
  const two = !["pitch", "fromPitch"].includes(mode);
  const labels: Record<Mode, [string, string, string]> = {
    module: ["Diámetro primitivo", "Número de dientes", "M = Dp / Z"],
    pitchDiameter: ["Módulo", "Número de dientes", "Dp = M × Z"],
    outside: ["Módulo", "Número de dientes", "De = M × (Z + 2)"],
    pitch: ["Módulo", "", "P = π × M"],
    fromPitch: ["Paso circular", "", "M = P / π"],
    divider: [
      "Relación del divisor",
      "Cantidad de divisiones",
      "vueltas = relación / divisiones",
    ],
  };
  const calc = () => {
    try {
      const x = parseLocalizedNumber(a),
        y = parseLocalizedNumber(b);
      if (x === null || (two && y === null))
        throw new Error("Completa los datos para calcular.");
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
            `Diámetro primitivo: ${roundForDisplay(calculatePitchDiameter(x, y!))} mm`,
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
          unit = " vueltas";
          extra = r.combinations.length
            ? r.combinations.map(
                (c) =>
                  `${r.fullTurns} vuelta${r.fullTurns === 1 ? "" : "s"} + ${c.holes} agujeros / círculo de ${c.circle}`,
              )
            : ["No hay combinación exacta con los platos configurados."];
          break;
        }
      }
      setResult(`${roundForDisplay(value!)}`);
      setDetails(extra);
      setError("");
      void saveHistory({
        type: mode === "divider" ? "Cabezal divisor" : "Engranajes",
        summary: `${labels[mode][0]}: ${a}${two ? ` · ${labels[mode][1]}: ${b}` : ""}`,
        result: `${roundForDisplay(value!)}${unit}`,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Datos inválidos");
      setResult("");
    }
  };
  return (
    <>
      <Stack.Screen
        options={{ headerRight: () => <HelpButton {...circlesHelp[mode]} /> }}
      />
      <Screen>
        <ScrollView>
          <SectionHeader
            title="Círculos y módulos"
            subtitle="Engranajes, pasos y divisiones de taller."
          />
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
              label={mode === "divider" ? "Vueltas de manivela" : "Resultado"}
              value={result}
              unit={mode === "divider" ? "vueltas" : "mm"}
              details={
                <View>
                  {details.map((x, i) => (
                    <Text key={i} style={styles.resultDetails}>
                      {i === 0 && mode === "divider" ? "Recomendado: " : ""}
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
