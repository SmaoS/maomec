import { useMemo, useState } from "react";
import { ScrollView, Text } from "react-native";
import { Stack } from "expo-router";
import { HelpButton } from "../src/components/HelpButton";
import { AdBanner } from "../src/ads/AdBanner";
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
  const calculation = useMemo(() => {
    const values = [D, d, l].map(parseLocalizedNumber);
    if (values.some((value) => value === null))
      return { result: null, error: "" };
    try {
      return {
        result: calculateConeAngle(values[0]!, values[1]!, values[2]!),
        error: "",
      };
    } catch {
      return { result: null, error: t("invalidData") };
    }
  }, [D, d, l, t]);
  const r = calculation.result;
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
            {calculation.error && (
              <Text style={styles.error}>{calculation.error}</Text>
            )}
            <Buttons
              onCalculate={() => {
                if (!r) return;
                void saveHistory({
                  type: t("cone"),
                  summary: `Ø${D} / Ø${d} · L${l}`,
                  result: `${roundForDisplay(r.semiAngle)}°`,
                });
              }}
              calculateLabel={t("save")}
              onClear={() => {
                setD("");
                setd("");
                setL("");
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
          <AdBanner />
        </ScrollView>
      </Screen>
    </>
  );
}
