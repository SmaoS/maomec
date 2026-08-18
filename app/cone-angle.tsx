import { useState } from "react";
import { ScrollView, Text } from "react-native";
import { Stack } from "expo-router";
import { HelpButton } from "../src/components/HelpButton";
import { coneHelp } from "../src/content/calculatorHelp";
import { coneHelpEn } from "../src/content/calculatorHelp.en";
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
import { calculateConeAngle, roundForDisplay } from "../src/domain/math";
import { saveHistory } from "../src/storage/preferences";
import { parseLocalizedNumber } from "../src/utils/input";
export default function Cone() {
  const { language, t } = useI18n();
  const [D, setD] = useState(""),
    [d, setd] = useState(""),
    [l, setL] = useState("");
  const [r, setR] = useState<ReturnType<typeof calculateConeAngle> | null>(
    null,
  );
  const [error, setError] = useState("");
  const calc = () => {
    try {
      const values = [D, d, l].map(parseLocalizedNumber);
      if (values.some((v) => v === null)) throw new Error(t("completeData"));
      const result = calculateConeAngle(values[0]!, values[1]!, values[2]!);
      setR(result);
      setError("");
      void saveHistory({
        type: t("cone"),
        summary: `Ø${D} / Ø${d} · L${l}`,
        result: `${roundForDisplay(result.semiAngle)}°`,
      });
    } catch (e) {
      setError(
        e instanceof Error && e.message === t("completeData")
          ? e.message
          : t("invalidData"),
      );
      setR(null);
    }
  };
  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <HelpButton {...(language === "es" ? coneHelp : coneHelpEn)} />
          ),
        }}
      />
      <Screen>
        <ScrollView>
          <CalculatorCard>
            <NumericInput
              label={t("majorDiameter")}
              value={D}
              onChangeText={setD}
              unit="mm"
            />
            <NumericInput
              label={t("minorDiameter")}
              value={d}
              onChangeText={setd}
              unit="mm"
            />
            <NumericInput
              label={t("length")}
              value={l}
              onChangeText={setL}
              unit="mm"
            />
            {error && <Text style={styles.error}>{error}</Text>}
            <Buttons
              onCalculate={calc}
              onClear={() => {
                setD("");
                setd("");
                setL("");
                setR(null);
                setError("");
              }}
            />
            <FormulaCard formula="α = atan((D − d) / (2 × L))">
              <Text>
                {language === "es"
                  ? "α es el semiángulo. El ángulo incluido es 2 × α."
                  : "α is the half-angle. The included angle is 2 × α."}
              </Text>
            </FormulaCard>
          </CalculatorCard>
          {r && (
            <ResultCard
              label={t("semiAngle")}
              value={`${roundForDisplay(r.semiAngle)}°`}
              details={
                <>
                  <Text style={styles.resultDetails}>
                    {r.dms.degrees}° {r.dms.minutes}&apos;{" "}
                    {roundForDisplay(r.dms.seconds)}&quot;
                  </Text>
                  <Text style={styles.resultDetails}>
                    {t("includedAngle")}: {roundForDisplay(r.includedAngle)}°
                  </Text>
                </>
              }
            />
          )}
        </ScrollView>
      </Screen>
    </>
  );
}
