import AsyncStorage from '@react-native-async-storage/async-storage';
export type HistoryItem={id:string;type:string;summary:string;result:string;createdAt:string};
const HISTORY='maomec:history',FAVORITES='maomec:favorites';
export const getHistory=async():Promise<HistoryItem[]>=>JSON.parse((await AsyncStorage.getItem(HISTORY))??'[]') as HistoryItem[];
export const saveHistory=async(item:Omit<HistoryItem,'id'|'createdAt'>)=>{const list=await getHistory();const next=[{...item,id:`${Date.now()}`,createdAt:new Date().toISOString()},...list].slice(0,50);await AsyncStorage.setItem(HISTORY,JSON.stringify(next));return next;};
export const deleteHistory=async(id:string)=>{const next=(await getHistory()).filter(x=>x.id!==id);await AsyncStorage.setItem(HISTORY,JSON.stringify(next));return next;};
export const clearHistory=()=>AsyncStorage.removeItem(HISTORY);
export const getFavorites=async():Promise<string[]>=>JSON.parse((await AsyncStorage.getItem(FAVORITES))??'[]') as string[];
export const toggleFavorite=async(key:string)=>{const values=await getFavorites();const next=values.includes(key)?values.filter(x=>x!==key):[...values,key];await AsyncStorage.setItem(FAVORITES,JSON.stringify(next));return next;};
