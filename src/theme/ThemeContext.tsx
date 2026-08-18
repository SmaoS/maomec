import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
export const light={primary:'#1565C0',primaryDark:'#0D47A1',accent:'#00A6C7',background:'#F4F6F8',surface:'#FFFFFF',text:'#15202B',textSecondary:'#607D8B',border:'#DDE3E8',success:'#2E7D32',error:'#D32F2F'};
export const dark={...light,background:'#0D1117',surface:'#161B22',text:'#F0F6FC',textSecondary:'#8B949E',border:'#30363D'};
type ThemeValue={colors:typeof light;darkMode:boolean;toggleTheme:()=>void};
const ThemeContext=createContext<ThemeValue>({colors:light,darkMode:false,toggleTheme:()=>{}});
export function ThemeProvider({children}:PropsWithChildren){const [darkMode,setDark]=useState(false);useEffect(()=>{AsyncStorage.getItem('theme').then(v=>setDark(v==='dark'));},[]);const toggleTheme=()=>setDark(v=>{void AsyncStorage.setItem('theme',!v?'dark':'light');return !v;});const value=useMemo(()=>({colors:darkMode?dark:light,darkMode,toggleTheme}),[darkMode]);return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>}
export const useTheme=()=>useContext(ThemeContext);
