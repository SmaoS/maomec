/** Funciones puras. Todas las longitudes usan la misma unidad salvo indicación. */
const positive = (value: number, name: string) => {
  if (!Number.isFinite(value) || value <= 0) throw new Error(`${name} debe ser mayor que cero.`);
};

export const calculateGearModule = (pitchDiameter: number, teeth: number) => { positive(pitchDiameter, 'El diámetro'); positive(teeth, 'Los dientes'); return pitchDiameter / teeth; };
export const calculatePitchDiameter = (module: number, teeth: number) => { positive(module, 'El módulo'); positive(teeth, 'Los dientes'); return module * teeth; };
export const calculateOutsideDiameter = (module: number, teeth: number) => { positive(module, 'El módulo'); positive(teeth, 'Los dientes'); return module * (teeth + 2); };
export const calculateCircularPitch = (module: number) => { positive(module, 'El módulo'); return Math.PI * module; };
export const calculateModuleFromPitch = (pitch: number) => { positive(pitch, 'El paso'); return pitch / Math.PI; };

export const DIVIDING_PLATES = [[15,16,17,18,19,20],[21,23,27,29,31,33],[37,39,41,43,47,49]] as const;
export type DividingCombination = { holes: number; circle: number };
export function calculateDividingHead(ratio: number, divisions: number) {
  positive(ratio, 'La relación'); positive(divisions, 'Las divisiones');
  const turns = ratio / divisions; const fullTurns = Math.floor(turns); const fraction = turns - fullTurns;
  const combinations: DividingCombination[] = [];
  DIVIDING_PLATES.flat().forEach(circle => { const holes = fraction * circle; if (Math.abs(holes - Math.round(holes)) < 1e-9 && holes > 0) combinations.push({ holes: Math.round(holes), circle }); });
  return { turns, fullTurns, combinations };
}

export type DMS = { degrees: number; minutes: number; seconds: number };
export function decimalDegreesToDMS(value: number): DMS { const degrees = Math.floor(Math.abs(value)); const rawMinutes = (Math.abs(value)-degrees)*60; const minutes = Math.floor(rawMinutes); const seconds = (rawMinutes-minutes)*60; return { degrees: value < 0 ? -degrees : degrees, minutes, seconds }; }
export function calculateConeAngle(major: number, minor: number, length: number) { positive(major,'El diámetro mayor'); positive(minor,'El diámetro menor'); positive(length,'La longitud'); if (major <= minor) throw new Error('El diámetro mayor debe superar al menor.'); const semiAngle = Math.atan((major-minor)/(2*length))*180/Math.PI; return { semiAngle, includedAngle: semiAngle*2, dms: decimalDegreesToDMS(semiAngle) }; }
export function calculateChordLength(holes: number, diameter: number) { positive(holes,'Los agujeros'); positive(diameter,'El diámetro'); if (!Number.isInteger(holes) || holes < 2) throw new Error('Debe haber al menos 2 agujeros enteros.'); return { chord: diameter*Math.sin(Math.PI/holes), radius: diameter/2, angle: 360/holes }; }

export const mmToInches = (mm:number) => { positive(mm,'Los milímetros'); return mm/25.4; };
export const inchesToMm = (inch:number) => { positive(inch,'Las pulgadas'); return inch*25.4; };
export const mmToThousandths = (mm:number) => mmToInches(mm)*1000;
export const thousandthsToMm = (thou:number) => { positive(thou,'Las milésimas'); return thou*0.0254; };
export function decimalToFraction(value:number, denominator=128) { if (!Number.isFinite(value) || value < 0) throw new Error('El valor debe ser cero o positivo.'); positive(denominator,'El denominador'); const whole=Math.floor(value); let numerator=Math.round((value-whole)*denominator); const gcd=(a:number,b:number):number=>b?gcd(b,a%b):a; if(numerator===denominator)return {whole:whole+1,numerator:0,denominator:1,error:whole+1-value}; const divisor=numerator?gcd(numerator,denominator):1; const d=denominator/divisor,n=numerator/divisor; return {whole,numerator:n,denominator:d,error:whole+n/d-value}; }
export const roundForDisplay = (value:number, decimals=3) => Number(value.toFixed(decimals));
