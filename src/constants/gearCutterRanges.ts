export type GearCutterRange = {
  cutter: number;
  minTeeth: number;
  maxTeeth: number | null;
};

/** Juego clásico de 8 fresas evolventes para un ángulo de presión determinado. */
export const GEAR_CUTTER_RANGES: readonly GearCutterRange[] = [
  { cutter: 8, minTeeth: 12, maxTeeth: 13 },
  { cutter: 7, minTeeth: 14, maxTeeth: 16 },
  { cutter: 6, minTeeth: 17, maxTeeth: 20 },
  { cutter: 5, minTeeth: 21, maxTeeth: 25 },
  { cutter: 4, minTeeth: 26, maxTeeth: 34 },
  { cutter: 3, minTeeth: 35, maxTeeth: 54 },
  { cutter: 2, minTeeth: 55, maxTeeth: 134 },
  { cutter: 1, minTeeth: 135, maxTeeth: null },
] as const;
