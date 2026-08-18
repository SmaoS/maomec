import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Language = "es" | "en";
const LANGUAGE_KEY = "maomec:language";
const dictionary = {
  es: {
    workshopCalculations: "Cálculos de taller",
    history: "Historial",
    favorites: "Favoritos",
    tools: "Herramientas",
    changeLanguage: "Cambiar idioma",
    changeTheme: "Cambiar tema",
    circles: "Círculos y módulos",
    circlesDesc: "Cálculos de engranajes, módulos y divisiones.",
    cone: "Grados de cono",
    coneDesc: "Calcula inclinaciones y ángulos de conos.",
    chord: "Longitud de cuerda",
    chordDesc: "Distribución y distancia entre perforaciones.",
    converter: "Conversor",
    converterDesc: "Milímetros, pulgadas, milésimas y fracciones.",
    calculate: "CALCULAR",
    clear: "LIMPIAR",
    showFormula: "Ver fórmula",
    hideFormula: "Ocultar fórmula",
    result: "Resultado",
    completeData: "Completa los datos para calcular.",
    invalidData: "Datos inválidos",
    help: "AYUDA",
    understood: "ENTENDIDO",
    closeHelp: "Cerrar ayuda",
    divider: "Cabezal divisor",
    module: "Módulo",
    pitchDiameter: "Ø primitivo",
    outsideDiameter: "Ø exterior",
    circularPitch: "Paso circular",
    moduleFromPitch: "M desde paso",
    dividerRatio: "Relación del divisor",
    divisions: "Cantidad de divisiones",
    teeth: "Número de dientes",
    recommended: "Recomendado",
    crankTurns: "Vueltas de manivela",
    turns: "vueltas",
    fullTurn: "vuelta",
    fullTurns: "vueltas",
    holes: "agujeros",
    holeCircle: "círculo de",
    noPlate: "No hay combinación exacta con los platos configurados.",
    majorDiameter: "Diámetro mayor (D)",
    minorDiameter: "Diámetro menor (d)",
    length: "Longitud (L)",
    semiAngle: "Semiángulo",
    includedAngle: "Ángulo incluido",
    holeCount: "Cantidad de agujeros",
    circleDiameter: "Diámetro del círculo",
    radius: "Radio",
    separation: "Separación",
    shareResult: "Compartir resultado",
    liveConverter:
      "El resultado cambia mientras escribes y conserva la medida al cambiar de modo.",
    mmToIn: "mm → pulg.",
    thouToMm: "milésimas → mm",
    decimalToFraction: "decimal → fracción",
    millimeters: "Milímetros",
    thousandths: "Milésimas de pulgada",
    decimalInches: "Pulgadas decimales",
    inches: "pulgadas",
    fractionError: "Error",
    save: "GUARDAR",
    lastCalculations: "Últimos 50 cálculos",
    clearAll: "Borrar todo",
    emptyHistory: "Todavía no hay cálculos guardados.",
    delete: "Eliminar",
    clearHistoryTitle: "Borrar historial",
    clearHistoryBody: "Esta acción eliminará todos los cálculos guardados.",
    cancel: "Cancelar",
    reuse: "Reutilizar",
  },
  en: {
    workshopCalculations: "Workshop calculations",
    history: "History",
    favorites: "Favorites",
    tools: "Tools",
    changeLanguage: "Change language",
    changeTheme: "Change theme",
    circles: "Circles and modules",
    circlesDesc: "Gear, module and dividing calculations.",
    cone: "Taper angles",
    coneDesc: "Calculate taper angles and inclinations.",
    chord: "Chord length",
    chordDesc: "Hole distribution and spacing.",
    converter: "Converter",
    converterDesc: "Millimeters, inches, thousandths and fractions.",
    calculate: "CALCULATE",
    clear: "CLEAR",
    showFormula: "View formula",
    hideFormula: "Hide formula",
    result: "Result",
    completeData: "Enter all values to calculate.",
    invalidData: "Invalid data",
    help: "HELP",
    understood: "GOT IT",
    closeHelp: "Close help",
    divider: "Dividing head",
    module: "Module",
    pitchDiameter: "Pitch diameter",
    outsideDiameter: "Outside diameter",
    circularPitch: "Circular pitch",
    moduleFromPitch: "Module from pitch",
    dividerRatio: "Dividing-head ratio",
    divisions: "Number of divisions",
    teeth: "Number of teeth",
    recommended: "Recommended",
    crankTurns: "Crank turns",
    turns: "turns",
    fullTurn: "turn",
    fullTurns: "turns",
    holes: "holes",
    holeCircle: "hole circle",
    noPlate: "No exact combination exists for the configured plates.",
    majorDiameter: "Major diameter (D)",
    minorDiameter: "Minor diameter (d)",
    length: "Length (L)",
    semiAngle: "Half-angle",
    includedAngle: "Included angle",
    holeCount: "Number of holes",
    circleDiameter: "Bolt-circle diameter",
    radius: "Radius",
    separation: "Angular spacing",
    shareResult: "Share result",
    liveConverter:
      "Results update as you type and the measurement is preserved when changing modes.",
    mmToIn: "mm → in",
    thouToMm: "thousandths → mm",
    decimalToFraction: "decimal → fraction",
    millimeters: "Millimeters",
    thousandths: "Thousandths of an inch",
    decimalInches: "Decimal inches",
    inches: "inches",
    fractionError: "Error",
    save: "SAVE",
    lastCalculations: "Last 50 calculations",
    clearAll: "Clear all",
    emptyHistory: "No saved calculations yet.",
    delete: "Delete",
    clearHistoryTitle: "Clear history",
    clearHistoryBody: "This will delete all saved calculations.",
    cancel: "Cancel",
    reuse: "Reuse",
  },
} as const;
export type TranslationKey = keyof typeof dictionary.es;
type Value = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
};
const Context = createContext<Value>({
  language: "es",
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (key) => dictionary.es[key],
});
export function I18nProvider({ children }: PropsWithChildren) {
  const [language, setState] = useState<Language>("es");
  useEffect(() => {
    AsyncStorage.getItem(LANGUAGE_KEY).then((value) => {
      if (value === "es" || value === "en") setState(value);
    });
  }, []);
  const setLanguage = (next: Language) => {
    setState(next);
    void AsyncStorage.setItem(LANGUAGE_KEY, next);
  };
  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => setLanguage(language === "es" ? "en" : "es"),
      t: (key: TranslationKey) => dictionary[language][key],
    }),
    [language],
  );
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export const useI18n = () => useContext(Context);
