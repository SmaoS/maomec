import { calculateChordLength, calculateConeAngle, calculateDividingHead, calculateGearModule, calculateOutsideDiameter, calculatePitchDiameter, decimalToFraction, mmToInches, mmToThousandths } from '../domain/math';
describe('dominio matemático',()=>{
 test('25.4 mm equivalen a 1 pulgada y 1000 milésimas',()=>{expect(mmToInches(25.4)).toBeCloseTo(1);expect(mmToThousandths(25.4)).toBeCloseTo(1000);});
 test('cuerda de 5 agujeros en Ø120',()=>expect(calculateChordLength(5,120).chord).toBeCloseTo(70.534,3));
 test('divisor 40:1 para 24 divisiones',()=>{const r=calculateDividingHead(40,24);expect(r.turns).toBeCloseTo(1.666666);expect(r.combinations).toEqual(expect.arrayContaining([{holes:10,circle:15},{holes:12,circle:18}]));});
 test('cono aplica atan de diferencia sobre doble longitud',()=>expect(calculateConeAngle(50,30,50).semiAngle).toBeCloseTo(Math.atan(.2)*180/Math.PI));
 test('engranaje Z24 M2.5',()=>{expect(calculatePitchDiameter(2.5,24)).toBe(60);expect(calculateGearModule(60,24)).toBe(2.5);expect(calculateOutsideDiameter(2.5,24)).toBe(65);});
 test('0.625 se aproxima exactamente a 5/8',()=>expect(decimalToFraction(.625)).toMatchObject({numerator:5,denominator:8,error:0}));
});
