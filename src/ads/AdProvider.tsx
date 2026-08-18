import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { appConfig } from "../config/appConfig";
import { initializeAds } from "./adService";

const AdContext = createContext({ canRequestAds: false });
let initialized = false;

export function AdProvider({ children }: PropsWithChildren) {
  const [canRequestAds, setCanRequestAds] = useState(false);
  useEffect(() => {
    if (!appConfig.adsEnabled) return;
    let active = true;
    void (async () => {
      const ready = initialized || (await initializeAds());
      if (ready) initialized = true;
      if (active) setCanRequestAds(ready);
    })();
    return () => {
      active = false;
    };
  }, []);
  return (
    <AdContext.Provider value={{ canRequestAds }}>
      {children}
    </AdContext.Provider>
  );
}
export const useAds = () => useContext(AdContext);
