export const parseLocalizedNumber = (text: string): number | null => { const clean=text.trim().replace(',','.'); if (!clean) return null; const n=Number(clean); return Number.isFinite(n)?n:null; };
export const sanitizeNumericInput = (text:string) => text.replace(',', '.').replace(/[^0-9.]/g,'').replace(/(\..*)\./g,'$1');
