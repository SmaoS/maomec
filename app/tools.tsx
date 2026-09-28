import { Stack } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { AdBanner } from "../src/ads/AdBanner";
import { HelpButton } from "../src/components/HelpButton";
import { toolsHelp } from "../src/content/calculatorHelp";
import { toolsHelpEn } from "../src/content/calculatorHelp.en";
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
  calculateCuttingSpeed,
  calculateFeedRate,
  calculateImperialThread,
  calculateMetricThread,
  calculateRpm,
  roundForDisplay,
  solveRightTriangle,
} from "../src/domain/math";
import { useI18n } from "../src/i18n/I18nContext";
import { saveHistory } from "../src/storage/preferences";
import { useTheme } from "../src/theme/ThemeContext";
import { parseLocalizedNumber } from "../src/utils/input";

type Tool = "threads" | "speed" | "feed" | "triangle";
type LiveResult = {
  label: string;
  value: string;
  unit?: string;
  details: string[];
  summary: string;
};

export default function Tools() {
  const { colors } = useTheme();
  const { language, t } = useI18n();
  const [tool, setTool] = useState<Tool>("threads");
  const [submode, setSubmode] = useState<"first" | "second">("first");
  const [a, setA] = useState(""),
    [b, setB] = useState(""),
    [c, setC] = useState("");
  const [message, setMessage] = useState("");

  const reset = (nextTool = tool) => {
    setTool(nextTool);
    setSubmode("first");
    setA("");
    setB("");
    setC("");
    setMessage("");
  };
  const number = (value: string) => parseLocalizedNumber(value);
  const live = useMemo<{ result: LiveResult | null; error: string }>(() => {
    try {
      const x = number(a),
        y = number(b),
        z = number(c);
      if (tool !== "triangle" && (x === null || y === null))
        return { result: null, error: "" };
      if (tool === "threads") {
        if (submode === "first") {
          const r = calculateMetricThread(x!, y!);
          return {
            result: {
              label: t("threads"),
              value: `M${roundForDisplay(r.diameter)} × ${roundForDisplay(r.pitch)}`,
              details: [
                `${t("turnsPerMm")}: ${roundForDisplay(r.turnsPerMm, 6)}`,
                `${t("approximateTpi")}: ${roundForDisplay(r.approximateTpi, 3)}`,
              ],
              summary: `M${a} × ${b}`,
            },
            error: "",
          };
        }
        const r = calculateImperialThread(x!, y!);
        return {
          result: {
            label: t("threads"),
            value: `${roundForDisplay(r.pitchMm)} mm`,
            details: [
              `${t("pitch")}: ${roundForDisplay(r.pitchInches, 6)} in`,
              `TPI: ${roundForDisplay(r.tpi)}`,
            ],
            summary: `Ø${a} in · ${b} TPI`,
          },
          error: "",
        };
      }
      if (tool === "speed") {
        const value =
          submode === "first"
            ? calculateRpm(x!, y!)
            : calculateCuttingSpeed(x!, y!);
        return {
          result: {
            label:
              submode === "first"
                ? t("recommendedRpm")
                : t("cuttingSpeedLabel"),
            value: `${submode === "first" ? Math.round(value) : roundForDisplay(value)}`,
            unit: submode === "first" ? "RPM" : "m/min",
            details: [],
            summary: `${submode === "first" ? "Vc" : "RPM"}: ${a} · Ø${b} mm`,
          },
          error: "",
        };
      }
      if (tool === "feed") {
        if (z === null) return { result: null, error: "" };
        const value = calculateFeedRate(x!, y!, z);
        return {
          result: {
            label: t("feedRate"),
            value: `${roundForDisplay(value)}`,
            unit: "mm/min",
            details: [],
            summary: `fz ${a} · Z${b} · ${c} RPM`,
          },
          error: "",
        };
      }
      const supplied = [x, y, z].filter((value) => value !== null);
      if (supplied.length < 2) return { result: null, error: "" };
      const r = solveRightTriangle({
        opposite: x ?? undefined,
        adjacent: y ?? undefined,
        hypotenuse: z ?? undefined,
      });
      return {
        result: {
          label: t("angle"),
          value: `${roundForDisplay(r.angle)}°`,
          details: [
            `${t("opposite")}: ${roundForDisplay(r.opposite)}`,
            `${t("adjacent")}: ${roundForDisplay(r.adjacent)}`,
            `${t("hypotenuse")}: ${roundForDisplay(r.hypotenuse)}`,
          ],
          summary: `${t("opposite")}: ${a || "?"} · ${t("adjacent")}: ${b || "?"} · ${t("hypotenuse")}: ${c || "?"}`,
        },
        error: "",
      };
    } catch {
      return { result: null, error: t("invalidData") };
    }
  }, [a, b, c, submode, t, tool]);

  const tabs: [Tool, string][] = [
    ["threads", t("threads")],
    ["speed", t("cuttingSpeed")],
    ["feed", t("feed")],
    ["triangle", t("trigonometry")],
  ];
  const title = tabs.find(([key]) => key === tool)![1];
  const helpKey =
    tool === "threads"
      ? submode === "first"
        ? "metricThread"
        : "imperialThread"
      : tool === "speed"
        ? submode === "first"
          ? "rpm"
          : "cuttingSpeed"
        : tool === "feed"
          ? "feed"
          : "triangle";
  const help = (language === "es" ? toolsHelp : toolsHelpEn)[helpKey];
  const formula =
    tool === "threads"
      ? submode === "first"
        ? "TPI ≈ 25.4 / paso mm"
        : "paso mm = 25.4 / TPI"
      : tool === "speed"
        ? submode === "first"
          ? "RPM = (1000 × Vc) / (π × D)"
          : "Vc = (π × D × RPM) / 1000"
        : tool === "feed"
          ? "Vf = fz × Z × RPM"
          : "a² + b² = c²";

  return (
    <>
      <Stack.Screen options={{ headerRight: () => <HelpButton {...help} /> }} />
      <Screen>
        <ScrollView>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8 }}
            style={{ marginBottom: 14 }}
          >
            {tabs.map(([key, label]) => (
              <Pressable
                key={key}
                onPress={() => reset(key)}
                style={{
                  paddingHorizontal: 14,
                  paddingVertical: 10,
                  borderRadius: 20,
                  backgroundColor:
                    tool === key ? colors.primary : colors.surface,
                }}
              >
                <Text
                  style={{
                    color: tool === key ? "#fff" : colors.text,
                    fontWeight: "700",
                  }}
                >
                  {label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
          <CalculatorCard>
            {(tool === "threads" || tool === "speed") && (
              <View style={styles.row}>
                {(["first", "second"] as const).map((mode) => (
                  <Pressable
                    key={mode}
                    onPress={() => {
                      setSubmode(mode);
                      setA("");
                      setB("");
                      setMessage("");
                    }}
                    style={{
                      flex: 1,
                      padding: 11,
                      borderRadius: 9,
                      backgroundColor:
                        submode === mode ? colors.accent : colors.background,
                    }}
                  >
                    <Text
                      style={{
                        color: submode === mode ? "#fff" : colors.text,
                        textAlign: "center",
                        fontWeight: "700",
                      }}
                    >
                      {tool === "threads"
                        ? mode === "first"
                          ? t("metric")
                          : t("imperial")
                        : mode === "first"
                          ? t("calculateRpmMode")
                          : t("calculateVcMode")}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}
            {tool === "threads" && (
              <>
                <NumericInput
                  label={
                    submode === "first" ? t("nominalDiameter") : t("diameter")
                  }
                  value={a}
                  onChangeText={setA}
                  unit={submode === "first" ? "mm" : "in"}
                />
                <NumericInput
                  label={submode === "first" ? t("pitch") : t("tpi")}
                  value={b}
                  onChangeText={setB}
                  unit={submode === "first" ? "mm" : undefined}
                />
              </>
            )}
            {tool === "speed" && (
              <>
                <NumericInput
                  label={
                    submode === "first" ? t("cuttingSpeedLabel") : t("rpm")
                  }
                  value={a}
                  onChangeText={setA}
                  unit={submode === "first" ? "m/min" : "RPM"}
                />
                <NumericInput
                  label={t("diameter")}
                  value={b}
                  onChangeText={setB}
                  unit="mm"
                />
              </>
            )}
            {tool === "feed" && (
              <>
                <NumericInput
                  label={t("feedPerTooth")}
                  value={a}
                  onChangeText={setA}
                  unit="mm"
                />
                <NumericInput
                  label={t("cutterTeeth")}
                  value={b}
                  onChangeText={setB}
                />
                <NumericInput label={t("rpm")} value={c} onChangeText={setC} />
              </>
            )}
            {tool === "triangle" && (
              <>
                <Text style={{ color: colors.textSecondary }}>
                  {t("enterTwoSides")}
                </Text>
                <NumericInput
                  label={t("opposite")}
                  value={a}
                  onChangeText={setA}
                />
                <NumericInput
                  label={t("adjacent")}
                  value={b}
                  onChangeText={setB}
                />
                <NumericInput
                  label={t("hypotenuse")}
                  value={c}
                  onChangeText={setC}
                />
              </>
            )}
            {(message || live.error) && (
              <Text style={[styles.error, { color: colors.error }]}>
                {message || live.error}
              </Text>
            )}
            <Buttons
              calculateLabel={t("save")}
              onCalculate={() => {
                if (!live.result) {
                  setMessage(t("completeData"));
                  return;
                }
                setMessage("");
                void saveHistory({
                  type: title,
                  summary: live.result.summary,
                  result: `${live.result.value}${live.result.unit ? ` ${live.result.unit}` : ""}`,
                });
              }}
              onClear={() => reset(tool)}
            />
            <FormulaCard formula={formula} />
          </CalculatorCard>
          {live.result && (
            <ResultCard
              label={live.result.label}
              value={live.result.value}
              unit={live.result.unit}
              details={
                <View>
                  {live.result.details.map((detail) => (
                    <Text key={detail} style={styles.resultDetails}>
                      {detail}
                    </Text>
                  ))}
                </View>
              }
            />
          )}
          <AdBanner />
        </ScrollView>
      </Screen>
    </>
  );
}
