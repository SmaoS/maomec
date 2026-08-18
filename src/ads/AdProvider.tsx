import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { appConfig } from "../config/appConfig";

const AdContext = createContext({ canRequestAds: false });
let initialized = false;

export function AdProvider({ children }: PropsWithChildren) {
  const [canRequestAds, setCanRequestAds] = useState(false);
  useEffect(() => {
    if (!appConfig.adsEnabled) return;
    let active = true;
    void (async () => {
      try {
        const { default: mobileAds, AdsConsent } = await import(
          "react-native-google-mobile-ads"
        );
        await AdsConsent.requestInfoUpdate();
        const consent = await AdsConsent.loadAndShowConsentFormIfRequired();
        if (!consent.canRequestAds || !active) return;
        if (!initialized) {
          initialized = true;
          await mobileAds().initialize();
        }
        if (active) setCanRequestAds(true);
      } catch {
        // No se solicitan anuncios si no puede verificarse el consentimiento.
        if (active) setCanRequestAds(false);
      }
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
