import { Share, ScrollView, Text } from "react-native";
import { useState } from "react";
import { Stack } from "expo-router";
import { HelpButton } from "../src/components/HelpButton";
import { AdBanner } from "../src/ads/AdBanner";
import { chordHelp } from "../src/content/calculatorHelp";
import { chordHelpEn } from "../src/content/calculatorHelp.en";
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
import { calculateChordLength, roundForDisplay } from "../src/domain/math";
import { saveHistory } from "../src/storage/preferences";
import { parseLocalizedNumber } from "../src/utils/input";
export default function Chord() {
  const { language, t } = useI18n();
  const [n, setN] = useState("");
  const [d, setD] = useState("");
  const [result, setResult] = useState<ReturnType<
    typeof calculateChordLength
  > | null>(null);
  const [error, setError] = useState("");
  const calculate = () => {
    try {
      const holes = parseLocalizedNumber(n),
        diameter = parseLocalizedNumber(d);
      if (holes === null || diameter === null)
        throw new Error(t("completeData"));
      const r = calculateChordLength(holes, diameter);
      setResult(r);
      setError("");
      void saveHistory({
        type: t("chord"),
        summary: `${holes} ${t("holes")} · Ø${diameter} mm`,
        result: `${roundForDisplay(r.chord)} mm`,
      });
    } catch (e) {
      setError(
        e instanceof Error && e.message === t("completeData")
          ? e.message
          : t("invalidData"),
      );
      setResult(null);
    }
  };
  const text = result
    ? language === "es"
      ? `MaoMec\n\nLongitud de cuerda\nDiámetro: ${d} mm\nAgujeros: ${n}\nSeparación angular: ${roundForDisplay(result.angle)}°\nLongitud: ${roundForDisplay(result.chord)} mm`
      : `MaoMec\n\nChord length\nDiameter: ${d} mm\nHoles: ${n}\nAngular spacing: ${roundForDisplay(result.angle)}°\nChord: ${roundForDisplay(result.chord)} mm`
    : "";
  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <HelpButton {...(language === "es" ? chordHelp : chordHelpEn)} />
          ),
        }}
      />
      <Screen>
        <ScrollView>
          <CalculatorCard>
            <NumericInput
              label={t("holeCount")}
              value={n}
              onChangeText={setN}
            />
            <NumericInput
              label={t("circleDiameter")}
              value={d}
              onChangeText={setD}
              unit="mm"
            />
            {error && <Text style={styles.error}>{error}</Text>}
            <Buttons
              onCalculate={calculate}
              onClear={() => {
                setN("");
                setD("");
                setResult(null);
                setError("");
              }}
            />
            <FormulaCard formula="C = D × sin(180° / N)">
              <Text>
                {language === "es"
                  ? "C: cuerda · D: diámetro · N: agujeros"
                  : "C: chord · D: diameter · N: holes"}
              </Text>
            </FormulaCard>
          </CalculatorCard>
          {result && (
            <>
              <ResultCard
                label={t("chord")}
                value={`${roundForDisplay(result.chord)}`}
                unit="mm"
                details={
                  <>
                    <Text style={styles.resultDetails}>
                      {t("radius")}: {roundForDisplay(result.radius)} mm
                    </Text>
                    <Text style={styles.resultDetails}>
                      {t("separation")}: {roundForDisplay(result.angle)}°
                    </Text>
                  </>
                }
              />
              <Text
                style={styles.link}
                onPress={() => void Share.share({ message: text })}
              >
                {t("shareResult")}
              </Text>
            </>
          )}
          <AdBanner />
        </ScrollView>
      </Screen>
    </>
  );
}
