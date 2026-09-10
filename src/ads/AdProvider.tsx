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
    let retryTimer: ReturnType<typeof setTimeout> | undefined;
    const start = async () => {
      const ready = initialized || (await initializeAds());
      if (ready) initialized = true;
      if (active) setCanRequestAds(ready);
      if (!ready && active) retryTimer = setTimeout(start, 30_000);
    };
    void start();
    return () => {
      active = false;
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, []);
  return (
    <AdContext.Provider value={{ canRequestAds }}>
      {children}
    </AdContext.Provider>
  );
}
export const useAds = () => useContext(AdContext);
